'use strict'

const fs = require('fs')
const path = require('path')
const moduleAlias = require('module-alias')

const join = path.join
const basename = path.basename
const lstatSync = fs.lstatSync
const readdirSync = fs.readdirSync

const cwd = process.cwd()

const isDirectory = function (source) {
  return lstatSync(source).isDirectory()
}

const getDirectories = function (source) {
  return readdirSync(source).map(function (name) {
    return join(source, name)
  }).filter(isDirectory)
}

getDirectories(join(cwd, 'src')).forEach(function (dir) {
  const bn = basename(dir)
  moduleAlias.addAlias(`~${bn}`, dir)
})

moduleAlias.addAlias('~rpc', join(cwd, './src/utils/rpc'))
