import { checkFileExist } from './fs/checkFileExistence.js';
import { readJson } from './fs/readJson.js';

const filePath = './package.json';

export const readPackageJson = () => readJson(filePath);
export const checkPackageJsonExist = () => checkFileExist(filePath);
