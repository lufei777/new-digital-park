import Cookies from "js-cookie";
import { ProjectName, Title } from './dictionary';
const { ZG, YDCity, NORMAL, NORBULINGKA } = ProjectName;

/**
 * 项目验证
 */

// 从window获取项目名称
export const getProjectName = () => {
  return window.__CZ_SYSTEM;
}

// 获取项目标题
export const getProjectTitle = () => {
  return Title[getProjectName()];
}

// 中钢
export const isZG = () => {
  return getProjectName() === ZG;
}

//伊甸城项目
export const isYD = () => {
  return getProjectName() === YDCity;
}

//大屏项目名称
export const getLargeScreenName = () => {
  return window.__CZ_LargeScreen;
}

//伊甸城大屏
export const isYDScreen = () => {
  return getLargeScreenName() === YDCity;
}

//通用大屏
export const isNormalScreen = () => {
  return getLargeScreenName() === NORMAL;
}

//罗布林卡大屏
export const isNorbulingkaScreen = () => {
  return getLargeScreenName() === NORBULINGKA;
}

// 菜单项
const MenuTreeKey = 'menuTree';
export const setMenuTree = (menuTree) => {
  return localStorage.setItem(MenuTreeKey, JSON.stringify(menuTree));
}
export const getMenuTree = () => {
  return JSON.parse(localStorage.getItem(MenuTreeKey));
}
export const removeMenuTree = () => {
  return localStorage.removeItem(MenuTreeKey);
}