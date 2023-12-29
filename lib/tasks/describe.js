import { readPackageDescriptionJson, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';
import { packageListNames } from '../packageListNames.js';
import { promptDescription } from '../prompts/promptDescription.js';
import { promptStatus } from '../prompts/promptStatus.js';
import { promptIssueLink } from '../prompts/promptIssueLink.js';
import { getDefaultDescriptions } from '../getDefaultDescriptions.js';
import { promptReplacement } from '../prompts/promptReplacement.js';

/**
 *
 * @param {string} dependency
 * @param {{
 *     status?: import('../description.d').Description['status'];
 *     description?: string;
 *     issueLink?: string;
 *     replacement?: string;
 * }} [defaultDescription]
 * @returns {Promise<import('../description.d').Description>}
 */
const getDescription = async (dependency, defaultDescription) => {
    try {
        const status = await promptStatus(dependency, defaultDescription?.status);

        if (status === 'unknown') {
            return {
                status,
                description: '',
            };
        }

        const description = await promptDescription(dependency, defaultDescription?.description);

        if (status === 'actual') {
            return {
                status,
                description,
            };
        }

        const issueLink = await promptIssueLink(dependency, status, defaultDescription?.issueLink);

        if (status === 'outdated') {
            return {
                status,
                description,
                issueLink,
            };
        }

        const replacement = await promptReplacement(dependency, defaultDescription?.replacement);

        return replacement
            ? {
                  status,
                  description,
                  issueLink,
                  replacement,
              }
            : {
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

/**
 * @param {'new'|'unknown'|'all'} type
 */
export const describe = async (type) => {
    const packageDescriptionJson = await readPackageDescriptionJson();
    const defaultDescriptions = await getDefaultDescriptions(packageDescriptionJson.defaultDescriptionsFile);

    if (type === 'new' || type === 'all') {
        const packageJson = await readPackageJson();

        for (const key of packageListNames) {
            const descriptions = packageDescriptionJson[key];
            const dependencies = packageJson[key];

            if (!dependencies) continue;

            const dependenciesNames = Object.keys(dependencies);

            for (const dependency of dependenciesNames) {
                if (!descriptions[dependency]) {
                    const description = await getDescription(dependency, defaultDescriptions[dependency]);

                    descriptions[dependency] = description;

                    await writePackageDescriptionJson(packageDescriptionJson);
                }
            }
        }
    }

    if (type === 'unknown' || type === 'all') {
        for (const key of packageListNames) {
            const descriptions = packageDescriptionJson[key];

            if (!descriptions) continue;

            const dependenciesNames = Object.keys(descriptions);

            for (const dependency of dependenciesNames) {
                if (descriptions[dependency].status === 'unknown') {
                    const description = await getDescription(
                        dependency,
                        defaultDescriptions[dependency] || descriptions[dependency],
                    );

                    descriptions[dependency] = description;

                    await writePackageDescriptionJson(packageDescriptionJson);
                }
            }
        }
    }
};
