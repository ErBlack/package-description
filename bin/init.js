#!/usr/bin/env node

import { Command } from 'commander';
import { init } from '../lib/tasks/init.js';

const program = new Command();

program
    .description('Generate a description file for a package.json')
    .option('-f, --force [force]', 'Replace existed file', Boolean)
    .action(({ force }) => {
        return init(force);
    });

program.parse(process.argv);
