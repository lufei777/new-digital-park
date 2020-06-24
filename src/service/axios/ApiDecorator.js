import axios from './AxiosInterceptors'
import DoApi from './DoApi'

// api装饰器
function send(target, name, descriptor, callback) {
  descriptor.value = (...args) => {
    return callback(...args);
  };
  return descriptor;
}

// 添加 路径
function url(url) {
  return function (target, name, descriptor) {
    descriptor.url = url;
  }
}

function get(target, name, descriptor) {
  return send(target, name, descriptor, function (args, urlArgs = {}) {
    let url = descriptor.url;

    urlArgs = Object.values(urlArgs);
    if (urlArgs.length) {
      url += '/' + urlArgs.join('/');
    }
    
    return axios.get(url + '?' + DoApi.jsonUrlFormat(args));
  });
}

function post(target, name, descriptor) {
  return send(target, name, descriptor, function (args, urlArgs = {}) {
    return axios.post(descriptor.url + '?' + DoApi.jsonUrlFormat(urlArgs), DoApi.doJson(args));
  });
}

function del(target, name, descriptor) {
  return send(target, name, descriptor, function (args) {
    return axios.delete(descriptor.url + '?' + DoApi.jsonUrlFormat(args));
  });
}

function put(target, name, descriptor) {
  return send(target, name, descriptor, function (args) {
    return axios.put(descriptor.url + '?' + DoApi.jsonUrlFormat({}), DoApi.doJson(args));
  });
}

export {
  get,
  url,
  post,
  del,
  put
}
