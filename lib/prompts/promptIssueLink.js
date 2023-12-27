import input from '@inquirer/input';

/**
 * Prompt for package issueLink
 * @param {string} dependency
 * @param {'outdated' | 'deprecated'} [status]
 * @returns {Promise<string>}
 */
export const promptIssueLink = (dependency, status) =>
    input({
        message: `Link to the issue where ${status} package will be ${
            status === 'outdated' ? 'updated' : 'removed'
        } "${dependency}":`,
        validate: (input) => {
            if (input.length > 0) {
                return true;
            }

            return 'Issue link should not be empty';
        },
    });
