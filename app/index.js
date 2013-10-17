'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {

  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'] || options['s'],
      skipMessage: options['skip-welcome-message']
    });
  });

  this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.dotFiles = [
    'gitignore',
    'gitattributes',
    'editorconfig',
    'jshintrc'
  ];

  this.pkgFiles = ['_package.json'];

  this.config.defaults({
    projectName : "",
    githubUser  : "assemble",
    plugin      : "permalinks",
    author: {
      name      : this.user.git.username || process.env.user || process.env.username,
      login     : "assemble",
      email     : this.user.git.email
    }
  });

};

util.inherits(AssembleGenerator, yeoman.generators.Base);

AssembleGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  var force = false;
  if (!this.config.existed) {
    force = true;
  }

  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
  }

  var questions = [];

  (!this.config.get("projectName") || force) && questions.push({
    type    : "input",
    name    : "projectName",
    message : "Your project name",
    default : this.appname
  });

  (!this.config.get("githubUser") || force) && questions.push({
    type    : "input",
    name    : "githubUser",
    message : "Would you mind telling me your username on Github",
    default : this.config.get("githubUser")
  });

  (!this.config.get("plugin") || force) && questions.push({
    name    : "plugin",
    type    : "list",
    message : "Which plugin do you want to use?",
    choices : [ "permalinks", "sitemap", "related" ],
    filter  : function(v) { return v.toLowerCase(); }
  });

  this.prompt(questions, function (answers) {

    this.projectName = answers.projectName;
    this.authorLogin = answers.githubUser;
    this.plugins = answers.plugin;
    this.authorName = this.config.get("author").name;
    this.authorEmail = this.config.get("author").email;

    //save config to .yo-rc.json
    this.config.set(answers);
    this.pkg.name = this.config.get("name");

    done();
  }.bind(this));
};

AssembleGenerator.prototype.app = function app() {
  var files = this.files;

  files.forEach(function(file) {
    if(this.dotFiles.indexOf(file) !== -1) {
      this.copy(file, '.' + file);
    } else if(this.pkgFiles.indexOf(file) !== -1) {
      this.template(file, file.substring(1));
    } else {
      this.copy(file, file);
    }

  }, this);
};
