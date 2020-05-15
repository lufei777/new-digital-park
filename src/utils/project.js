import { ProjectName, Title } from './dictionary';
const { ZG, YDCity } = ProjectName;

export const getProjectName = () => {
  return window.__CZ_SYSTEM;
}

export const getProjectTitle = () => {
  return Title[getProjectName()];
}

export const isZG = () => {
  return getProjectName() === ZG;
}


export const isYD = () => {
  return getProjectName() === YDCity;
}

export const getLargeScreenName = () => {
  return window.__CZ_LargeScreen;
}

export const isYDScreen = () => {  //伊甸城
  return getLargeScreenName() === YDCity;
}

