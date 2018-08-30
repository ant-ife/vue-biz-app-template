import {
  driver,
  BASE_URL,
} from './helper'

describe('test/e2e/i18n.test.js', () => {
  beforeEach(() => {
    return driver
  })

  afterEach(function () {
    return driver
      .coverage()
      .saveScreenshots(this)
      .quit()
  })

  after(() => {
    return driver
      .openReporter(false)
  })

  describe('zh_CN should be ok', () => {
    before(() => {
      return driver
        .initWindow({
          userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent Language/zh_CN',
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        })
    })

    it('render should be success', () => {
      return driver
        .getUrl(`${BASE_URL}/`)
        .sleep(5000)
    })
  })

  describe('zh_HK should be ok', () => {
    before(() => {
      return driver
        .initWindow({
          userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent Language/zh_HK',
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        })
    })

    it('render should be success', () => {
      return driver
        .getUrl(`${BASE_URL}/`)
        .sleep(5000)
    })
  })

})


