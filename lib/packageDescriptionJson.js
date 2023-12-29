import { checkFileExist } from './fs/checkFileExistence.js';
import { readJson } from './fs/readJson.js';
import { writeJson } from './fs/writeJson.js';

const filePath = './package-description.json';

export const readPackageDescriptionJson = () => readJson(filePath);
/**
 * @param {import('./description.d.ts').PackageDescription} data
 * @returns
 */
export const writePackageDescriptionJson = (data) => writeJson(filePath, data);
export const checkPackageDescriptionJsonExist = () => checkFileExist(filePath);
