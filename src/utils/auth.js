// token
const TokenKey = 'token';
export const setToken = (token) => {
  return localStorage.setItem(TokenKey, token)
}
export const getToken = () => {
  return localStorage.getItem(TokenKey)
}
export const removeToken = () => {
  localStorage.removeItem(TokenKey);
  removeIsCZClient();
  return;
}

// 用户信息
const UserInfoKey = 'userInfo';
export const setUserInfo = (userInfo) => {
  return localStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}
export const getUserInfo = () => {
  let tmp = localStorage.getItem(UserInfoKey);
  return JSON.parse(tmp === 'undefined' ? '{}' : tmp) || {};
}
export const removeUserInfo = () => {
  return localStorage.removeItem(UserInfoKey)
}

// 是否是客户端判断
const IsCZClientKey = 'isCZClient';
export const setIsCZClient = (boolean) => {
  return localStorage.setItem(IsCZClientKey, boolean)
}
export const getIsCZClient = () => {
  return localStorage.getItem(IsCZClientKey);
}
export const IsCZClient = () => {
  return JSON.parse(getIsCZClient()) === true;
}
export const removeIsCZClient = () => {
  return localStorage.removeItem(IsCZClientKey)
}
