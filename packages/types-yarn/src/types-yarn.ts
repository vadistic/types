#!/usr/bin/env node

import * as Octokit from '@octokit/rest'
import * as semver from 'semver'
import * as json from 'jsonfile'
import * as path from 'path'
import * as execa from 'execa'

const OWNER = 'vadistic'
const REPO = 'types'
const GIT_URL = 'https://github.com'

const DEBUG = false

interface PackageInfo {
  name: string
  tag: string
  version: string
}

const versionRegex = /(?!v)([0-9]+\.[0-9]+\.[0-9]+(-[0-z-.]+)?)(?=-gitpkg)/

let tagsCache: Octokit.ReposListTagsResponseItem[]

const listAvalibleVersions = async (pkgName: string) => {
  // normalize name
  const upstreamName = pkgName.replace('@types/', '')

  DEBUG && console.log('listing versions for name: ', pkgName, upstreamName)
  // matching both typex-x and util packages
  const nameRegex = new RegExp(
    `(types-)?${upstreamName}-v[0-9]\.[0-9]\.[0-9]-[0-9]+-gitpkg`,
  )

  const octokit = new Octokit()

  // TODO: support pagination if I ever would reach 100 records
  const tags =
    tagsCache ||
    (await octokit.repos.listTags({
      owner: OWNER,
      repo: REPO,
      per_page: 100,
      page: 0,
    })).data

  tagsCache = tags

  const packagesList: PackageInfo[] = tags
    .filter(tag => tag.name.match(nameRegex))
    .map(tag => ({
      name: pkgName,
      tag: tag.name,
      version: tag.name.match(versionRegex)![0],
    }))

  DEBUG && console.log('packagesList: ', packagesList)

  return packagesList
}

const getLatestVersion = (packages: PackageInfo[], init?: PackageInfo) =>
  packages.reduce(
    (prev, current) =>
      !prev || semver.gt(current.version, prev!.version) ? current : prev,
    init as PackageInfo,
  )

export default (async () => {
  let arg: 'upgrade' | 'outdated' | 'list' | undefined
  let searchName
  process.argv.forEach(async (val, i, arr) => {
    if (val === 'upgrade' || val === 'outdated') {
      arg = val
    }
    if (val === 'list') {
      arg = val
      searchName = arr[i + 1]
    }
  })

  if (!arg) {
    console.log(
      `
      Upgrade script from vadistic/types (making up for lack of yarn support)

      Usage:  -upgrade [command]

      Commands:
      Check avalibility & latest version
      $info package_name

      outdated

      List outdated typings
      $ type-upgrade outdated

      upgrade

      Install latest typings
      $ type-upgrade upgrade
      `,
    )

    process.exit()
  }

  if (arg === 'list' && searchName) {
    const packagesList = await listAvalibleVersions(searchName)

    if (packagesList.length === 0) {
      console.log(`No packages found for name: ${searchName}`)
    } else {
      const latestVersion = getLatestVersion(packagesList)
      console.log(`${searchName}: ${packagesList.length} versions found`)
      console.log('Latest:\n', JSON.stringify(latestVersion, null, 2))

      console.log('\nInstall:')
      console.log(`yarn add -D ${OWNER}/${REPO}/#${latestVersion.tag}`)
    }

    process.exit()
    return 0
  }

  const pkg = json.readFileSync(path.resolve(process.cwd(), 'package.json'))

  const typings = Object.entries<string>({
    ...pkg.devDependencies,
    ...pkg.dependencies,
  }).filter(([name, repo]) => {
    return repo.match(`${OWNER}/${REPO}#`)
  })

  DEBUG && console.log('typings: ', typings)

  if (typings.length === 0) {
    console.log(`No git typings found`)
    process.exit()
    return 0
  }

  interface OutdatedPackageInfo extends PackageInfo {
    installedVersion: string
  }

  let outdated = [] as OutdatedPackageInfo[]

  typings.forEach(async ([name, repo]) => {
    const installedVersion = repo.match(versionRegex)![0]

    const packagesList = await listAvalibleVersions(name)

    const latestVersion = getLatestVersion(packagesList, {
      version: installedVersion,
      name,
      tag: repo.replace(`${GIT_URL}/${OWNER}/${REPO}/#`, ''),
    })

    if (semver.gt(latestVersion.version, installedVersion)) {
      outdated.push({
        name,
        tag: latestVersion.tag,
        installedVersion,
        version: latestVersion.version,
      })
    }

    DEBUG && console.log('outdated: ', outdated)

    if (outdated.length === 0) {
      console.log(`Everything's up to date!`)
    } else {
      console.log(`Found outdated typings packages`)
      outdated.forEach(entry => {
        console.log(
          `${entry.name}: ${entry.installedVersion} => ${entry.version}`,
        )
      })

      if (arg === 'upgrade') {
        console.log('Installing...')

        const command = `yarn add -D ${outdated
          .map(entry => `${OWNER}/${REPO}#${entry.tag}`)
          .join(' ')}`

        const cmd = execa.shell(command)

        cmd.stdout.pipe(process.stdout)

        cmd.then(() => {
          console.log('Types updated!')
        })
      }
    }

    return 0
  })
})()
