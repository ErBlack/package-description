import { checkFileExist } from './fs/checkFileExistance.js';
import { readJson } from './fs/readJson.js';
import { writeJson } from './fs/writeJson.js';

const filePath = './package.json';

export const readPackageJson = () => readJson(filePath);
export const writePackageJson = (data) => writeJson(filePath, data);
export const checkPackageJsonExist = () => checkFileExist(filePath);
