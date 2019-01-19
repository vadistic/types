#!/usr/bin/env node

import * as Octokit from '@octokit/rest'
import * as semver from 'semver'
import * as json from 'jsonfile'
import * as path from 'path'
import { exec } from 'child_process'

const OWNER = 'vadistic'
const REPO = 'types'
const GIT_URL = 'https://github.com'

export default (async () => {
  let arg
  process.argv.forEach(argv => {
    if (argv === 'upgrade' || argv === 'outdated') {
      arg = argv
    }
  })

  if (!arg) {
    console.log(
      `
      Upgrade script from vadistic/types (making up for lack of yarn support)

      Usage:  type-upgrade [command]

      Commands:
      outdated

      Shows outdated typings
      $ type-upgrade outdates

      upgrade

      Install latest typings
      $ type-upgrade upgrade
      `,
    )

    process.exit()
  }

  const octokit = new Octokit()
  const pkg = await json.readFile(path.resolve(process.cwd(), 'package.json'))

  const versionRx = /(?!v)([0-9]+.[0-9]+.[0-9]+(-[0-z-.]+)?)(?=-gitpkg)/

  // TODO: support pagination if ever this would reach 100 records
  const tags = await octokit.repos.listTags({
    owner: OWNER,
    repo: REPO,
    per_page: 100,
    page: 0,
  })

  const typings = Object.entries<string>({
    ...pkg.devDependencies,
    ...pkg.dependencies,
  }).filter(([name, repo]) => {
    return repo.match(`${OWNER}/${REPO}`)
  })

  if (typings.length === 0) {
    console.log(`No git typings found`)
    process.exit()
  }

  let outdated = [] as {
    name: string
    tag: string
    currentVersion: string
    latestVersion: string
  }[]

  typings.forEach(([name, repo]) => {
    const pkgName = name.replace('@types/', '')

    const currentVersion = repo.match(versionRx)![0]

    // TODO: support those @smth/smth
    const allVersions = tags.data
      .filter(tag => tag.name.match(`types-${pkgName}`))
      .map(tag => tag.name)

    const latestVersion = allVersions.reduce(
      (prev, tag) => {
        const version = tag.match(versionRx)![0]
        return semver.gt(version, prev.version) ? { version, tag } : prev
      },
      {
        version: currentVersion,
        tag: repo.replace(`${GIT_URL}/${OWNER}/${REPO}#`, ''),
      },
    )

    if (semver.gt(latestVersion.version, currentVersion)) {
      outdated.push({
        name: pkgName,
        tag: latestVersion.tag,
        currentVersion,
        latestVersion: latestVersion.version,
      })
    }

    if (outdated.length === 0) {
      console.log(`Everything's up to date!`)
    } else {
      console.log(`Found outdated typings packages`)
      outdated.forEach(entry => {
        console.log(
          `${entry.name}: ${entry.currentVersion} => ${entry.latestVersion}`,
        )
      })

      if ((arg = 'upgrade')) {
        exec(
          `yarn add -D ${outdated
            .map(entry => `${GIT_URL}/${OWNER}/${REPO}#${entry.tag}`)
            .join(' ')}`,
          (error, stdout, stderr) => {
            if (error || stderr) {
              throw new Error(`Error while upgrading :(\n\n ${error || stderr}`)
            }

            console.log(stdout)
          },
        )
      }
    }
  })
})()
