import {
  ipv4,
} from 'xutil'
import wd from 'macaca-wd'

const cwd = process.cwd()

export const driver = wd.promiseChainRemote({
  host: 'localhost',
  port: process.env.MACACA_SERVER_PORT || 3456,
})

const webpackDevServerPort = 8080

export const BASE_URL = `http://${ipv4}:${webpackDevServerPort}`
