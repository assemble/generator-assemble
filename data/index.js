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
 * Add a data file for Assemble
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'changelog';
  }

  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);



AssembleGenerator.prototype.files = function files() {
  if(this.name === 'changelog') {
    this.copy(app('changelog.yml'), 'CHANGELOG');
  }
};