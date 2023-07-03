#!/usr/bin/env node

import { Command } from 'commander';
import { lint } from '../lib/tasks/lint.js';

const program = new Command();

program
    .description('Check package-description.json file')
    .option('--fix', 'Fix problems if it possible')
    .action(({ fix }) => {
        return lint(fix);
    });

await program.parseAsync(process.argv);
