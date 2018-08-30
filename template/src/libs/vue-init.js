import 'core-js/fn/promise'
import FastClick from 'awesome-fastclick'
import Vue from 'vue'
import * as filters from '~utils/filters'
import * as directives from '~utils/directives'
import gettext from '~utils/gettext'
import components from '~components/index'

/**
 * install gettext
 */
Vue.use(gettext)

// Init FastClick
FastClick.attach(document.body)

/**
 * Register global filter for all views
 */
/* istanbul ignore next */
for (const key in filters) {
  Vue.filter(key, filters[key])
}

/**
 * Register global directive for all views
 */
/* istanbul ignore next */
for (const key in directives) {
  Vue.directive(key, directives[key])
}

/**
 * Register global component for all views
 */
for (const key in components) {
  Vue.component(key, components[key])
}

export default Vue
