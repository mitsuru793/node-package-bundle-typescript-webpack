#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'

const packageJson = require('package-json')

const root = path.join(__dirname, '../')

async function main() {
  const pack = readPackageJson()

  let html = ''
  for (let [packageName, version] of Object.entries(pack.dependencies)) {
    const npm = `https://www.npmjs.com/package/${packageName}`

    const meta = await packageJson(packageName, {fullMetadata: true})
    const github = meta.repository.url.match(/https?:\/\/github\.com\/.+\/[^.]+/)[0]
    const homepage = meta.homepage

    html += `
### ${meta.name}: ${version}

${link('Npm', npm)} /
${link('Github', github)} /
${link('Homepage', homepage)}

${meta.description}
`
  }

  log(html.trim())
}

function log(text: string): void {
  console.log(text)
}

function readPackageJson(): { [key: string]: any } {
  const file = path.join(root, 'package.json')
  const raw = fs.readFileSync(file)
  return JSON.parse(raw.toString())
}

function link(text: string, url: string): string {
  return `[${text}](${url})`
}

main()
