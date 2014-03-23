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
 * Add a component to your Assemble project
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);



AssembleGenerator.prototype.files = function files() {
  var self = this;

  var copyComponent = function(name) {
    self.copy(path.join(self.name, self.name+'.hbs'), path.join('templates/includes', self.name+'.hbs'));
    self.copy(path.join(self.name, self.name+'.yml'), path.join('data', self.name+'.yml'));
  };

  copyComponent(this.name);
};