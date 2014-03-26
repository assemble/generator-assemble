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
 * `assemble:content` > add a markdown file
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'content';
  }

  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.files = function files() {
  if(this.args.length === 2) {
    this.description = this.args[1];
  }

  // console.log(this.args);
  this.copy('name.md', path.join('content', this.name+'.md'));
};