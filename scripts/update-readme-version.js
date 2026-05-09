import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')

// Read package.json to get version
const pkgPath = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
const version = pkg.version

// Read README and update version badge
const readmePath = join(root, 'README.md')
const readme = readFileSync(readmePath, 'utf8')
const updated = readme.replace(
  /!\[Version]\(https:\/\/img\.shields\.io\/badge\/version-[\d.]+-blue\)/,
  `![Version](https://img.shields.io/badge/version-${version}-blue)`
)

writeFileSync(readmePath, updated, 'utf8')
console.log(`✓ Updated README version badge to ${version}`)
