import { writeFile } from 'fs/promises';

export const writeJson = (filePath, data) => {
    return writeFile(filePath, JSON.stringify(data, null, 4), 'utf-8');
};
