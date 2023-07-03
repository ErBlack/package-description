#!/usr/bin/env node

import { Command } from 'commander';
import { lint } from '../lib/tasks/lint.js';

const program = new Command();

program
    .description('Check package-description.json file')
    .option('--fix [fix]', 'Fix problems if it possible', Boolean)
    .action(({ fix }) => {
        return lint(fix);
    });

program.parse(process.argv);
