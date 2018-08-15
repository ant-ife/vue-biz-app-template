const {
  detectPort,
  ipv4,
} = require('xutil')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DataHub = require('macaca-datahub')
const datahubMiddleware = require('datahub-proxy-middleware')

const utils = require('../util/utils')
const config = require('../config/index')
const datahubConfig = config.dev.datahub
const baseWebpackConfig = require('./webpack.base.conf')

const resolve = function (dir) {
  return path.join(__dirname, '..', '..', dir)
}

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
})

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
    ],
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#source-map',

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    contentBase: path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory),
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: ipv4,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    before: app => {
      datahubMiddleware(app)(datahubConfig)
    },
    after: () => {
      defaultDatahub.startServer(datahubConfig).then(() => {
        console.log('datahub ready')
      })
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!ejs-compiled-loader!index.ejs',
      inject: true,
    }),
  ],
})

module.exports = new Promise((resolve, reject) => {
  detectPort(process.env.PORT || config.dev.port, (err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined,
      }))

      resolve(devWebpackConfig)
    }
  })
})
