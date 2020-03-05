#!/usr/bin/env node
import program from 'commander';

program

  .version('0.1.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);
