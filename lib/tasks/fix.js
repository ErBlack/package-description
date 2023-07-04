import { readPackageDescriptionJson, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';
import { packageListNames } from '../packageListNames.js';

export const fix = async () => {
    const packageJson = await readPackageJson();
    const packageDescriptionJson = await readPackageDescriptionJson();

    const fixedPackageDescriptionJson = packageListNames.reduce((acc, key) => {
        const dependencies = packageJson[key];
        const descriptions = packageDescriptionJson[key];

        acc[key] = Object.entries(descriptions).reduce((acc, [name, description]) => {
            if (dependencies[name]) {
                acc[name] = description;
            }

            return acc;
        }, {});

        return acc;
    }, {});

    return writePackageDescriptionJson(fixedPackageDescriptionJson);
};
