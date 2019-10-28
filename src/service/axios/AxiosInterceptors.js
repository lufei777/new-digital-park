import axiosOrigin from "axios";
// import { Loading } from 'element-ui'
// 服务端不需loading
const Message = require("element-ui").Message
/* const Loading = require("element-ui").Loading;

let loadingInstance = "";
let loadingCount = 0;

let resetLoading = function () {
  loadingInstance && loadingInstance.close();
  loadingInstance = "";
  loadingCount = 0;
}; */

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&^#]*)').exec(window.location.href);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

let ssoToken = getParameterByName('sso_token');//从url中获得token
var href = window.location.href;
history.pushState(null, "", href.replace(/[&]?sso_token=[^&^#]*/g, ""));
if (ssoToken) {
  sessionStorage.token = ssoToken;
}

var config = {};

// config.baseURL ='/api'

var axios = axiosOrigin.create(config);

axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    if (sessionStorage.token) {
      config.headers['X-SSO-Token'] = sessionStorage.token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['X-Requested-InPage'] = window.location.href;
    /* try {
      loadingInstance = Loading.service({});
      loadingCount++;
    } catch (err) {
      resetLoading();
    } */
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // loading处理
    /* try {
      loadingCount--;
      if (loadingCount == 0) loadingInstance.close();
      setTimeout(function () {
        resetLoading();
      }, 5000);
    } catch (err) {
      resetLoading();
    } */

    // Do something with response data
    if (response && process.server && response.config) {
      // 服务端打印日志
      console.log("=====================seperate line=====================");
      console.log("axios from server url:", response.config.url);
    }
    let data = response.data
    // token超时需要重新刷新token, 600测试用  token超时直接退出
    //  console.log('datadata',data,data.successful)
    if (data.successful) {
      if (process.server) {
        // 服务端打印日志
        console.log("response:", JSON.stringify(data));
      }
      if (typeof data == 'undefined') return "";
      return data.data;
    } else if (!data.successful && data.code) {
      // 错误提示
      console.error(data);
      Message({
        message: data.errorMessage,
        type: 'error'
      });
      return;
    } else {
      return data   //兼容旧接口
    }
  },
  function (error) {
    // Do something with response erro
    try {
      let redirect = error.response.headers["X-SSO-Redirect"] || error.response.headers["x-sso-redirect"];
      if (error.response && error.response.status == 401 && redirect) {
        window.location = redirect;
      }
      // resetLoading();
      return Promise.reject(error);
    } catch (err) { }
  }
);

export default axios;
