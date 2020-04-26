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