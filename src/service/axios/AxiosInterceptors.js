import axiosOrigin from "axios";
import router from '@/router'
const Message = require("element-ui").Message
let calcelSource = getCancelSource();

let config = {
  timeout: 100000
};
let axios = axiosOrigin.create(config);
axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    let redirectHref = sessionStorage.getItem('logout')
      ? location.origin + '/#/digitalPark/homePage'
      : window.location.href;
    if (sessionStorage.token) {
      config.headers['X-SSO-Token'] = sessionStorage.token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-Requested-InPage'] = redirectHref;

    // 添加全局取消请求
    config.cancelToken = calcelSource.source.token;

    return config;
  },
  function (error) {
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
      switch (res.code) {
        case '102':
          msgInfo({
            message: '参数为空',
            type: 'error'
          });
          break;
        default:
          msgInfo({
            message: message,
            type: 'error'
          });
          break;
      }
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
          if (localStorage.isCZClient == 'true') {
            //如果是客户端
            window.goBackClientLogin()
          } else {
            router.push('/login');
          }
          calcelSource = getCancelSource();
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

function getCancelSource() {
  const CancelToken = axiosOrigin.CancelToken;
  const source = CancelToken.source();
  return {
    source
  }
}

function msgInfo({ message, type }) {
  if (typeof message === 'string' && message.trim().length > 0) {
    Message({
      message: message,
      type: type
    });
  }
}

export default axios;
