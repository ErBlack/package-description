/**
 * @param {string} listName
 * @param {Record<string, string>} dependencies
 * @param {Record<string, import('./description.d.ts').Description>} descriptions
 * @returns {import('./description.d.ts').Problem[]}
 */
export const checkDependencies = (listName, dependencies = {}, descriptions = {}) => {
    const dependenciesKeys = new Set([...Object.keys(dependencies), ...Object.keys(descriptions)]);

    const problems = [];

    [...dependenciesKeys].forEach((key) => {
        if (!descriptions[key]) {
            problems.push({
                level: 'error',
                path: `/${listName}/${key}`,
                message: 'Missing description for package',
            });
        } else if (!dependencies[key]) {
            problems.push({
                level: 'warn',
                path: `/${listName}/${key}`,
                message: 'Extraneous description for package',
            });
        }
    });

    return problems;
};
