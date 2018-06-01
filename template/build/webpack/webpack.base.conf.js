const fs = require('fs')
const path = require('path')

const utils = require('../util/utils')
const config = require('../config/index')
const pkg = require('../../package.json')
const vueLoaderConfig = require('../util/vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

/**
 * get alias
 */
const alias = fs.readdirSync(resolve('src')).reduce((memo, f) => {
  memo[`~${f}`] = resolve(`src/${f}`)
  return memo
}, {})

/**
 * get entries
 */
const entryPath = resolve('src/entry')
const entries = fs.readdirSync(entryPath).reduce(function (o, filename) {
  filename = filename.replace(/\.js$/, '')
  o[filename] = path.join(entryPath, filename)
  return o
}, {})

const configs = process.env.NODE_ENV === 'production'
  ? config.build
  : config.dev

const matchSVGSpritePath = /assets\/icons/

module.exports = {
  entry: Object.assign({}, entries, {
    vendor: ['vue', 'vuex', 'vue-router', 'es6-promise', 'awesome-fastclick', 'whatwg-fetch'],
  }),
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`${pkg.version}/${configs.jsFilename}`),
    chunkFilename: utils.assetsPath(`${pkg.version}/${configs.jsFilename}`),
    publicPath: configs.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: Object.assign({}, alias, {
      '~rpc': process.env.MOCK === 'true' ? resolve('mock/rpc-mock') : resolve('src/utils/rpc'),
    }),
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('mock')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
        exclude: [
          matchSVGSpritePath,
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
        include: [
          matchSVGSpritePath,
        ],
      },
      /**
       * image2svg-loader used for temporary bugfix
       * see https://github.com/kisenka/svg-sprite-loader/issues/179
       */
      {
        test: /\.png$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
          'image2svg-loader',
        ],
        include: [
          matchSVGSpritePath,
        ],
      },
    ],
  },
}
