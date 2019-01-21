#!/usr/bin/env node
import * as json from 'jsonfile'
import * as path from 'path'

import * as semver from 'semver'

const DEBUG = false

export default (async () => {
  const pkg = json.readFileSync(path.resolve('./package.json'))
  const name = path.basename(process.cwd())
  const upstreamVersionRange = pkg.devDependencies[name]
  const coercedSemver = semver.coerce(upstreamVersionRange)

  const prevVersion = pkg.version
  // manual if package uses non-semver version
  if (!coercedSemver) {
    console.error(
      `Package: ${name} has invalid upstream semver version: ${upstreamVersionRange}'`,
    )
  } else {
    if (!pkg.vesrion) {
      console.error(`Package ${name} is missing version field!`)
      pkg.version = coercedSemver.version
    }

    // if package version matches devDeps => bump prerelase
    if (semver.diff(pkg.version, coercedSemver.version) === 'prerelease') {
      pkg.version = semver.inc(pkg.version, 'prerelease')
    } else {
      // else create new prerelease version by adding '-0
      pkg.version = coercedSemver.version + '-0'
    }

    console.log(`Package: ${name}: ${prevVersion} => ${pkg.version}`)

    DEBUG && console.log('pkg.version: ', pkg.version)

    DEBUG && console.log('pkg: ', pkg)

    json.writeFileSync(path.resolve('./package.json'), pkg, {
      spaces: 2,
    })
  }
})()
