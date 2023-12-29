import { access } from 'fs/promises';

/**
 * Check if file exists
 * @param {string} filePath
 * @returns
 */
export const checkFileExist = async (filePath) => {
    try {
        await access(filePath);

        return true;
    } catch (error) {
        return false;
    }
};
