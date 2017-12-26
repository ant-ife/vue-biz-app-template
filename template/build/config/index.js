const path = require('path')
const { ipv4 } = require('xutil')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off,
    jsFilename: '[name].[chunkhash].js',
    cssFilename: '[name].[contenthash].css',
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host: ipv4, // can be overwritten by process.env.HOST
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    notifyOnErrors: true,
    jsFilename: '[name].[hash].js',
    cssFilename: '[name].[hash].css',
    datahub: {
      port: 5678,
      hostname: '127.0.0.1',
      store: path.resolve(__dirname, '../../mock/data'),
      proxy: {
        '^/api': {
          hub: 'sample',
        },
      },
      showBoard: false,
    },
  }
}
