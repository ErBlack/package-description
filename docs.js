import { execSync } from 'child_process';

const COMMAND = /^\s{2}(\w[-\w]*)/;

const DOC = `# package-description

This package allows you to describe your dependencies in a separate file. This file can be used to check the status of dependencies or find out why such dependencies was installed.

## Install

\`\`\`bash
npm install package-description
\`\`\`

## Quick start

This command will create a \`package-description.json\` file in the current directory. All packages will be in unknown status. You can edit this file manually or use \`package-description describe\` command.

\`\`\`bash
npx package-description --init
\`\`\`

## Description entry

Description of a dependency includes the status, text description, and additional fields for specific statuses. Here is a list of the statuses:

\`unknown\` - The package is not described.

\`actual\` - The package is actual and updated. It should have a filled \`description\` field providing information on what this package is used for.

\`outdated\` - The package is outdated. It should have a filled \`description\` field explaining what this package is used for and an \`issueLink\` pointing to the relevant issue that discusses the necessary update.

\`deprecated\` - The package should be removed. It should have a filled \`description\` field explaining why this package is deprecated, an \`issueLink\` pointing to the issue discussing its removal, and optionally a \`replacement\` field suggesting a recommended alternative package.

## Default descriptions

If you have a common set of dependencies, you can describe them in a separate file. Descriptions from this file will be used as default values for \`init\` and \`describe\` commands.

## Usage`;

/**
 * Generate documentation for command
 * @param {String} command
 * @returns {String}
 */
function buildCommandDoc(command) {
    const commandHelp = help(command);

    const subcommands = commands(commandHelp).filter((subcommand) => subcommand !== 'help');

    return `
### package-description ${command}

\`\`\`${commandHelp.replace('Usage: ', 'Usage: package-description ')}\`\`\`
${subcommands.map(buildCommandDoc).join('')}`;
}

/**
 * Get help commands
 * @param {String} command
 * @returns {String}
 */
function help(command) {
    return String(execSync(`node ./bin/package-description.js ${command} --help`));
}

/**
 * Search nested commands
 * @param {String} str
 * @returns {Array}
 */
function commands(str) {
    return str
        .split('Commands:\n')
        .pop()
        .split('\n')
        .reduce(function (result, str) {
            const [, subcommand] = COMMAND.exec(str) || [];

            if (subcommand) {
                result.push(`${subcommand}`);
            }

            return result;
        }, []);
}

process.stdout.write(`${DOC}${buildCommandDoc('')}
`);
process.exit(0);
