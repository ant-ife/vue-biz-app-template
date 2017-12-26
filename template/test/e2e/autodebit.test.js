import {
  driver,
  BASE_URL,
} from './helper'

describe('autodebit', () => {
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

  describe('autodebit', () => {
    it('autodebit', () => {
      return driver
        .getUrl(`${BASE_URL}/autodebit`)
        .sleep(500)
    })

    it('autodebit', () => {
      return driver
        .getUrl(`${BASE_URL}/autodebit/list`)
        .sleep(500)
    })

    it('autodebit', () => {
      return driver
        .getUrl(`${BASE_URL}/autodebit/detail`)
        .sleep(500)
    })
  })
})

