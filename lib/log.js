const error = (msg) => '\x1b[31m' + msg + '\x1b[0m';
const warn = (msg) => '\x1b[33m' + msg + '\x1b[0m';
const gray = (msg) => '\x1b[90m' + msg + '\x1b[0m';

const levels = {
    error,
    warn,
};

/**
 * @param {'error' | 'warn'} level
 * @param {string} path
 * @param {string} message
 */
export const log = (level, path, message) => {
    process.stdout.write(`[package-description] ${levels[level](level)}: ${gray(path)} ${message}\n`);
};
