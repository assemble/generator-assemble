'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var separator = '\n===============================================\n';

var AssembleGenerator = module.exports = function AssembleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.gruntFile = this.readFileAsString(path.join(this.sourceRoot(), 'Gruntfile.js'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  this.option('silent', { type: Boolean, required: false });
};

util.inherits(AssembleGenerator, yeoman.generators.NamedBase);

AssembleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if(!this.options.silent){

    var assembleInfo = 'This task will create one or more files in the\n' +
                        'current directory, based on the environment\n' +
                        'and the answers to a few questions.';
    var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
    '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
    '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
    '\n    /___A___\\   \'__________________________\'' +
    '\n     |  ~  |'.yellow +
    '\n   __'+'\'.___.\''.yellow+'__' +'       '+'Assemble Generators'.yellow.bold+
    '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n' + separator.yellow + '\n'+ assembleInfo +'\n'.red.bold + separator.yellow;
    console.log(welcome);
  }

  var prompts = [{
    name: 'includeReadMe',
    message: 'Would you like to include Assemble README configuration?',
    default: 'Y/n',
    warning: 'Yes: README config and files will be placed into the project directory.'
  }, {
    name: 'includeSitemap',
    message: 'Would you like to include Assemble Sitemap configuration?',
    default: 'Y/n',
    warning: 'Yes: Sitemap config and files will be placed into the project directory.'
  }];

  this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

  this.dotfiles = [
    'editorconfig',
    'gitattributes',
    'gitignore',
    'jshint'
  ];

  this._files = [ '_package.json' ];

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

  this.gruntfiles = [ 'Gruntfile.js' ];

  this.ignores = this.dotfiles.concat(this._files, this.readmefiles, this.sitemapfiles, this.gruntfiles);

  //console.log('src/templates/partials/readme/contributing.md.hbs'.indexOf('/readme/'));

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.includeReadMe = (/y/i).test(props.includeReadMe);
    this.includeSitemap = (/y/i).test(props.includeSitemap);
    cb();
  }.bind(this));
};

AssembleGenerator.prototype.app = function app() {
  var files = this.files;
  files.forEach(function(file) {

      if (!this.includeSitemap && this.readmefiles.indexOf(file) !== -1) {
        return;
      }

      if (!this.includeSitemap && this.sitemapfiles.indexOf(file) !== -1) {
        return;
      }

    this.copy(file, file);

  }, this);
};



