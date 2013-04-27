'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var separator = '\n=====================================\n';

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  
  this.gruntFile = this.readFileAsString(path.join(this.sourceRoot(), 'Gruntfile.js'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  
};

util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n' +
  '\n' +
  '\n' + separator.yellow + '\nAssemble\n'.red.bold + separator.yellow +
  '\nThis task will create one or more files in the current directory, ' +
  'based on the environment and the answers to a few questions. ';
  
  var prompts = [{
    name: 'readme',
    message: 'Would you like to include automatic Assemble README configuration?',
    default: 'Y/n',
    warning: 'Yes: README config and files will be placed into the project directory.'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.readme = (/y/i).test(props.readme);
    cb();
  }.bind(this));
};

AssembleGenerator.prototype.app = function app() {
  this.mkdir('dist');
  this.mkdir('src');
  this.mkdir('src/assets');
  this.mkdir('src/content');
  this.mkdir('src/data');
  this.mkdir('src/templates');
  this.mkdir('src/templates/layouts');
  this.mkdir('src/templates/pages');
  this.mkdir('src/templates/partials');
  this.mkdir('src/templates/readme'); 
};

AssembleGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AssembleGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AssembleGenerator.prototype.writeGruntFile = function writeGruntFile() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

AssembleGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AssembleGenerator.prototype.common = function common() {
  this.copy('common/favicon.ico', 'dist/favicon.ico');
  this.copy('common/robots.txt', 'dist/robots.txt');
};

AssembleGenerator.prototype.optionSitemap = function optionSitemap() {
  // TODO: Update Gruntfile - assemble-example-sitemap
  if (this.sitemap) {
    console.info('Updating Gruntfile with sitemap features configuration');
  }
};

AssembleGenerator.prototype.optionReadme = function optionReadme() {
  // TODO: Update Gruntfile - assemble-example-readme
  if (this.readme) {
    //this.write('Gruntfile.js',
    console.info('Updating Gruntfile with README features configuration');
  }
};