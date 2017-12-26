/**
 * Check Env
 */
export const UA = window.navigator.userAgent
export const device = {
  iOS: /iPhone|iPad|iPod/i.test(UA),
  Android: /Android/i.test(UA),
}

export const isInContainer = UA.toLocaleLowerCase().indexOf('__YOUR_UA_TAG__') !== -1

export const sleep = (ms, param) =>
  new Promise((resolve) => setTimeout(resolve, ms, param))

/**
 *
 * @param {Array} array
 * @param {(item: any) => boolean} condition
 */
export const arrayFind = (array, condition) => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (condition(item)) {
      return item
    }
  }

  return null
}

/**
 * Type detect
 */
const toString = Object.prototype.toString
const is = (type) => (obj) => toString.call(obj) === `[object ${type}]`
export const isRegExp = is('RegExp')
export const isString = is('String')
export const isFunction = is('Function')
export const isObject = is('Object')

export const requestAnimationFrame = (cb) => {
  var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame
  /**
   * polyfill if not support requestAnimationFrame
   */
  if (!raf) {
    let lastTime = 0
    window.requestAnimationFrame = function (callback) {
      const now = Date.now()
      const nextTime = Math.max(lastTime + 16, now)
      return setTimeout(() => { callback(lastTime = nextTime) }, nextTime - now)
    }
    window.cancelAnimationFrame = clearTimeout
    raf = window.requestAnimationFrame
  }

  return raf(cb)
}

/**
 * Usage:
 * ```
 * const createP = num => Promise.resolve(num * num)
 * const singleCreateP = singletonPromise(createP)
 *
 * const a = singleCreateP()
 * const b = singleCreateP()
 * // here sleep 100ms
 * const c = singleCreateP()
 *
 * a === b // true
 * a === c // false
 *
 * ```
 * @param {(key?: string | number) => Promise} fn
 */
export const singletonPromise = (fn, keyCreater) => {
  const singletonMap = {}

  return (...args) => {
    const key = keyCreater ? keyCreater(...args) : args[0]

    let p = singletonMap[key]
    if (p) return p

    p = fn(...args)

    singletonMap[key] = p

    const cb = (a) => {
      p = null
      delete singletonMap[key]
    }

    p.then(cb, cb)

    return p
  }
}
