import Cookies from 'js-cookie';

const TokenKey = 'token';
export const setToken = (token) => {
  return Cookies.set(TokenKey, token)
}
export const getToken = () => {
  return Cookies.get(TokenKey)
}
export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

const UserInfoKey = 'userInfo';
export const setUserInfo = (userInfo) => {
  return localStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(UserInfoKey)) || {};
}
export const removeUserInfo = () => {
  return localStorage.removeItem(UserInfoKey)
}