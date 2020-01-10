// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import Vuex from 'vuex'
import store from './vuex/store'

//v-charts
import VeLine from 'v-charts/lib/line.common' //折线图
import VeBar from 'v-charts/lib/bar.common' //条形图
import VeHistogram from 'v-charts/lib/histogram.common' //柱状图
import VePie from 'v-charts/lib/pie.common' //饼图
import VeRing from 'v-charts/lib/ring.common' //环图

Vue.component(VeLine.name, VeLine);
Vue.component(VeBar.name, VeBar);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VePie.name, VePie);
Vue.component(VeRing.name, VeRing);
import "v-charts/lib/style.css"

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

import axios from '@/service/axios/AxiosInterceptors.js'
Vue.prototype.$axios = axios;

// install directives
import installDirectives from '@/directives'
installDirectives(Vue);

// 语言包
if (!Cookies.get('lang')) {
  Cookies.set('lang', 'zh')
}
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
