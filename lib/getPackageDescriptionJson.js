import { readFile } from 'fs/promises';

export default async function getPackageJson() {
    try {
        const fileContent = await readFile('./package.json', 'utf-8');

        try {
            return JSON.parse(fileContent);
        } catch {
            throw new Error("Can't parse package.json");
        }
    } catch (/** @type any */ error) {
        throw new Error(`Can't read package.json (${typeof error?.message === 'string' ? error.message : error})`);
    }
}
