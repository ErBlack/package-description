import { readPackageDescriptionJson, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';
import { packageListNames } from '../packageListNames.js';

export const fix = async () => {
    const packageJson = await readPackageJson();
    const packageDescriptionJson = await readPackageDescriptionJson();

    const fixedPackageDescriptionJson = packageListNames.reduce(
        /**
         * @param {Partial<import('../description.d').PackageDescription>} acc
         * @param {'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies'} key
         * @returns
         */
        (acc, key) => {
            const dependencies = packageJson[key];
            const descriptions = packageDescriptionJson[key];

            if (!descriptions) return acc;

            acc[key] = Object.entries(descriptions).reduce(
                /**
                 * @param {Record<string, import('../description.d').Description>} acc
                 * @param {[string, import('../description.d').Description]} param1
                 * @returns
                 */
                (acc, [name, description]) => {
                    if (dependencies?.[name]) {
                        acc[name] = description;
                    }

                    return acc;
                },
                {},
            );

            return acc;
        },
        {},
    );

    return writePackageDescriptionJson({
        ...packageDescriptionJson,
        ...fixedPackageDescriptionJson,
    });
};
