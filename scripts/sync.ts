#!/usr/bin/env node
import * as json from 'jsonfile'
import * as path from 'path'

const PKG_IGNORE_FILEDS = [
  'version',
  'devDependencies',
  'peerDependencies',
  'dependencies',
]
const PLACEHOLDER_NAME = 'package_name'

const PACKAGE_TEMPLATE_PATH = '../../templates/package.json'
const TSCONFIG_TEMPLATE_PATH = '../../templates/tsconfig.json'
const TSLINT_TEMPLATE_PATH = '../../templates/tslint.json'

export default (() => {
  const prevPkg = json.readFileSync(path.resolve('./package.json'))
  const nextPkg = json.readFileSync(path.resolve(PACKAGE_TEMPLATE_PATH))

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

  // copy version
  nextPkg.version = prevPkg.version

  // why only sync pretty-print ??
  json.writeFileSync(path.resolve('./package.json'), nextPkg, {
    spaces: 2,
  })

  // sync tsconfig.json
  const tsconfigTemplate = json.readFileSync(
    path.resolve(TSCONFIG_TEMPLATE_PATH),
  )

  let tsconfig
  try {
    tsconfig = json.readFileSync(path.resolve('./tsconfig.json'))
  } catch {
    // in case of no file
    tsconfig = tsconfigTemplate
  }

  // sync compilerOptions, but keep paths
  tsconfig.compilerOptions = {
    paths: tsconfig.compilerOptions.paths,
    ...tsconfigTemplate.compilerOptions,
  }

  json.writeFileSync(path.resolve('./tsconfig.json'), tsconfig, {
    spaces: 2,
  })

  // overwrite tslint.json
  const tslint = json.readFileSync(path.resolve(TSLINT_TEMPLATE_PATH))
  json.writeFileSync(path.resolve('./tslint.json'), tslint, {
    spaces: 2,
  })

  console.log(`Synced: ${nextPkg.name}`)
})()
