#!/usr/bin/env node
import * as yargs from 'yargs'
import * as json from 'jsonfile'
import * as path from 'path'

const DAFAULT_TEMPLATE_PATH = 'template/package.json'

export default (async () => {
  const argv = yargs.argv

  const templatePath = argv.t || argv.template || DAFAULT_TEMPLATE_PATH

  console.log(templatePath)

  const template = await json.readFile(path.resolve(templatePath as string))

  console.log(template)
})()
