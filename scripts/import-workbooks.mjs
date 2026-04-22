import fs from 'node:fs'
import path from 'node:path'
import XLSX from 'xlsx'

const root = process.cwd()
const rawDir = path.join(root, 'data', 'raw')
const catalogPath = path.join(root, 'data', 'catalog', 'segments.json')
const workbookFiles = ['27 maxx line 1 rus.xlsx', '92-3 56D 24-V5.xlsx']
const availableFiles = workbookFiles.filter((file) => fs.existsSync(path.join(rawDir, file)))

if (availableFiles.length === 0) {
  console.log('No workbook files found in data/raw. Keeping existing seeded catalog JSON.')
  process.exit(0)
}

const inventory = []
for (const fileName of availableFiles) {
  const workbook = XLSX.readFile(path.join(rawDir, fileName))
  for (const sheetName of workbook.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null })
    inventory.push({ sourceFile: fileName, sourceSheet: sheetName, rowCount: rows.length })
  }
}

fs.writeFileSync(catalogPath, `${JSON.stringify(inventory, null, 2)}\n`)
console.log(`Wrote workbook inventory to ${catalogPath}`)
