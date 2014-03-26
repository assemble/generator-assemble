/**
 * generator-assemble <https://github.com/assemble/generator-assemble>
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var processTemplate = function(tmpl) {
  return function(answers) {
    return this._.template(tmpl, answers);
  };
};


/**
 * Add a config file
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'plugin';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);


AssembleGenerator.prototype.askFor = function askFor() {
  var self = this;
  var cb = this.async();
  var prompts = [];


  prompts.push({
    name: 'pluginName',
    message: 'What do you want to call your plugin?',
    default: 'assemble-plugin-myplugin'
  });

  prompts.push({
    name: 'pluginDesc',
    message: 'How would you describe your plugin?',
    default: 'Assemble plugin.'
  });

  prompts.push({
    type: 'checkbox',
    name: 'stages',
    message: 'What stages will your plugin run in? (the default is fine if you aren\'t sure)',
    default: 'assemble:before:page',
    choices: [
      'options:before:configuration',
      'options:after:configuration',
      'assemble:before:layout',
      'assemble:after:layout',
      'assemble:before:partials',
      'assemble:after:partials',
      'assemble:before:data',
      'assemble:after:data',
      'assemble:before:pages',
      'assemble:before:page',
      'assemble:after:page',
      'assemble:after:pages',
      'render:before:pages',
      'render:before:page',
      'render:after:page',
      'render:after:pages'
    ]
  });

  this.prompt(prompts, function (props) {

    this.pluginName = props.pluginName;
    this.pluginDesc = props.pluginDesc;
    this.fullName = 'assemble-plugin-' + props.pluginName;
    this.stages = props.stages;

    cb();
  }.bind(this));
};


AssembleGenerator.prototype.files = function files() {
  var template = this.name;

  if (this.name !== 'basic' || this.name !== 'plugin') {
    template = 'plugin';
  }

  this.template('test/plugin.js', path.join('test/plugins', this.name + '_test.js'));
  this.template(template + '.js', path.join('templates/_plugins', this.name + '.js'));
};