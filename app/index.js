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
  this.mkdir('dist');
  this.mkdir('config');
  this.mkdir('helper');
  this.mkdir('src');
  this.mkdir('src/content');
  this.mkdir('src/data');
  this.mkdir('src/templates');
  this.mkdir('src/templates/layouts');
  this.mkdir('src/templates/pages');
  this.mkdir('src/templates/partials');
  if (this.includeReadMe) {
    this.mkdir('src/templates/partials/readme');
  }
};

AssembleGenerator.prototype.config = function config() {
  this.copy('config/global.yml', 'config/global.yml');
  this.copy('config/site.yml', 'config/site.yml');
  
  if (this.includeReadMe) {
    this.copy('config/readme.yml', 'config/readme.yml');
    this.copy('AUTHORS', 'AUTHORS');
    this.copy('CHANGELOG', 'CHANGELOG');
    this.copy('ROADMAP', 'ROADMAP');
    this.copy('src/templates/readme.md', 'src/templates/readme.md.hbs');
    this.copy('src/templates/partials/readme/contributing.md', 'src/templates/partials/readme/contributing.md.hbs');
    this.copy('src/templates/partials/readme/documentation.md', 'src/templates/partials/readme/documentation.md.hbs');
    this.copy('src/templates/partials/readme/footer.md', 'src/templates/partials/readme/footer.md.hbs');
    this.copy('src/templates/partials/readme/getting-started.md', 'src/templates/partials/readme/getting-started.md.hbs');
  }
  if (this.includeSitemap) {
    this.copy('config/sitemap.yml', 'config/sitemap.yml');
    this.copy('src/data/sitemap.json', 'src/data/sitemap.json');
    this.copy('src/templates/sitemap.hbs', 'src/templates/sitemap.hbs');
  }
};

AssembleGenerator.prototype.basic = function basic() {
  this.copy('src/content/code.md', 'src/content/code.md');
  this.copy('src/content/links.md', 'src/content/links.md');
  this.copy('src/data/alert.json', 'src/data/alert.json');
  this.copy('src/data/button.json', 'src/data/button.json');
  this.copy('src/templates/layouts/default.hbs', 'src/templates/layouts/default.hbs');
  this.copy('src/templates/pages/basic.hbs', 'src/templates/pages/basic.hbs');
  this.copy('src/templates/pages/index.hbs', 'src/templates/pages/index.hbs');
  this.copy('src/templates/pages/markdown.hbs', 'src/templates/pages/markdown.hbs');
  this.copy('src/templates/pages/partials.hbs', 'src/templates/pages/partials.hbs');
  this.copy('src/templates/partials/alert.hbs', 'src/templates/partials/alert.hbs');
  this.copy('src/templates/partials/button.hbs', 'src/templates/partials/button.hbs');
  this.copy('src/templates/partials/nav.hbs', 'src/templates/partials/nav.hbs');
};

AssembleGenerator.prototype.helper = function helper() {
  this.copy('helper/helper.js', 'helper/helper.js');
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