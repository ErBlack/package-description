import { stat } from 'fs';
import { readPackageDescriptionJson, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';
import { packageListNames } from '../packageListNames.js';
import { promptDescription } from '../prompts/promptDescription.js';
import { promptStatus } from '../prompts/promptStatus.js';
import { promptIssueLink } from '../prompts/promptIssueLink.js';

/**
 *
 * @param {string} dependency
 * @returns {Promise<import('../description.d').Description>}
 */
const getDescription = async (dependency) => {
    try {
        const status = await promptStatus(dependency);

        if (status === 'unknown') {
            return {
                status,
                description: '',
            };
        }

        const description = await promptDescription(dependency);

        if (status === 'actual') {
            return {
                status,
                description,
            };
        }

        const issueLink = await promptIssueLink(dependency, status);

        return {
            status,
            description,
            issueLink,
        };
    } catch (/** @type {any}*/ error) {
        if (error.message === 'User force closed the prompt with 0 null') {
            process.exit();
        } else {
            process.stdout.write(`${error?.message}\n`);
            process.exit(1);
        }
    }
};

export const describe = async () => {
    const packageJson = await readPackageJson();
    const packageDescriptionJson = await readPackageDescriptionJson();

    for (const key of packageListNames) {
        const descriptions = packageDescriptionJson[key];
        const dependencies = packageJson[key];

        if (!dependencies) continue;

        const dependenciesNames = Object.keys(dependencies);

        for (const dependency of dependenciesNames) {
            if (!descriptions[dependency]) {
                const description = await getDescription(dependency);

                descriptions[dependency] = description;

                await writePackageDescriptionJson(packageDescriptionJson);
            }
        }
    }
};
