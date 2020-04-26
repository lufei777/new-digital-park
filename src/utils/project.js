import { ProjectName } from './dictionary';
const { ZG } = ProjectName;

export const isZG = () => {
  return window.__CZ_SYSTEM === ZG;
}