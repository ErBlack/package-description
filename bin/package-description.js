#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
    .description('A tool for describing package.json')
    .command('init', 'Generate a description file for a package.json', { executableFile: 'init' })
    .command('lint', 'Validate a package-description.json file', { executableFile: 'lint' })
    .command('describe', 'Describe a new packages', { executableFile: 'describe' });

program.parse(process.argv);
