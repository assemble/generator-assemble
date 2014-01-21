/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('Assemble generator', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('assemble:app', [
        '../../app'
      ]);

      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('creates expected files with all option' , function (done) {
    var expected = [
      // add files you expect to exist here.
      'AUTHORS',
      'CHANGELOG',
      'Gruntfile.js',
      'LICENSE-MIT',
      'README.md',
      'package.json',
      'dist/assets/css/assemble.css',
      '.gitignore',
      '.editorconfig',
      'src/content/markdown.md',
      'src/data/site.yml',
      'src/templates/layouts/default.hbs',
      'src/templates/pages/blog.hbs',
      'src/templates/pages/index.hbs',
      'src/templates/partials/navbar-fixed-top.hbs'
    ];

    helpers.mockPrompt(this.app, {
      projectName: 'assemble',
      githubUser: 'assemble',
      plugins: ['permalinks', 'sitemap']
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

});
