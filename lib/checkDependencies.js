const error = '\x1b[31merror\x1b[0m';
const warn = '\x1b[33mwarn\x1b[0m';

export const checkDependencies = (dependencies = {}, descriptions = {}) => {
    const dependenciesKeys = new Set([...Object.keys(dependencies), ...Object.keys(descriptions)]);

    const fixedDescriptions = {};
    let missed = false;
    let extraneous = false;

    [...dependenciesKeys].forEach((key) => {
        if (!descriptions[key]) {
            missed = true;
            process.stdout.write(`${error}: Missing description for ${key}\n`);
        }

        if (!dependencies[key]) {
            extraneous = true;
            process.stdout.write(`${warn}: Extraneous description for ${key}\n`);
        } else {
            fixedDescriptions[key] = descriptions[key];
        }
    });

    return {
        fixedDescriptions,
        missed,
        extraneous,
    };
};
