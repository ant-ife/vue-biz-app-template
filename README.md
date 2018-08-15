# vue-biz-app-template

[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![vue version][vue-image]][vue-url]
[![webpack version][webpack-image]][webpack-url]

[travis-image]: https://img.shields.io/travis/ant-ife/vue-biz-app-template.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-ife/vue-biz-app-template
[node-image]: https://img.shields.io/badge/node.js-%3E=8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[vue-image]: https://img.shields.io/badge/Vue-2-green.svg?style=flat-square
[vue-url]: https://vuejs.org/
[webpack-image]: https://img.shields.io/badge/Webpack-4-green.svg?style=flat-square
[webpack-url]: https://vuejs.org/

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible

- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [apfe-cli](https://github.com/ant-ife/apfe-cli).

``` bash
$ npm install -g apfe-cli
$ apfe init my-project
$ cd my-project
$ npm i
$ npm run dev
```

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

## how to write apfe updating logic

1. udpate settings (which will replace all the related files and extend the package.json)

### update settings

Let's take a look at ```meta.js```'s ```settings``` key

```js
  "settings": {
    "lint": {
      "files": [".eslintrc.js", ".eslintignore", ".stylelintrc"],
      "package.json": {
        "devDependencies": {
          "eslint": "^3.19.0",
          "eslint-friendly-formatter": "^2.0.7",
          "eslint-loader": "^1.7.1",
          "eslint-plugin-babel": "^4.1.1",
          "eslint-plugin-html": "^2.0.0",
          "stylelint": "^7.10.1",
          "babel-eslint": "^7.1.1"
        }
      }
    },
    "babel": {
      "files": [".babelrc"],
      "package.json": {
        "devDependencies": {
          "babel-core": "^6.22.1",
          "babel-eslint": "^7.1.1",
          "babel-loader": "^6.2.10",
          "babel-plugin-transform-object-assign": "^6.22.0",
          "babel-plugin-transform-object-rest-spread": "^6.23.0",
          "babel-plugin-transform-runtime": "^6.22.0",
          "babel-plugin-transform-regenerator": "^6.26.0",
          "babel-preset-es2015": "^6.24.1",
          "babel-register": "^6.22.0"
        }
      }
    },
    "webpack": {
      "files": ["build/**/*.js"],
      "package.json": {
        "dependencies": {
          "es6-promise": "^4.1.0",
          "awesome-fastclick": "^1.0.6",
          "vue": "^2.4.3",
          "vue-router": "^2.7.0",
          "vuex": "^2.4.0",
          "whatwg-fetch": "^2.0.3"
        },
        "devDependencies": {
          "chalk": "^1.1.3",
          "connect-history-api-fallback": "^1.3.0",
          "copy-webpack-plugin": "^4.0.1",
          "css-loader": "^0.28.0",
          "ejs-compiled-loader": "^2.2.0",
          "eventsource-polyfill": "^0.9.6",
          "express": "^4.14.1",
        }
      },
    },
  },
```

Let's take ```babel``` for example.

The ```babel``` is the module name, which will be used in ```apfe update babel```.

The ```files``` means the files that needs to be replaced by updating.(The files desc could use [glob pattern](https://github.com/isaacs/node-glob))

The ```package.json``` means the existing project's package.json needs to be extended by this module.

## License

The MIT License (MIT)
