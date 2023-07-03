import { defaultDescription } from '../defaultDescription.js';
import { checkPackageDescriptionJsonExist, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';

const reducer = (acc, dependency) => {
    acc[dependency] = defaultDescription;

    return acc;
};

/**
 * @param {boolean} force
 */
export const init = async (force) => {
    if ((await checkPackageDescriptionJsonExist()) && !force) {
        process.stdout.write('package-description.json already exists. Use --force to overwrite it.\n');

        process.exit(1);
    }

    const { dependencies = {}, devDependencies = {} } = await readPackageJson();

    const packageDescriptionJson = {
        dependencies: Object.keys(dependencies).reduce(reducer, {}),
        devDependencies: Object.keys(devDependencies).reduce(reducer, {}),
    };

    writePackageDescriptionJson(packageDescriptionJson);
};
