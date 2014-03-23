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
 * Add a markdown, starter-file for a blog post to your Assemble project
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'post';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);


AssembleGenerator.prototype.files = function files() {
  this.copy(this.name+'.md', path.join('content/posts', this.name+'.md'));
};