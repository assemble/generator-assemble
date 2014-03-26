/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var file    = require('fs-utils');
var helpers = require('yeoman-generator').test;

describe('assemble', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('assemble:app', ['../../app']);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files' , function (done) {
    var expected = [
      '_gh_pages',
      'assets',
          'assets/ico',
          'assets/img',
          'assets/fonts',
      'content',
      'docs',
          'docs/README.tmpl.md',
      'scripts',
          'scripts/index.js',
      'styles',
      'templates',
          'templates/includes/head.hbs',
          'templates/includes/javascripts.hbs',
          'templates/includes/navbar.hbs',
          'templates/layouts/default.hbs',
          'templates/pages/about.hbs',
          'templates/pages/blog.hbs',
          'templates/pages/index.hbs',
      '.assemblerc.yml',
      '.bowerrc',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.nojekyll',
      'bower.json',
      'Gruntfile.js',
      'LICENSE-MIT',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      projectname: 'assemble',
      projectdesc: 'Built with assemble.io',
      username: 'jonschlinkert',
      plugins: ['assemble-contrib-permalinks', 'assemble-contrib-navigation']
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

});


/**
 * Config
 */

describe('assemble:config', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:config', ['../../config']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['.assemblerc.yml'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


/**
 * Content
 */

describe('assemble:content', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:content', ['../../content'], ['foo', 'This is a blog post']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['content/foo.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


/**
 * Post
 */

describe('assemble:post', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:post', ['../../post'], ['post', 'This is a blog post']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = file.expand(['content/posts/*.md']);

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Data
 */

describe('assemble:data', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:data', ['../../data'], ['changelog']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['CHANGELOG'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Layout
 */

describe('assemble:layout', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:layout', ['../../layout']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['templates/layouts/default.hbs'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Page
 */

describe('assemble:page', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:page', ['../../page']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['templates/pages/index.hbs'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Include
 */

describe('assemble:include', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:include', ['../../include']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = file.expand(['templates/includes/*.hbs']);

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('assemble:include', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:include', ['../../include'], ['footer']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = file.expand(['templates/includes/*.hbs']);

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


/**
 * Helper
 */

describe('assemble:helper', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:helper', ['../../helper'], ['comment']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'templates/_helpers/comment.js',
      'test/helpers/comment_test.js'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('assemble:helper basic', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:helper', ['../../helper'], ['basic']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'templates/_helpers/basic.js',
      'test/helpers/basic_test.js'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


/**
 * Mixin
 */

describe('assemble:mixin', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:mixin', ['../../mixin'], ['uppercase']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'data/_mixins/uppercase.js',
      'test/mixins/uppercase_test.js'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


/**
 * Plugin
 */

describe('assemble:plugin', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('assemble:plugin', ['../../plugin'], ['validate']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'templates/_plugins/validate.js',
      'test/plugins/validate_test.js'
    ];

    helpers.mockPrompt(this.app, {
      pluginName: 'validate',
      fullName: 'assemble-plugin-validate',
      pluginDesc: 'The best plugin ever',
      stages: ['render:after:pages']
    });

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});