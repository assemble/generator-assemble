/*
 * generator-assemble <https://github.com/assemble/generator-assemble>
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var app = require('../_lib/utils').app;

/**
 * Add an include template to your Assemble project
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'button';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.includes = function includes() {
  this.mkdir('templates/includes');
  this.directory(app('templates/includes'), 'templates/includes', true);
};

AssembleGenerator.prototype.files = function files() {
  var template = (this.name === 'button') ? 'button.hbs' : 'include.hbs';
  this.copy(app(path.join('templates/includes', template)), path.join('templates/includes', this.name + '.hbs'));
};