import { log } from '../log.js';
import { checkDependencies } from '../checkDependencies.js';
import { readPackageDescriptionJson } from '../packageDescriptionJson.js';
import { readPackageJson } from '../packageJson.js';
import { validate } from '../validateSchema.js';
import { packageListNames } from '../packageListNames.js';
import { fix } from './fix.js';

/**
 * @param {boolean} autoFix
 */
export const lint = async (autoFix) => {
    const packageJson = await readPackageJson();
    const packageDescriptionJson = await readPackageDescriptionJson();

    /**
     * @type {import('../description.d').Problem[]}
     */
    const allProblems = [];

    packageListNames.forEach((key) => {
        allProblems.push(...checkDependencies(key, packageJson[key], packageDescriptionJson[key]));
    });

    allProblems.push(...validate(packageDescriptionJson));

    allProblems.forEach(({ level, path, message }) => {
        if (level === 'error') {
            process.exitCode = 1;
        }

        log(level, path, message);
    });

    if (autoFix) {
        await fix();
    }
};
