#!/usr/bin/env node

import * as Octokit from '@octokit/rest'
import * as semver from 'semver'
import * as json from 'jsonfile'
import * as path from 'path'
import { exec } from 'child_process'
import { exists } from 'fs'

const OWNER = 'vadistic'
const REPO = 'types'
const GIT_URL = 'https://github.com'

export default (async () => {
  let arg: 'upgrade' | 'outdated' | undefined
  process.argv.forEach(argv => {
    if (argv === 'upgrade' || argv === 'outdated') {
      arg = argv
    }
  })

  if (!arg) {
    console.log(
      `
      Upgrade script from vadistic/types (making up for lack of yarn support)

      Usage:  -upgrade [command]

      Commands:
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

  const octokit = new Octokit()
  const pkg = await json.readFile(path.resolve(process.cwd(), 'package.json'))

  const versionRegex = /(?!v)([0-9]+.[0-9]+.[0-9]+(-[0-z-.]+)?)(?=-gitpkg)/

  // TODO: support pagination if I ever would reach 100 records
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
    return 0
  }

  interface OutdatedItem {
    name: string
    tag: string
    installedVersion: string
    latestVersion: string
  }

  let outdated = [] as OutdatedItem[]

  typings.forEach(([name, repo]) => {
    const upstreamName = name.replace('@types/', '')

    const installedVersion = repo.match(versionRegex)![0]

    const allVersions = tags.data
      .filter(tag => {
        const typesTags = tag.name.match(`types-${upstreamName}`)
        const utilTags = tag.name.match(upstreamName)
        return [...(typesTags ? typesTags : []), ...(utilTags ? utilTags : [])]
      })
      .map(tag => tag.name)

    const latestVersionInfo = allVersions.reduce(
      (prev, tag) => {
        const version = tag.match(versionRegex)![0]
        return semver.gt(version, prev.version) ? { version, tag } : prev
      },
      {
        version: installedVersion,
        tag: repo.replace(`${GIT_URL}/${OWNER}/${REPO}#`, ''),
      },
    )

    if (semver.gt(latestVersionInfo.version, installedVersion)) {
      outdated.push({
        name: upstreamName,
        tag: latestVersionInfo.tag,
        installedVersion: installedVersion,
        latestVersion: latestVersionInfo.version,
      })
    }

    if (outdated.length === 0) {
      console.log(`Everything's up to date!`)
    } else {
      console.log(`Found outdated typings packages`)
      outdated.forEach(entry => {
        console.log(
          `${entry.name}: ${entry.installedVersion} => ${entry.latestVersion}`,
        )
      })

      if (arg === 'upgrade') {
        console.log('Installing...')

        const command = `yarn add -D ${outdated
          .map(entry => `${GIT_URL}/${OWNER}/${REPO}#${entry.tag}`)
          .join(' ')}`

        exec(command, {}, (error, stdout, stderr) => {
          if (error || stderr) {
            console.error(`Error while upgrading :()`)
            console.error(error || stderr)
          }

          console.log(stdout)
        })
      }
    }

    process.exit()
    return 0
  })
})()
