/** @typedef { import('../description.d').Description } Description */

import { checkDependencies } from '../checkDependencies.js';
import { readPackageDescriptionJson, writePackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';

/**
 * @param {boolean} fix
 */
export const lint = async (fix) => {
    const packageJson = await readPackageJson();
    const packageDescriptionJson = await readPackageDescriptionJson();

    let error = false;
    let warn = false;
    const fixed = {};

    ['dependencies', 'devDependencies'].forEach((key) => {
        const { fixedDescriptions, missed, extraneous } = checkDependencies(
            packageJson[key],
            packageDescriptionJson[key],
        );

        fixed[key] = fixedDescriptions;

        if (missed) {
            error = true;
        }

        if (extraneous) {
            warn = true;
        }
    });

    if (warn) {
        if (fix) {
            await writePackageDescriptionJson(fixed);
        }
    }

    if (error) {
        process.exit(1);
    }
};
