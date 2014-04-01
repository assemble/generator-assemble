'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var changeCase = require('change-case');
var Configstore = require('configstore');
var normalize = require('normalize-pkg');
var log = require('verbalize');
var yeoman = require('yeoman-generator');
var mixins = require('../_lib/mixins');

log.runner = 'generator-assemble';

// Present the user with values used on the previous run.
var assembleConfig = new Configstore('generator-assemble');

assembleConfig.set('author', {name: '', url: ''});
assembleConfig.set('username', '');

var userPkg = {};
userPkg.author = userPkg.author || {};


var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var self = this;

  // Mixins
  this._.mixin(changeCase);
  this._.mixin(mixins);

  this.appname = changeCase.paramCase(this.appname);

  this.readJSON = function() {
    var filepath = path.join.apply(path, arguments);
    return JSON.parse(self.readFileAsString(filepath));
  };

  // Run hooks
  this.hookFor('assemble:config',  {args: args });
  this.hookFor('assemble:content', {args: args });

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'] || this.options['s'],
      skipMessage: this.options['skip-welcome-message'] || this.options['w'],

      // If all was successful, run `grunt setup`
      callback: function () {
        this.spawnCommand('grunt', ['setup']);
        this.log.ok('  Great! You\'re all set!');
      }.bind(this)
    });
  });

  this.pkg = this.readJSON(__dirname, '../package.json');
  this.username = this.user.git.username || process.env.user || process.env.username || null;

  if (fs.existsSync('package.json')) {
    userPkg = normalize.all(this.readJSON('package.json'));
  }
};
util.inherits(AssembleGenerator, yeoman.generators.Base);


AssembleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user, unless skipped
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
  }

  var author = assembleConfig.get('author') || {};

  var name, url, username;
  if ((assembleConfig.get('author').name).length) {
    name = assembleConfig.get('author').name;
  }

  prompts.push({
    name: 'projectname',
    message: 'What is the name of the project?',
    default: userPkg.name ? userPkg.name : this.appname
  });

  prompts.push({
    name: 'projectdesc',
    message: 'Want to add a description?',
    default: userPkg.description || 'The most interesting project in the world > Assemble'
  });

  prompts.push({
    name: 'authorname',
    message: 'What is the author\'s name?',
    default:  name || (userPkg.author.name ? userPkg.author.name : this.username)
  });

  prompts.push({
    name: 'authorurl',
    message: 'What is the author\'s URL?',
    default: assembleConfig.get('author').url || (userPkg.author.url ? userPkg.author.url : ('https://github.com/' + this.username))
  });

  prompts.push({
    name: 'username',
    message: 'If pushed to GitHub, what username/org will the repo use?',
    default: assembleConfig.get('username') || this.username
  });

  this.prompt(prompts, function (props) {

    assembleConfig.set('username', props.username);
    assembleConfig.set('author', {
      name: props.authorname,
      url: props.authorurl
    });

    this.authorname = assembleConfig.get('author').name;
    this.authorurl = assembleConfig.get('author').url;
    this.username = assembleConfig.get('username');

    this.projectname = props.projectname;
    this.projectdesc = props.projectdesc;

    cb();
  }.bind(this));
};

AssembleGenerator.prototype.app = function app() {

  this.mkdir('assets');
  this.mkdir('assets/ico');
  this.mkdir('assets/fonts');
  this.mkdir('assets/img');
  this.mkdir('content');
  this.mkdir('data');
  this.mkdir('scripts');
  this.mkdir('styles');
  this.mkdir('templates/pages');
  this.mkdir('templates/layouts');

  if (this.coffee) {
    this.write(
      'scripts/index.coffee',
      '# Application scripts'
    );
  }
  else {
    this.write('scripts/index.js', '// Application scripts');
  }
};

AssembleGenerator.prototype.data = function data() {
  this.directory('data', 'data', true);
};

AssembleGenerator.prototype.styles = function styles() {
  this.directory('styles', 'styles', true);
};

AssembleGenerator.prototype.templates = function templates() {
  this.directory('templates', 'templates');
};

AssembleGenerator.prototype.config = function config() {
  this.copy('assemblerc.yml', '.assemblerc.yml');
};

AssembleGenerator.prototype.bower = function bower() {
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AssembleGenerator.prototype.git = function git() {
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
};

AssembleGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AssembleGenerator.prototype.github = function githut() {
  this.copy('nojekyll', '.nojekyll');
};

AssembleGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AssembleGenerator.prototype.license = function license() {
  this.template('LICENSE-MIT');
};

AssembleGenerator.prototype.pkg = function pkg() {
  this.template('_package.json', 'package.json');
};

AssembleGenerator.prototype.docs = function docs() {
  this.copy('docs/options.md', 'docs/options.md');
  this.copy('docs/usage.md', 'docs/usage.md');
  this.copy('docs/README.tmpl.md', 'docs/README.tmpl.md');
};

AssembleGenerator.prototype.tasks = function tasks() {
  this.directory('tasks', 'tasks');
};


AssembleGenerator.prototype.bootstrap = function bootstrap() {
  var done = this.async();

  this.log.write('\n   Cloning bootstrap. This will take a few seconds...');
  exec('git clone https://github.com/twbs/bootstrap.git "vendor/bootstrap"', function (err) {
    if (err) {
      this.log.error(err);
    }
    done();
  }.bind(this));
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