import {
  driver,
  BASE_URL,
} from './helper'

describe('test/e2e/page.test.js', () => {
  before(() => {
    return driver
      .initWindow({
        userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent Language/en_US',
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
      })
  })

  beforeEach(() => {
    return driver
  })

  afterEach(function () {
    return driver
      .coverage()
      .saveScreenshots(this)
  })

  after(() => {
    return driver
      .openReporter(false)
      .quit()
  })

  describe('home page', () => {
    it('render should be success', () => {
      return driver
        .getUrl(`${BASE_URL}/`)
        .sleep(5000)
    })
  })

  describe('error page', () => {
    it('render should be success', () => {
      return driver
        .getUrl(`${BASE_URL}/error`)
        .sleep(1000)
    })
  })

  describe('404 page', () => {
    it('render should be success', () => {
      return driver
        .getUrl(`${BASE_URL}/404`)
        .sleep(1000)
    })
  })

})

