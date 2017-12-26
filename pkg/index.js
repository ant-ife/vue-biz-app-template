var fs = require('fs')
var path = require('path')
var dir = path.join(__dirname, 'settings')

var config = fs.readdirSync(dir).reduce(function (o, filename) {
  var name = filename.replace(/\.js$/, '')
  o[name] = require(path.join(dir, name))
  return o
}, {})

module.exports = config
