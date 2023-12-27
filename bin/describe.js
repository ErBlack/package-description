#!/usr/bin/env node

import { Command } from 'commander';
import { describe } from '../lib/tasks/describe.js';

const program = new Command();

program.description('Describe new packages').action(() => {
    return describe();
});

await program.parseAsync(process.argv);
