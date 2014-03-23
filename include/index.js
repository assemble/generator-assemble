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

/**
 * Add an include template to your Assemble project
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.files = function files() {
  this.copy(this.name+'.hbs', path.join('templates/includes', this.name+'.hbs'));
};