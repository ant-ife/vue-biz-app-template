'use strict'

export function gettext (key, vars = {}) {
  let value = window.i18n[key]

  if (typeof value === 'undefined') {
    console.warn('text null: ', key)
    return ''
  }

  value = textReplace(value, vars)

  return value
}

export function textReplace (value = '', vars = {}) {
  return value.replace(/{{\s*(\S*)\s*}}/g, ($0, key) => {
    return vars[key] || ''
  })
}

/**
 * register:
 * Vue.use(gettext)
 *
 * usage:
 * vm.gettext()
 * {{ 'xx' | gettext }}
 */
export default {
  install (Vue) {
    Vue.filter('gettext', gettext)

    Vue.mixin({
      methods: {
        gettext,
      },
    })
  },
}
