#!/usr/bin/env node
import * as json from 'jsonfile'
import * as path from 'path'

import * as semver from 'semver'

const DEFAULT_RELEASE_TYPE = 'patch'
const RELEASE_TYPES: ['major', 'minor', 'patch'] = ['major', 'minor', 'patch']

export default (async () => {
  const pkg = json.readFileSync(path.resolve('./package.json'))
  const name = path.basename(process.cwd())
  const prevVersion = pkg.version

  type ReleaseType = typeof RELEASE_TYPES[number]

  let releaseType: ReleaseType = DEFAULT_RELEASE_TYPE

  process.argv.forEach(arg => {
    const _arg = arg as ReleaseType
    if (RELEASE_TYPES.includes(_arg)) {
      releaseType = _arg
    }
  })

  pkg.version = semver.inc(prevVersion, releaseType)

  console.log(`Package: ${name}: ${prevVersion} => ${pkg.version}`)

  json.writeFileSync(path.resolve('./package.json'), pkg, {
    spaces: 2,
  })
})()
