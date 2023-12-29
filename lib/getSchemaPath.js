import { resolve, relative } from 'path';
import { fileURLToPath } from 'url';

export const getSchemaPath = () => {
    const currentFileName = fileURLToPath(import.meta.url);
    const schemaPath = resolve(currentFileName, '../../schema.json');

    return relative(process.cwd(), schemaPath);
};
