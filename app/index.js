'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] || options['s'] });
  });

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'] || options['s'],
      skipMessage: options['skip-install-message']
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

};

util.inherits(AssembleGenerator, yeoman.generators.Base);

AssembleGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
  }

  var questions = [{
    type: 'input',
    name: 'projectName',
    message: 'Project name?',
    default: this.appname
  },{
    type: 'input',
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'assemble'
  }];

  this.prompt(questions, function (answers) {

    this.projectName = answers.projectName;
    this.authorLogin = answers.githubUser;
    this.authorName = this.user.git.username || process.env.user || process.env.username;
    this.authorEmail = this.user.git.email;

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
