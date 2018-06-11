'use strict'

const {
  detectPort,
} = require('xutil')
const path = require('path')
const webpack = require('webpack')
const DataHub = require('macaca-datahub')
const datahubProxyMiddle = require('datahub-proxy-middleware')

const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const utils = require('../util/utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const datahubConfig = config.dev.datahub

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  resolve: {
    alias: {
      jsbridge: resolve('build/support/jsbridge'),
    },
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        usePostCSS: true,
      }),
    ],
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before: app => {
      datahubProxyMiddle(app)(datahubConfig)
    },
    after: () => {
      defaultDatahub.startServer(datahubConfig).then(() => {
        console.log('datahub ready')
      })
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
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
