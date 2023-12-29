#!/usr/bin/env node

import { Command, Option } from 'commander';
import { describe } from '../lib/tasks/describe.js';

const program = new Command();

program
    .description('Step-by-step description of new packages and packages with an unknown status with prompts.')
    .addOption(
        new Option(
            '-t, --type <type>',
            'Which packages to describe. new – not described yet, unknown – with status unknown, all – both of them',
        )
            .choices(['new', 'unknown', 'all'])
            .default('new'),
    )
    .action(({ type }) => {
        return describe(type);
    });

await program.parseAsync(process.argv);
