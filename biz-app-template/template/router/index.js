import * as pages from '../constants/pages'

export default [
  {
    meta: {
      titleKey: '{{ name }}.title',
    },
    name: pages.{{ toUpperCase name }}_INDEX,
    path: '/{{ name }}',
    component: r => require.ensure([], () => r(require('../views/index')), '{{ name }}'),
  },
]
