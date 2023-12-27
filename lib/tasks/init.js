import { defaultDescription } from '../defaultDescription.js';
import { getDefaultDescriptions } from '../getDefaultDescriptions.js';
import { getSchemaPath } from '../getSchemaPath.js';
import { checkPackageDescriptionJsonExist, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { checkPackageJsonExist, readPackageJson } from '../packageJson.js';
import { packageListNames } from '../packageListNames.js';

/**
 * @param {boolean} force
 * @param {string} [defaultDescriptions]
 */
export const init = async (force, defaultDescriptions) => {
    if (!(await checkPackageJsonExist())) {
        process.stdout.write('There is no package.json in  current directory\n');

        process.exitCode = 1;

        return;
    }

    if ((await checkPackageDescriptionJsonExist()) && !force) {
        process.stdout.write('package-description.json already exists. Use --force to overwrite it.\n');

        process.exitCode = 1;

        return;
    }

    const packageJson = await readPackageJson();
    const defaults = await getDefaultDescriptions(defaultDescriptions);

    const packageDescriptionJson = packageListNames.reduce(
        (acc, key) => {
            acc[key] = Object.keys(packageJson[key] || {}).reduce((descriptions, dependency) => {
                descriptions[dependency] = defaults[dependency] || defaultDescription;

                return descriptions;
            }, {});

            return acc;
        },
        {
            $schema: getSchemaPath(),
        },
    );

    if (Object.keys(defaults).length) {
        packageDescriptionJson['defaultDescriptionsFile'] = defaultDescriptions;
    }

    return writePackageDescriptionJson(packageDescriptionJson);
};
