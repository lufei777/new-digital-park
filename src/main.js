// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import Vuex from 'vuex'
import store from './vuex/store'

// ElementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 自适应表格列
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

// cookie插件
import Cookies from 'js-cookie'
window.Cookies = Cookies

// moment时间组件
import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化

// 拖拽插件
import VueDND from 'awe-dnd'
Vue.use(VueDND)

// 语言包
import VueI18n from 'vue-i18n'
import LangEN from './utils/lang/en.js'
import LangZH from './utils/lang/zh.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: Cookies.get('lang'),
  messages: {
    'en': LangEN,
    'zh': LangZH
  }
});
if (!Cookies.get('lang')) {
  Cookies.set('lang', 'zh')
}

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
