'use strict'
var _ = require('lodash')
var path = require('path')
var walk = require('walk')
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('generator-binder-module') + ' generator!'
    ))

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is your Binder module\'s name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'What is the description for your Binder module?',
      default: 'A Binder module'
    }, {
      type: 'input',
      name: 'author',
      message: 'What is your name?'
    }, {
      type: 'input',
      name: 'email',
      message: 'What is your email address?'
    }, {
      type: 'input',
      name: 'website',
      message: 'What is your website?'
    }]

    this.prompt(prompts, function (props) {
      this.props = props
      // To access props later use this.props.someOption;

      done()
    }.bind(this))
  },

  writing: function () {
    this.props.className = _.map(this.props.name.split('-'), _.capitalize).join('')
    console.log('this.sourceRoot: ' + this.sourceRoot())
    var self = this
    var files = [
      'package.json',
      'conf/main.json',
      'lib/server.js',
      'lib/cli.js',
      'test/all.js',
      'start.js'
    ]
    _.forEach(files, function (file) {
      self.fs.copyTpl(
        self.templatePath(file),
        self.destinationPath(file),
        self.props
      )
    })
  },

  install: function () {
    this.installDependencies()
  }
})


