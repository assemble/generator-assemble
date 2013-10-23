'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PluginGenerator = module.exports = function PluginGenerator(args, options, config) {

  //args.push('assemble:plugin');

  if(Object.keys(args).length === 0){
    args.push('my_plugin');
    args.push('plugins');
  };

  yeoman.generators.NamedBase.apply(this, arguments);
  this.name = this.name || args[0];
  this.path = this.path || args[1];
  if(this.path.indexOf('./') !== -1) {
    this.path = this.path.replace('./', '');
  }

};

util.inherits(PluginGenerator, yeoman.generators.NamedBase);

PluginGenerator.prototype.create = function create() {

  this.pluginName = this.name;
  this.authorLogin = this.config.get("githubUser");
  this.authorName = this.config.get("author").name;
  this.authorEmail = this.config.get("author").email;
  this.pluginPath = this.destinationRoot() + this.path;

  var plugin = this.pluginPath +   '/assemble-'+ this._.dasherize(this.pluginName) +'.js';

  this.template('plugin.js', plugin);
};
