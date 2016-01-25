var _ = require('lodash')
var pm2 = require('pm2')
var program = require('commander')
var cli = require('./lib/cli.js')

var startWithPM2 = function (app) {
  pm2.connect(function (err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start(app, function (err, apps) {
      if (err) {
        console.error(err)
      }
      pm2.disconnect()
    })
  })
}

program
  .version('0.0.1')

var commands = cli.commands
// Replace all actions with PM2 subprocess creation
var pm2Commands = _.map(commands, function (cmd) {
  cmd.action = function (options) {
    startWithPM2({
      script: './lib/cli.js',
      args: process.argv
    })
  }
})
cli.makeCLI(pm2Commands, program)
program.parse(process.argv)


