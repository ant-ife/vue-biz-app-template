const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname, 'settings')

const config = fs.readdirSync(dir).reduce(function (o, filename) {
  const name = filename.replace(/\.js$/, '')
  o[name] = require(path.join(dir, name))
  return o
}, {})

module.exports = config
