// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import Vuex from 'vuex'
import store from './vuex/store'

import LangEN from './utils/lang/en.js'
import LangZH from './utils/lang/zh.js'

// ElementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, LangZH[window.__CZ_SYSTEM] ? {
  locale: LangZH[window.__CZ_SYSTEM].elementUI
} : {})

// 自适应表格列
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)

// cookie插件
import Cookies from 'js-cookie'
window.Cookies = Cookies

// moment时间组件
import moment from 'moment'
moment.locale('zh-cn');//需要汉化
window.moment = moment;
Vue.prototype.$moment = moment;//赋值使用


import axios from '@/service/axios/AxiosInterceptors.js'
Vue.prototype.$axios = axios;

// cizing 封装组件
import zvue from './components/zvue';
Vue.use(zvue);

// 语言包
if (!Cookies.get('lang')) {
  Cookies.set('lang', 'zh')
}
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: Cookies.get('lang'),
  messages: {
    'en': LangEN,
    'zh': LangZH
  }
});

// lodash
import _ from 'lodash';
Vue.prototype._ = _;

//fragment
import VueFragment from 'vue-fragment'
Vue.use(VueFragment.Plugin);

//默认返回瀑布流首页
if (!Cookies.get('moduleType')) {
  Cookies.set('moduleType', 2)
}

//charts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

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
