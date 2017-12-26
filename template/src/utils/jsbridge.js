import { UA, isInContainer, isString, isFunction, isObject, requestAnimationFrame } from '~utils'
import _rpc from '~rpc'
import router from '~router'

const JS_BRIDGE_NAME = 'AlipayJSBridge'
const IN_BROWSER_DEBUG_UA = 'InBrowserDebug' // for debug in browser

const hasBridge = isInContainer && (UA.indexOf(IN_BROWSER_DEBUG_UA) === -1)

const jsbridge = {
  _apiQueue: [],

  on (event, fn) {
    event.split(/\s+/g).forEach((eventName) => {
      document.addEventListener(eventName, fn, false)
    })
  },

  off (event, fn) {
    event.split(/\s+/g).forEach((eventName) => {
      document.removeEventListener(eventName, fn, false)
    })
  },

  call () {
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
    if (window[JS_BRIDGE_NAME] && window[JS_BRIDGE_NAME].call) {
      fn && fn()
    } else {
      this.on(JS_BRIDGE_NAME + 'Ready', fn)
    }
  },

  setTitle (title = '') {
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
    if (hasBridge) {
      this.call('popWindow', data)
    } else {
      router.back()
    }
  },

  pushWindow (opt = '') {
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
    this.call('exitSession')
  },

  openInBrowser (opt, fn) {
    if (isString(opt)) {
      opt = { url: opt }
    }

    this.call('openInBrowser', opt, fn)
  },

  setCloseButton (opt) {
    this.call('setCloseButton', opt)
  },

  setBackButton (opt) {
    this.call('setBackButton', opt)
  },

  setOptionMenu (opt) {
    this.call('setOptionMenu', opt)
  },

  showOptionMenu () {
    this.call('showOptionMenu')
  },

  hideOptionMenu () {
    this.call('hideOptionMenu')
  },

  postNotification (opt, fn) {
    this.call('postNotification', opt, fn)
  },

  rpc (operationType = '', requestData = {}, fn) {
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
