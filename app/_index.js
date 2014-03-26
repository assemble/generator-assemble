'use strict';

var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var log = require('verbalize');

/**
 * Module exports Assemble Generator constructor
 * Extend Yeoman base generator
 */

var AssembleGenerator = module.exports = function Assemblegenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AssembleGenerator, yeoman.generators.Base);


AssembleGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
  }

  var questions = [];

  questions.push({
    type    : "confirm",
    name    : "installPlugin",
    message : "Do you want to install Assemble plugins?",
    default : this.config.get("installPlugin")
  });

  // for first time/re-init, make new list of defaultPlugins
  if(!this.config.get("installPlugin")) {
    var plugins = this.config.get("plugins");
    // if we have previous plugin choice
    if (this._.isArray(plugins)) {
      var defaultPlugins = {};
      // convert it to object and assign checked
      plugins.forEach(function(plugin) {
        defaultPlugins[plugin] = true;
      });
      // concat with defautPlugins
      for (var key in defaultPlugins) {
        this.defaultPlugins[key] = defaultPlugins[key];
      }
    }
  }

  var choices = [];
  var pluginObj = this.defaultPlugins;

  // make choice more dynamic and checked from previous choice
  // TODO: fetch from npm with "assembleplugin" keyword
  for (var plugin in pluginObj) {
    if(pluginObj.hasOwnProperty(plugin)){
      choices.push({ name: plugin, checked: pluginObj[plugin] });
    }
  }

  questions.push({
    name    : "plugins",
    type    : "checkbox",
    message : "Which plugins would you like to include?",
    choices : choices,
    when: function( answers ) {
      return answers.installPlugin;
    }
  });

  this.prompt(questions, function (answers) {
    this.plugins     = answers.plugins;
    done();
  }.bind(this));
};


AssembleGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AssembleGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AssembleGenerator.prototype.license = function license() {
  this.template('LICENSE-MIT');
};

AssembleGenerator.prototype.config = function config() {
  this.copy('assemblerc.yml', '.assemblerc.yml');
  this.copy('verbrc.yml', '.verbrc.yml');
};

AssembleGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AssembleGenerator.prototype.github = function githut() {
  this.copy('nojekyll', '.nojekyll');
};

AssembleGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AssembleGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AssembleGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AssembleGenerator.prototype.readme = function readme() {
  this.template('README.md');
  this.copy('_README.tmpl.md', 'docs/README.tmpl.md');
};

AssembleGenerator.prototype.templates = function templates() {
  this.copy('blog.hbs', 'templates/pages/blog.hbs');
  this.copy('index.hbs', 'templates/pages/index.hbs');
  this.copy('layout.hbs', 'templates/layouts/default.hbs');
  this.copy('navbar.hbs', 'templates/includes/navbar.hbs');
};

AssembleGenerator.prototype.app = function app() {
  this.mkdir('_gh_pages');
  this.mkdir('assets');
  this.mkdir('content');
  this.mkdir('data');
  this.mkdir('styles');
  this.mkdir('templates/pages');
  this.mkdir('templates/layouts');
  this.mkdir('templates/includes');

  this.mkdir('assets');
  this.mkdir('assets/images');
  this.mkdir('scripts');
  this.mkdir('styles');
  // this.write('app/index.html', this.indexFile);

  if (this.coffee) {
    this.write(
      'scripts/index.coffee',
      'console.log "foo"'
    );
  }
  else {
    this.write('scripts/index.js', 'console.log("bar");');
  }
};

AssembleGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: done
  });
};