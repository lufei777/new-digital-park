// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index";

import Vuex from "vuex";
import store from "./vuex/store";

// 权限指令 用于校验角色权限
import directive from '@/directive';
Vue.use(directive);

// 权限校验方法 用于校验角色页面权限
import { checkPermission } from 'utils/permission';
Vue.prototype.checkPermission = checkPermission;

import LangEN from "./utils/lang/en.js";
import LangZH from "./utils/lang/zh.js";

// 获取项目
import { getProjectName } from "./utils/project";

// ElementUi
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, {
  locale: {
    el: _.defaults(
      LangZH[getProjectName()] ? LangZH[getProjectName()].el : {},
      locale.el
    )
  }
});

//打印插件
import Print from 'vue-print-nb';
Vue.use(Print);

// 自适应表格列
import AFTableColumn from "af-table-column";
Vue.use(AFTableColumn);

// cookie插件
import Cookies from "js-cookie";
window.Cookies = Cookies;

// moment时间组件
import moment from "moment";
moment.locale("zh-cn"); //需要汉化
window.moment = moment;
Vue.prototype.$moment = moment; //赋值使用

import axios from "@/service/axios/AxiosInterceptors.js";
Vue.prototype.$axios = axios;

// cizing 封装组件
import zvue from "./components/zvue";
Vue.use(zvue);

// 语言包
if (!Cookies.get("lang")) {
  Cookies.set("lang", "zh");
}
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: Cookies.get("lang"),
  messages: {
    en: LangEN,
    zh: LangZH
  }
});

// lodash
import _ from "lodash";
Vue.prototype._ = _;

//fragment 虚拟节点，不会有div标签
import VueFragment from "vue-fragment";
Vue.use(VueFragment.Plugin);

//默认返回瀑布流首页
if (!Cookies.get("moduleType")) {
  Cookies.set("moduleType", 2);
}

//charts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

//富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);

// xml数据处理插件
import x2js from 'x2js'
Vue.prototype.$x2js = new x2js();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  Vuex,
  store,
  components: { App },
  template: "<App/>"
});
