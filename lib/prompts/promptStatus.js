import select from '@inquirer/select';

/**
 * Prompt for package status
 * @param {string} dependency
 * @param {import('../description.d').Description['status']} [defaultStatus]
 * @returns {Promise<import('../description.d').Description['status']>}
 */
export const promptStatus = (dependency, defaultStatus) =>
    select({
        default: defaultStatus,
        message: `Status of "${dependency}":`,
        choices: [
            {
                name: 'Actual',
                value: 'actual',
                description: 'Recommended to use',
            },
            {
                name: 'Outdated',
                value: 'outdated',
                description: 'Should be updated to actual version',
            },
            {
                name: 'Deprecated',
                value: 'deprecated',
                description: 'Should be removed',
            },
            {
                name: 'Unknown',
                value: 'unknown',
                description: 'Not described yet',
            },
        ],
    });
