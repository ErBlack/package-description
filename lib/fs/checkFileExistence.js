import { access } from 'fs/promises';

export const checkFileExist = async (filePath) => {
    try {
        await access(filePath);

        return true;
    } catch (error) {
        return false;
    }
};
