#!/usr/bin/env node
require('shelljs/global');

var program = require('commander'),
    pkg     = require('../package.json'),
    sys     = require('sys'),
    fs      = require('fs'),
    exec    = require('child_process').exec,
    colors  = require('colors'),
    version = pkg.version;

// Files to replate {{PROJECT_NAME}}
var files_replace = [ 'package.json', 'README.md' ];

// CLI

// Flags
program
  .version(version)
  .usage('[actions] [flag]')
  .option('-l, --location <path>', 'assign location for project (defaults to .)')

// Commands
program
  .command('new <project>')
  .description('run the given remote command')
  .action(function(project){
    // Default location
    var location = "./";
    // Override default location if location flag is passed
    if (program.location !== undefined) {
      if (program.location.lastIndexOf('/') === program.location.length - 1) {
        location = program.location;
      } else {
        location = program.location + '/';
      }
    };

    // Copy clone to destination
    cp('-R', 'lib/clone', location);

    // Rename clone to project name
    mv(location + "clone", location + project);

    // Output
    console.log("\n");

    // List the contents of clone
    ls('-A', 'lib/clone').forEach(function(file) {
      console.log("   clone  ".cyan + file);
    });

    // Replace placeholders with project name
    files_replace.forEach(function(file) {
      sed('-i', '{{PROJECT_NAME}}', project, location + project + '/' + file);
    });

    // Final instructions
    console.log("\n   install dependencies:");
    console.log("     $ cd " + location + project + " && npm install && bower install");
    console.log("\n   Start local database:");
    console.log("     $ mongod");
    console.log("\n   Boot server & watch for changes:");
    console.log("     $ gulp");
    console.log("\n");
  });

// Parse arguments
program.parse(process.argv);