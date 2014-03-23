/*
 * generator-assemble <https://github.com/assemble/generator-assemble>
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

/**
 * Module exports Assemble Generator constructor
 * Extend Yeoman base generator
 */

var AssembleGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');
    this.description = this.pkg.description;

    this.option('init', {
      alias: 'i',
      desc: 'Force to prompt question and re-initialize of .yo-rc.json',
      type: String,
      defaults: false,
      required: false
    });

    // this.init = this.options['init'] || this.options['i'] || false;

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'] || this.options['s'],
        skipMessage: this.options['skip-welcome-message'] || this.options['w'],
        callback: function () {
          this.spawnCommand('grunt', ['build']);
        }.bind(this)
      });
    });

    this.defaultPlugins = {
      "assemble-contrib-anchors": false,
      "assemble-contrib-permalinks": true,
      "assemble-contrib-sitemap": true,
      "assemble-contrib-toc": false,
    };

    this.config.defaults({
      projectName   : "",
      projectDesc   : "The best project ever.",
      githubUser    : "assemble",
      installPlugin : true,
      author: {
        name        : this.user.git.username || process.env.user || process.env.username,
        login       : "assemble",
        email       : this.user.git.email
      }
    });

  }, // init

  askFor: function () {
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

    // for first time/re-init, make new list of defaultPlugins
    if(!this.config.get("installPlugin") || force) {
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

      this.projectName = answers.projectName || this.config.get("projectName");
      this.projectDesc = answers.projectDesc || this.config.get("projectDesc");
      this.authorLogin = answers.githubUser || this.config.get("githubUser");
      this.plugins     = answers.plugins || this.config.get("plugins");
      this.authorName  = this.config.get("author").name;
      this.authorEmail = this.config.get("author").email;

      //save config to .yo-rc.json
      this.config.set(answers);

      done();
    }.bind(this));
  }, // askFor

  projectfiles: function () {
    this.template('AUTHORS');
    this.template('CHANGELOG');
    this.template('LICENSE-MIT');
    this.template('Gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('editorconfig', '.editorconfig');
    this.template('README.md');
  },

  gitfiles: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  assets: function () {
    this.directory('bootstrap', 'dist/assets');
  },

  src: function () {
    this.mkdir('data');
    this.mkdir('content');
    this.mkdir('templates/pages');
    this.mkdir('templates/layouts');
    this.mkdir('templates/includes');
    this.copy('site.yml', 'data/site.yml');
    this.copy('markdown.md', 'content/markdown.md');
    this.copy('blog.hbs', 'templates/pages/blog.hbs');
    this.copy('index.hbs', 'templates/pages/index.hbs');
    this.copy('layout.hbs', 'templates/layouts/default.hbs');
    this.copy('navbar.hbs', 'templates/includes/navbar.hbs');
  },

  normalizePackage: function() {
    var pkgFile = path.join(this.destinationRoot(process.cwd()), 'package.json');
    var pkgObj = this.read(pkgFile);
    this.conflicter.force = true;
    this.write('package.json', JSON.stringify(JSON.parse(pkgObj), null, 2));
  },

});

module.exports = AssembleGenerator;
