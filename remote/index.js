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
 * Add remote docs to your project.
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  if (args.length === 0) {
    // args[0] === '.';
    self.log.writeln('Please supply a `user/repo` and `directory`.');
  }

  yeoman.generators.NamedBase.apply(this, arguments);
};
util.inherits(AssembleGenerator, yeoman.generators.NamedBase);



AssembleGenerator.prototype.files = function files() {
  var self = this;
  var cb = this.async();

  if(this.name === 'helpers') {
    this.remote('assemble', 'handlebars-helpers', function (err, remote) {
      if (err) {
        return cb(err);
      }

      self.log.writeln('Adding helper docs.');
      remote.bulkDirectory('docs', 'docs/helpers');
      cb();
    });
  } else if (this.args.length === 2) {
    var repo = this.args[0].split('/');
    var dir = this.args[1];
    console.log(dir);
    this.remote(repo[0], repo[1], function (err, remote) {
      if (err) {
        return cb(err);
      }

      self.log.writeln('Adding helper docs.');
      remote.bulkDirectory(dir, path.join('tmp/', dir));
      cb();
    });
  } else {
    self.log.writeln('Please supply a `user/repo` and `directory`.');
  }
};



