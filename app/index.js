'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

/**
 * Module exports Assemble Generator constructor
 * Extend Yeoman base generator
 */

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {

  yeoman.generators.Base.apply(this, arguments);

  this.description = 'Creates a default Assemble boilerplate';

  // Not required but need to show when user command `yo assemble -h`
  this.option('init', {
    alias: 'i',
    desc: 'Force to prompt question and re-initialize of .yo-rc.json',
    type: String,
    defaults: false,
    required: false
  });

  this.init = options['init'] || options['i'] || false;

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'] || options['s'],
      skipMessage: options['skip-welcome-message'] || options['w']
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
    projectName   : "",
    githubUser    : "assemble",
    installPlugin : true,
    author: {
      name        : this.user.git.username || process.env.user || process.env.username,
      login       : "assemble",
      email       : this.user.git.email
    }
  });

};

util.inherits(AssembleGenerator, yeoman.generators.Base);

/**
 * Command prompt questions
 * Extend defaults and options based on user answers
 */

AssembleGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  var force = false;

  if (!this.config.existed || this.init) {
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

  (!this.config.get("projectDesc") || force) && questions.push({
    type    : "input",
    name    : "projectDesc",
    message : "Your project description",
    default : this.config.get("projectDesc")
  });

  (!this.config.get("githubUser") || force) && questions.push({
    type    : "input",
    name    : "githubUser",
    message : "Would you mind telling me your username on Github?",
    default : this.config.get("githubUser")
  });

  (!this.config.get("installPlugin") || force) && questions.push({
    type    : "confirm",
    name    : "installPlugin",
    message : "Do you want to install Assemble plugins?",
    default : this.config.get("installPlugin")
  });

  questions.push({
    name    : "plugin",
    type    : "checkbox",
    message : "Which plugins would you like to include?",
    choices : [
      { name: "assemble-contrib-anchors", checked: true },
      { name: "assemble-contrib-permalinks", checked: true },
      { name: "assemble-contrib-sitemap", checked: true },
      { name: "assemble-contrib-toc", checked: true },
      { name: "assemble-markdown-data" },
      { name: "assemble-related-pages" },
    ],
    when: function( answers ) {
      return answers.installPlugin;
    }
  });

  this.prompt(questions, function (answers) {

    this.projectName = answers.projectName || this.config.get("projectName");
    this.projectDesc = answers.projectDesc || this.config.get("projectDesc");
    this.authorLogin = answers.githubUser || this.config.get("githubUser");
    this.plugin = answers.plugin;
    this.authorName = this.config.get("author").name;
    this.authorEmail = this.config.get("author").email;

    //save config to .yo-rc.json
    this.config.set(answers);

    done();
  }.bind(this));
};

/**
 * TODO: Separate file generated with their own function. See test-creation.js
 * Copy boilerplate main code
 */

AssembleGenerator.prototype.app = function app() {
  var files = this.files;

  files.forEach(function(file) {
    if(this.dotFiles.indexOf(file) !== -1) {
      this.copy(file, '.' + file);
    } else if(this.pkgFiles.indexOf(file) !== -1) {
      this.template(file, file.substring(1));
    } else {
      if (path.basename(file, '.js') === 'Gruntfile') {
        this.template('Gruntfile.js');
      } else {
        this.copy(file, file);
      }
    }

  }, this);
};

/**
 * Stringify an object and normalize whitespace with project preferences.
 */

AssembleGenerator.prototype.normalizeJSON = function() {
  var pkgFile = path.join(this.destinationRoot(process.cwd()), 'package.json');
  var pkgObj = this.read(pkgFile);
  this.conflicter.force = true;
  this.write('package.json', JSON.stringify(JSON.parse(pkgObj), null, 2));
};
