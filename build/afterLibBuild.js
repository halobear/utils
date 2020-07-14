const path = require('path')
const fs = require('fs')

const pkg = fs.readFileSync(path.resolve(__dirname, '..', 'package.json'))
const pkgJSON = JSON.parse(pkg, 'utf-8')
const newPkg = path.resolve(__dirname, '../lib/package.json')
pkgJSON.main = 'utils.js'

fs.writeFileSync(newPkg, JSON.stringify(pkgJSON, null, 2), 'utf-8')
