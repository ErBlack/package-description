import { execSync } from 'child_process';

const COMMAND = /^\s{2}(\w[-\w]*)/;

const DOC = `# package-description

## Install

\`\`\`bash
npm install package-description
\`\`\`

## usage`;

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
