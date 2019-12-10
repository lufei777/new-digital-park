import axiosOrigin from "axios";
import router from '@/router'
const Message = require("element-ui").Message

var config = {
  // baseURL:"",
  timeout: 10000
};
var axios = axiosOrigin.create(config);

axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json";

let redirectHref = sessionStorage.getItem('logout') ? location.origin + '/#/digitalPark/homePage' : window.location.href
axios.interceptors.request.use(
  function (config) {
    if (sessionStorage.token) {
      config.headers['X-SSO-Token'] = sessionStorage.token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-Requested-InPage'] = redirectHref;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // 服务端打印日志
    if (response && process.server && response.config) {
      console.log("======seperate line======");
      console.log("axios from server url:", response.config.url);
    }
    // 结果处理
    let res = response.data;
    if (res.successful) {
      // 服务端打印日志
      if (process.server) {
        console.log("response:", res);
      }
      // 如果没有则返回空对象
      if (typeof res == 'undefined') return {};
      return res.data;
    } else if (res.code) {
      // 如果是登陆页面，则不进行message提示
      if (router.currentRoute.path == '/login') return;
      Message({
        message: `${res.message || res.errorMessage}，错误代码:${res.code}`,
        type: 'error'
      });
      console.error(res);
      return Promise.reject(res);
    } else {
      // 兼容旧接口
      return res;
    }
  },
  function (error) {
    // 最起码返回了响应头
    if (error.response) {
      let response = error.response;
      let redirect = error.response.headers["X-SSO-Redirect"] || error.response.headers["x-sso-redirect"];
      // 响应头状态匹配
      switch (response.status) {
        case 401:
          router.push('/login');
          break;
        default: break;
      }
      if (error.response && error.response.status == 401 && redirect) {
        router.push('/login');
      }
    } else {
      if (!window.navigator.onLine) {
        // 断网处理
        Message({
          message: `网络好像出了点问题~`,
          type: 'error'
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
