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
 * Add a config file
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'helper';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.files = function files() {
  var template = this.name;

  if (this.name !== 'basic' || this.name !== 'helper') {
    template = 'helper';
  }

  this.template('test/helper.js', path.join('test/helpers', this.name + '_test.js'));
  this.template(template + '.js', path.join('templates/_helpers', this.name + '.js'));
};