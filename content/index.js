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
 * `assemble:content` > add a markdown file
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  console.log(args);
  if (args.length === 0) {
    args[0] = 'content';
  }

  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);


AssembleGenerator.prototype.files = function files() {
  this.mkdir('content');

  if(this.args.length === 2) {
    this.description = this.args[1];
  }

  this.copy('lorem.md', path.join('content', this.name+'.md'));
};