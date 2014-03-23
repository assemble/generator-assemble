/*
 * generator-assemble <https://github.com/assemble/generator-assemble>
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

/**
 * Add a config file
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'yaml';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.files = function files() {
  var app = require('../_lib/utils').app;

  /**
   * Assemble runtime config
   */

  if(this.name === 'yaml') {
    this.copy(app('_assemblerc.yml'), '.assemblerc.yml');
  }

  if(this.name === 'json') {
    this.copy('_assemblerc', '.assemblerc');
  }

  if(this.name === 'vf' || this.name === 'assemblefile') {
    this.copy('_assemblefile.js', 'assemblefile.js');
  }

  /**
   * Other config files
   */

  if(this.name === 'jshint') {
    this.copy(app('_jshintrc'), '.jshintrc');
  }

  if(this.name === 'gi' || this.name === 'gitignore') {
    this.copy(app('_gitignore'), '.gitignore');
  }

  if(this.name === 'ga' || this.name === 'gitattributes') {
    this.copy(app('_gitattributes'), '.gitattributes');
  }

  if(this.name === 'pkg' || this.name === 'package') {
    this.copy(app('_package.json'), 'package.json');
  }

  if(this.name === 'travis') {
    this.copy('_travis.yml', '.travis.yml');
  }
};