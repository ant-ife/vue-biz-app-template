const pkgSettings = require('./pkg')

module.exports = {
  helpers: {
    if_or: function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'An ife webapp project',
    },
    flow: {
      type: 'confirm',
      required: true,
      message: 'Using static checker flow',
      default: false,
    },
    test: {
      type: 'confirm',
      required: true,
      message: 'UI Test',
      default: true,
    },
  },
  filters: {
    'test/**/*': 'test',
    'flow-typed/modules.js': 'flow',
    '.flowconfig': 'flow',
  },
  settings: {
    test: {
      files: ['test/**/*', 'build/webpack/webpack.test.conf.js', '.torch.compile.opts.js', '.babelrc'],
      'package.json': Object.assign({}, pkgSettings.test, {
        scripts: {
          test: 'rm -rf screenshots && cross-env NODE_ENV=test macaca run -d ./test/e2e --verbose --reporter macaca-reporter',
          serve: 'npm run dev:test &',
          'dev:test': 'cross-env NODE_ENV=test MOCK=true webpack-dev-server --inline --progress --config build/webpack/webpack.test.conf.js',
          unit: 'cross-env NODE_ENV=test torch --require ./test/unit/helper.js --compile --renderer --http --recursive ./test/unit',
          'unit:debug': 'cross-env NODE_ENV=test torch --require ./test/unit/helper.js --compile --http --interactive --watch --recursive ./test/unit',
          ci: 'npm run lint && npm run unit && npm run serve && npm run test',
        },
      }),
    },
    lint: {
      files: ['.eslintrc.js', '.eslintignore', '.stylelintrc.js'],
      'package.json': pkgSettings.lint,
    },
    babel: {
      files: ['.babelrc'],
      'package.json': pkgSettings.babel,
    },
    webpack: {
      files: ['build/**/*.js', '!build/webpack/webpack.test.conf.js'],
      'package.json': pkgSettings.webpack,
    },
    flow: {
      files: ['.flowconfig', 'flow-typed/modules.js', '.babelrc', '.eslintrc.js'],
      'package.json': Object.assign({}, pkgSettings.flow, {
        scripts: {
          flow: 'flow',
        },
      }),
    },
  },
  /**
   *
   * @param data metalsmith.metadata()
   * @param dest destination of project
   * @param chalk
   * @param logger logger method. logger.info, logger.success, logger.error
   * @param files
   */
  complete: function (data, dest, { chalk, logger, files }) {
    // The method run here needs to be the sync version. Do not write async, promise, callback
    // And only runs in apfe init ...
    require('./pkg/generator.js')(data, dest)
  },
  skipInterpolation: [
    'src/**/*.vue',
    'src/utils/text.js',
    'src/i18n/*.js',
    'src/utils/gettext.js',
  ],
  completeMessage: 'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at http://site.alipay.net/ant-ife/vue-aplus-project-template/',
}
