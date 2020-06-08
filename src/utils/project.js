import { ProjectName, Title } from './dictionary';
const { ZG, YDCity, NORMAL, NORBULINGKA } = ProjectName;

export const getProjectName = () => {
  return window.__CZ_SYSTEM;
}

export const getProjectTitle = () => {
  return Title[getProjectName()];
}

export const isZG = () => {
  return getProjectName() === ZG;
}

//伊甸城项目
export const isYD = () => {
  return getProjectName() === YDCity;
}

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
