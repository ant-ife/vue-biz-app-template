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

