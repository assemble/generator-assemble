/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Assemble generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install-message': true,
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
      })
      .withPrompt({
        projectName: 'assemble',
        projectDesc: 'assemble',
        authorLogin: 'assemble',
        plugins: [
          'assemble-contrib-permalinks',
          'assemble-contrib-sitemap']
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'AUTHORS',
      'CHANGELOG',
      'Gruntfile.js',
      'LICENSE-MIT',
      'README.md',
      'package.json',
      '.gitignore',
      '.editorconfig',
      'src/content/markdown.md',
      'src/data/site.yml',
      'src/templates/layouts/default.hbs',
      'src/templates/pages/blog.hbs',
      'src/templates/pages/index.hbs',
      'src/templates/partials/navbar-fixed-top.hbs',
      'src/assets/theme.css'
    ]);
  });
});
