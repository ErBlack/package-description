import input from '@inquirer/input';

/**
 * Prompt for package description
 * @param {string} dependency
 * @param {string} [defaultDescription]
 * @returns {Promise<string>}
 */
export const promptDescription = (dependency, defaultDescription) =>
    input({
        default: defaultDescription,
        message: `Describe purpose of using "${dependency}":`,
        validate: (input) => {
            if (input.length > 0) {
                return true;
            }

            return 'Description should not be empty';
        },
    });
