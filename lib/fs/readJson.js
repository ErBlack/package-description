import { readFile } from 'fs/promises';

/**
 * Read and parse JSON file
 * @param {string} filePath
 * @returns
 */
export const readJson = async (filePath) => {
    try {
        const fileContent = await readFile(filePath, 'utf-8');

        try {
            return JSON.parse(fileContent);
        } catch {
            throw new Error(`Can't parse ${filePath}`);
        }
    } catch (/** @type any */ error) {
        throw new Error(`Can't read ${filePath} (${typeof error?.message === 'string' ? error.message : error})`);
    }
};
