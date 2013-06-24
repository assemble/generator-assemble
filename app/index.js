'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.gruntFile = this.readFileAsString(path.join(this.sourceRoot(), 'Gruntfile.js'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  this.option('silent', { type: Boolean, required: false });

  this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

  this.dotfiles = [
    'editorconfig',
    'gitignore',
    'jshintrc'
  ];

  this._package = [ '_package.json' ];

  this.readmefiles = [
    'AUTHORS',
    'CHANGELOG',
    'ROADMAP',
    'src/templates/readme.md.hbs',
    'src/templates/partials/readme/contributing.md.hbs',
    'src/templates/partials/readme/options.md.hbs',
    'src/templates/partials/readme/documentation.md.hbs',
    'src/templates/partials/readme/footer.md.hbs',
    'src/templates/partials/readme/getting-started.md.hbs'
  ];

  this.sitemapfiles = [
    'src/data/sitemap.json',
    'src/templates/sitemap.hbs'
  ];

};

util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  if(!this.options.silent){
    console.log(this.yeoman);
  }

  var questions = [{
    type: 'confirm',
    name: 'change',
    message:
      'This Assemble configuration will be include:\n' +
      '\n    - README'.cyan.bold +
      '\n    - Sitemap'.cyan.bold +
      '\n\nDo you want to make any changes to the above?',
    default: false
  }, {
    when: function(answers) { return answers.change; },
    type: 'confirm',
    name: 'includeReadMe',
    message: 'Include README configuration?',
    default: true
  }, {
    when: function(answers) { return answers.change; },
    type: 'confirm',
    name: 'includeSitemap',
    message: 'Include Sitemap configuration?',
    default: true
  }];

  this.prompt(questions, function (answers) {

    this.includeReadMe = answers.includeReadMe;
    this.includeSitemap = answers.includeSitemap;

    done();
  }.bind(this));

};

AssembleGenerator.prototype.app = function app() {
  var files = this.files;

  files.forEach(function(file) {
    if(!this.includeReadMe && this.readmefiles.indexOf(file) !== -1) {
      return;
    }
    if(!this.includeSitemap && this.sitemapfiles.indexOf(file) !== -1) {
      return;
    }
    if(this.dotfiles.indexOf(file) !== -1) {
      this.copy(file, '.' + file);
    } else if(this._package.indexOf(file) !== -1) {
      this.template(file, file.substring(1));
    } else {
      this.copy(file, file);
    }

  }, this);
};
