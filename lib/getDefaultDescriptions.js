import { readJson } from './fs/readJson.js';

/**
 * @param {string} [path]
 * @returns {Promise<Record<string, import('./description.d').Description>>}
 */
export const getDefaultDescriptions = async (path) => {
    if (!path) return {};

    try {
        /**
         * @type {{
         *     defaults: Record<string, import('./description.d').Description>;
         * }}
         */
        const content = await readJson(path);

        process.stdout.write(`Loaded default descriptions from "${path}"\n`);

        return content.defaults;
    } catch (e) {
        return {};
    }
};
