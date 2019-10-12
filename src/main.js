// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import routes from './router/index'

import App from './App'

Vue.use(ElementUI)
Vue.use(VueRouter)

import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

import Cookies from 'js-cookie'
window.Cookies = Cookies

import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化

import VueDND from 'awe-dnd'
Vue.use(VueDND)

import VueI18n from 'vue-i18n'
import LangENUS from './utils/lang/en-us.js'
import LangZHCN from './utils/lang/zh-cn.js'
Vue.use(VueI18n)

let router = new VueRouter({
  routes
})

const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'en-us': LangENUS,
    'zh-cn': LangZHCN
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  Vuex,
  store,
  components: { App },
  template: '<App/>'
})
