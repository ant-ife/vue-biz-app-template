const allIcons = require.context('~assets/icons', true, /\.(svg|png)$/)
function importAll (r) {
  r.keys().forEach(r)
}
importAll(allIcons)
