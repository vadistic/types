#!/usr/bin/env node
import * as json from 'jsonfile'
import * as path from 'path'

const PKG_IGNORE_FILEDS = ['version', 'devDependencies', 'peerDependencies']
const PLACEHOLDER_NAME = 'package_name'

export default (async () => {
  const pkg = json.readFileSync(path.resolve('./package.json'))
  const pkgTemplate = json.readFileSync(
    path.resolve('../../templates/package.json'),
  )

  // check if dirname is in sync with pkg name
  const name = path.basename(process.cwd())

  if (name !== (pkg.name as string).replace('@types/', '')) {
    console.error(`Package naming issue`, name, pkg.name)
  }

  Object.keys(pkgTemplate).forEach(field => {
    // sync non-ignored fields
    if (!PKG_IGNORE_FILEDS.includes(field)) {
      // replace string names and copy the rest
      pkgTemplate[field] =
        typeof pkgTemplate[field] === 'string'
          ? pkgTemplate[field].replace(PLACEHOLDER_NAME, name)
          : pkgTemplate[field]
    }
    // copy rest
    else {
      pkgTemplate[field] = pkg[field]
    }
  })

  // sync peerDeps to DevDeeps
  pkg['peerDependencies'] = pkg['devDependencies']

  json
    .writeFile(path.resolve('./package.json'), pkgTemplate, { spaces: 2 })
    .then(() => {
      console.log(`Synced: ${pkg['name']}`)
    })
})()
