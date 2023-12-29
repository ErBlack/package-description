#!/usr/bin/env node

import { Command } from 'commander';
import { init } from '../lib/tasks/init.js';

const program = new Command();

program
    .description('Generate a description file for a package.json')
    .option('-f, --force [force]', 'Replace existed file', Boolean)
    .option(
        '-d, --default-descriptions [defaultDescriptions]',
        'Path to the file with default descriptions that will be used to fill initial descriptions and suggested in the "describe" command.',
        String,
    )
    .action(({ force, defaultDescriptions }) => {
        return init(force, defaultDescriptions);
    });

await program.parseAsync(process.argv);
