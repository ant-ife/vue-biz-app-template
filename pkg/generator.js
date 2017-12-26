const fs = require('fs')
const path = require('path')
const pkgSettings = require('../pkg')

module.exports = function (conf, dest) {
  const pkg = require(path.join(dest, 'package.json'))
  const keys = Object.keys(pkgSettings)
  for (let i = 0; i < keys.length; i++) {
    const module = keys[i]
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
