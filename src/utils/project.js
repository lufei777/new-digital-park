import { ProjectName, Title } from './dictionary';
const { ZG } = ProjectName;

export const getProjectName = () => {
  return window.__CZ_SYSTEM;
}

export const isZG = () => {
  return getProjectName() === ZG;
}

export const getProjectTitle = () => {
  return Title[getProjectName()];
}