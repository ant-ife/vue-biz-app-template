import { UA, isInContainer, isString, isFunction, isObject, requestAnimationFrame } from '~utils'
import _rpc from '~rpc'
import router from '~router'

const JS_BRIDGE_NAME = 'AlipayJSBridge'
const IN_BROWSER_DEBUG_UA = 'InBrowserDebug' // for debug in browser

const hasBridge = isInContainer && (UA.indexOf(IN_BROWSER_DEBUG_UA) === -1)

const jsbridge = {
  _apiQueue: [],

  on (event, fn) {
    /* istanbul ignore next */
    event.split(/\s+/g).forEach((eventName) => {
      document.addEventListener(eventName, fn, false)
    })
  },

  off (event, fn) {
    /* istanbul ignore next */
    event.split(/\s+/g).forEach((eventName) => {
      document.removeEventListener(eventName, fn, false)
    })
  },

  call () {
    /* istanbul ignore next */
    const args = [].slice.call(arguments)

    if (window[JS_BRIDGE_NAME] && window[JS_BRIDGE_NAME].call) {
      // name + object + function
      const name = args[0]
      let opt = args[1] || {}
      let cb = args[2]

      if (!isString(name)) {
        console.error('apiName error：', name)
        return
      }
      if (cb === undefined && isFunction(opt)) {
        cb = opt
        opt = {}
      }
      if (!isObject(opt)) {
        console.error(name + ': options is not object')
        return
      }

      const _callback = cb
      cb = (result) => {
        result.errorCode = result.error || 0
        _callback && _callback(result)
      }

      window[JS_BRIDGE_NAME].call(name, opt, cb)
    } else {
      this._apiQueue.push(args)
    }
  },

  ready (fn) {
    /* istanbul ignore next */
    if (window[JS_BRIDGE_NAME] && window[JS_BRIDGE_NAME].call) {
      fn && fn()
    } else {
      this.on(JS_BRIDGE_NAME + 'Ready', fn)
    }
  },

  setTitle (title = '') {
    /* istanbul ignore next */
    title = title.trim()

    if (hasBridge) {
      this.call('setTitle', {
        title: title,
      })
    } else {
      document.title = title
    }
  },

  popWindow (data) {
    /* istanbul ignore next */
    if (hasBridge) {
      this.call('popWindow', data)
    } else {
      router.back()
    }
  },

  pushWindow (opt = '') {
    /* istanbul ignore next */
    if (opt) {
      if (isString(opt)) {
        opt = { url: opt }
      }

      if (hasBridge) {
        this.call('pushWindow', opt)
      } else {
        location.href = opt.url
      }
    }
  },

  close () {
    /* istanbul ignore next */
    this.call('exitSession')
  },

  openInBrowser (opt, fn) {
    /* istanbul ignore next */
    if (isString(opt)) {
      opt = { url: opt }
    }

    this.call('openInBrowser', opt, fn)
  },

  setCloseButton (opt) {
    /* istanbul ignore next */
    this.call('setCloseButton', opt)
  },

  setBackButton (opt) {
    /* istanbul ignore next */
    this.call('setBackButton', opt)
  },

  setOptionMenu (opt) {
    /* istanbul ignore next */
    this.call('setOptionMenu', opt)
  },

  showOptionMenu () {
    /* istanbul ignore next */
    this.call('showOptionMenu')
  },

  hideOptionMenu () {
    /* istanbul ignore next */
    this.call('hideOptionMenu')
  },

  postNotification (opt, fn) {
    /* istanbul ignore next */
    this.call('postNotification', opt, fn)
  },

  rpc (operationType = '', requestData = {}, fn) {
    /* istanbul ignore next */
    const option = { operationType }

    if (isFunction(requestData)) {
      fn = requestData
      requestData = {}
    }

    if (!Array.isArray(requestData)) {
      requestData = [requestData]
    }

    option.requestData = requestData

    _rpc(option, fn)
  },
}

jsbridge.ready(() => {
  /* istanbul ignore next */
  const apiQueue = jsbridge._apiQueue || []

  function next () {
    requestAnimationFrame(() => {
      const args = apiQueue.shift()
      jsbridge.call.apply(null, args)
      if (apiQueue.length) next()
    })
  }

  !!apiQueue.length && next()
})

export default jsbridge
