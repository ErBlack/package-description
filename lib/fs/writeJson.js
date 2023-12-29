import { writeFile } from 'fs/promises';

/**
 * Serialize and write JSON file
 * @param {string} filePath
 * @param {any} data
 * @returns
 */
export const writeJson = (filePath, data) => {
    return writeFile(filePath, JSON.stringify(data, null, 4) + '\n', 'utf-8');
};
