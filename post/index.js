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
 * `assemble:post` > add a markdown blog post
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'post';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);


AssembleGenerator.prototype.files = function files() {
  if(this.args.length === 2) {
    this.excerpt = this.args[1];
  }

  var today = new Date();

  var prefix = today.getUTCMonth() + 1;
  prefix += '-' + today.getDate();
  prefix += '-' + today.getFullYear();
  this.date = prefix;

  var filename = this.date + '-' + this._.slugify(this.name) + '.md';
  this.copy('post.md', 'content/posts/' + filename, '# ' + this.name);
};