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

export const getLargeScreenName = () => {
  return window.__CZ_LargeScreen;
}

export const isYD = () => {  //伊甸城
  return getLargeScreenName() === YDCity;
}

