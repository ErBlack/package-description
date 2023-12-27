import input from '@inquirer/input';

/**
 * Prompt for package replacement
 * @param {string} dependency
 * @param {string} [defaultReplacement]
 * @returns {Promise<string>}
 */
export const promptReplacement = (dependency, defaultReplacement) =>
    input({
        default: defaultReplacement,
        message: `What to use instead of "${dependency}":`,
    });
