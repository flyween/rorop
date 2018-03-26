#!/usr/bin/env node

var program = require('commander');
var init = require('../scripts/init');
var build = require('../scripts/build');
var check = require('../scripts/check-deps');
// var dev = require('../scripts/dev');

program
  .command('init <name>')
  .action((name) => {
    init(name)
  })

program
  .command('build [format]')
  .action((format) => {
    var opts = {
      format: format || ''
    }
    build(opts)
  })

// program
//   .command('dev')
//   .action(() => {
//     dev()
//   })


program.parse(process.argv)



