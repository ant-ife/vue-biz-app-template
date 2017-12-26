var fs = require('fs')
var path = require('path')
var pkgSettings = require('../pkg')

module.exports = function (conf, dest) {
  var pkg = require(path.join(dest, 'package.json'))
  var keys = Object.keys(pkgSettings)
  for (var i = 0; i < keys.length; i++) {
    var module = keys[i]
    if (conf[module] === true) {
      pkg.dependencies = Object.assign(
        pkg.dependencies || {},
        pkgSettings[module].dependencies || {}
      )
      pkg.devDependencies = Object.assign(
        pkg.devDependencies || {},
        pkgSettings[module].devDependencies || {}
      )
    }
  }

  fs.writeFileSync(path.join(dest, 'package.json'), JSON.stringify(pkg, null, 2), 'utf-8')
}
