#!/usr/bin/env node
import * as json from 'jsonfile'
import * as path from 'path'

const PKG_IGNORE_FILEDS = ['version', 'devDependencies', 'peerDependencies']
const PLACEHOLDER_NAME = 'package_name'

export default (async () => {
  const prevPkg = json.readFileSync(path.resolve('./package.json'))
  const nextPkg = json.readFileSync(
    path.resolve('../../templates/package.json'),
  )

  // check if dirname is in sync with pkg name
  const name = path.basename(process.cwd())

  if (name !== (prevPkg.name as string).replace('@types/', '')) {
    console.error(
      `Package naming issue: driname '${name}' !== pkgname '${prevPkg.name}'`,
    )
  }

  Object.keys(nextPkg).forEach(field => {
    // sync non-ignored fields
    if (!PKG_IGNORE_FILEDS.includes(field)) {
      // replace string names and copy the rest
      nextPkg[field] =
        typeof nextPkg[field] === 'string'
          ? nextPkg[field].replace(PLACEHOLDER_NAME, name)
          : nextPkg[field]
    } else {
      nextPkg[field] = prevPkg[field]
    }
  })

  // sync peerDeps to DevDeeps
  nextPkg.peerDependencies = nextPkg.devDependencies

  // copy dependencies
  nextPkg.dependencies = prevPkg.dependencies

  // why only sync pretty-print ??
  json.writeFileSync(path.resolve('./package.json'), nextPkg, {
    spaces: 2,
  })

  console.log(`Synced: ${nextPkg.name}`)
})()
