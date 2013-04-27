/*global describe, beforeEach, it*/
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


describe('Assemble generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.assemble = helpers.createGenerator('assemble:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });
  
  it('creates expected files with all option [readme, sitemap]' , function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      '.gitattributes',
      'Gruntfile.js',
      'package.json',
      'dist',
      'src',
      'helper/helper.js',
      'config/global.yml',
      'config/site.yml',
      'config/readme.yml',
      'config/sitemap.yml',
      'AUTHORS', 'AUTHORS',
      'CHANGELOG', 'CHANGELOG',
      'ROADMAP', 'ROADMAP',
      'src/templates/readme.md.hbs',
      'src/templates/partials/readme/contributing.md.hbs',
      'src/templates/partials/readme/documentation.md.hbs',
      'src/templates/partials/readme/footer.md.hbs',
      'src/templates/partials/readme/getting-started.md.hbs',
      'src/templates/sitemap.hbs',
      'src/data/sitemap.json'
    ];

    helpers.mockPrompt(this.assemble, {
      'includeReadMe': 'Y',
      'includeSitemap': 'Y'
    });
    this.assemble.options['skip-install'] = true;
    this.assemble.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
  
});
