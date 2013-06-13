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

      done();
    }.bind(this));
  });

  it('creates expected files with all option' , function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      'dist/assets/css/bootstrap.css',
      'dist/assets/css/pygments-manni.css',
      'dist/assets/css/style.css',
      'helper/helpers.js',
      'AUTHORS',
      'CHANGELOG',
      'ROADMAP',
      'LICENSE-MIT',
      'src/content/chapter-01-getting-started.md.hbs',
      'src/content/chapter-02-language-features.md.hbs',
      'src/content/chapter-03-advanced-materials.md.hbs',
      'src/content/code.md',
      'src/content/links.md',
      'src/data/alert.json',
      'src/data/button.json',
      'src/data/icons.json',
      'src/data/module.json',
      'src/data/sitemap.json',
      'src/posts/2013_05_10.hbs',
      'src/posts/2013_05_10.md.hbs',
      'src/posts/2013_05_12.hbs',
      'src/posts/2013_05_12.md.hbs',
      'src/templates/layouts/default.hbs',
      'src/templates/layouts/post.hbs',
      'src/templates/layouts/post.md.hbs',
      'src/templates/pages/blog.hbs',
      'src/templates/pages/docs.hbs',
      'src/templates/pages/examples.hbs',
      'src/templates/pages/helpers.hbs',
      'src/templates/pages/index.hbs',
      'src/templates/pages/markdown.hbs',
      'src/templates/partials/readme/contributing.md.hbs',
      'src/templates/partials/readme/options.md.hbs',
      'src/templates/partials/readme/footer.md.hbs',
      'src/templates/partials/readme/getting-started.md.hbs',
      'src/templates/partials/alert.hbs',
      'src/templates/partials/button.hbs',
      'src/templates/partials/icons.hbs',
      'src/templates/partials/module.hbs',
      'src/templates/partials/nav.hbs',
      'src/templates/readme.md.hbs',
      'src/templates/sitemap.hbs'
    ];

    helpers.mockPrompt(this.app, {
      'includeReadMe': 'Y',
      'includeSitemap': 'Y'
    });

    //this.app.checkInstallation = function () {};

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

});
