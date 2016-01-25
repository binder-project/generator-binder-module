var _ = require('lodash')
var shell = require('shelljs')

var Module = require('./server.js')

/**
 * The argument-parsing and action components of a CLI command are separated so that the CLI
 * can both be imported from other modules and launched via PM2
 */
function Command (name, cli, action) {
  if (!(this instanceof Command)) {
    return new Command(name, cli, action)
  }
  this.name = name
  this.cli = cli
  this.action = action
}

/**
 * Add an action for this command to the main program
 *
 * @param {Program} program - main commander program
 */
Command.prototype.makeAction = function (program) {
  program.command(this.name)
  this.cli(program)
  program.action(this.action)
  return program
}

var commands = [
  Command('start', function (program) {
    program
      .description('Start the <%= name %> server')
      .option('-p, --port', 'the <%= name %> server port')
    return program
  }, function (options) {
    var module = new Module(options)
    module.start()
  }),
  Command('stop', function (program) {
    program.description('Stop the <%= name %> server')
    return program
  }, function (options) {
    console.log('Stopping the <%= name %> server...')
    shell.exec(['pm2', 'stop', '<%= name %>'])
  })
  // TODO: add any module-specific commands here
]

var makeCLI = function (commands, program) {
  if (!program) {
    program = require('commander')
  }
  program.option('-a, --apiKey', 'Binder API key')
  _.forEach(commands, function (cmd) {
    program.command(cmd.name)
    cmd.cli(program)
    program.action(cmd.action)
  })
}

if (require.main === module) {
  var program = makeCLI(commands)
  program.parse(process.argv)
} else {
  module.exports = {
    commands: commands,
    makeCLI: makeCLI
  }
}
