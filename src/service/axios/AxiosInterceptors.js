import axiosOrigin from "axios";
import router from '@/router'
import store from '@/vuex/store';
import { getToken, IsCZClient } from '@/utils/auth';

let calcelSource = getCancelSource();
const Message = require("element-ui").Message

let config = {
  timeout: 100000
};
let axios = axiosOrigin.create(config);
axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config) => {
    let redirectHref = window.location.href;
    if (store.getters.token) {
      config.headers['X-SSO-Token'] = getToken();
      redirectHref = location.origin + '/#/digitalPark/homePage';
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-Requested-InPage'] = redirectHref;

    // 添加全局取消请求
    config.cancelToken = calcelSource.source.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // code => 0：操作成功  101：报错  102：参数为空
    let res = response.data;
    let message = res.message || res.errorMessage;

    if (res.successful && res.code === '0') {
      // msgInfo({
      //   message: message,
      //   type: 'success'
      // });
      // 如果没有则返回空对象
      return (res || {}).data;
    } else if (res.code) {
      // 如果是登陆页面，则不进行message提示
      if (router.currentRoute.path == '/login') return;
      msgInfo({
        message: message,
        type: 'error'
      });
      console.error(`${message}，错误代码:${res.code}`);
      return Promise.reject(res);
    } else {
      // 兼容旧接口
      return res;
    }
  },
  (error) => {
    // 最起码返回了响应头
    if (error.response) {
      let response = error.response;
      // let redirect = error.response.headers["X-SSO-Redirect"] || error.response.headers["x-sso-redirect"];
      // 响应头状态匹配 401: token失效
      switch (response.status) {
        case 401:
          calcelSource.source.cancel();  // 取消所有请求
          store.dispatch('user/resetToken').then(() => {
            if (IsCZClient()) {
              //如果是客户端
              window.goBackClientLogin();
            } else {
              router.push('/login');
            }
            calcelSource = getCancelSource();
          })
          break;
        default:
          break;
      }
    } else {
      if (!window.navigator.onLine) {
        // 断网处理
        msgInfo({
          message: `网络好像出了点问题~`,
          type: 'error'
        });
      }
    }
    if (axiosOrigin.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
      return new Promise(() => { });
    } else {
      return Promise.reject(error);
    }
  }
);

// 获取请求取消 calcelToken，在每次取消请求后，重新获取
function getCancelSource() {
  const CancelToken = axiosOrigin.CancelToken;
  const source = CancelToken.source();
  return {
    source
  }
}

// 统一提示
function msgInfo({ message, type }) {
  if (typeof message === 'string' && message.trim().length > 0) {
    Message({
      message: message,
      type: type
    });
  }
}

// 页面跳转，取消所有正在进行的请求
setTimeout(() => {
  router.beforeEach((to, from, next) => {
    if (calcelSource.source.cancel) {
      calcelSource.source.cancel();  // 取消所有请求
      calcelSource = getCancelSource();
    }

    next();
  })
}, 0);

export default axios;
