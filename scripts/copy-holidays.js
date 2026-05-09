import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcFile = resolve(__dirname, '../src/data/holidays.json')
const outDir = resolve(__dirname, '../dist')
const outFile = resolve(outDir, 'holidays.json')

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

copyFileSync(srcFile, outFile)
console.log(`Copied ${srcFile} to ${outFile}`)
