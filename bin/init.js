#!/usr/bin/env node

import { Command } from 'commander';
import { init } from '../lib/tasks/init.js';

const program = new Command();

program
    .description('Generate a description file for a package.json')
    .option('-f, --force [force]', 'Replace existed file', Boolean)
    .option('-d, --default-descriptions [defaultDescriptions]', 'Default descriptions file path', String)
    .action(({ force, defaultDescriptions }) => {
        return init(force, defaultDescriptions);
    });

await program.parseAsync(process.argv);
