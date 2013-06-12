/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> <%= pkg.version %>
 * https://github.com/hariadi/generator-assemble
 *
 * Copyright (c) 2013 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'src/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// 'src/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      // Global configuration
      options: grunt.file.readYAML('config/global.yml'),

      site: {
        options: grunt.file.readYAML('config/site.yml'),
        src:  'src/templates/pages/{,*/}*.hbs',
        dest: 'dist/'
      }<% if (includeReadMe) { %>,

      readme: {
        options: grunt.file.readYAML('config/readme.yml'),
        src:  'src/templates/readme.md.hbs',
        dest: 'dist/'
      }<% } %><% if (includeSitemap) { %>,

      sitemap: {
        options: grunt.file.readYAML('config/sitemap.yml'),
        files: {
          'dist/sitemap.xml': ['src/templates/sitemap.hbs']
        }
      }<% } %>,

      helpers: {
        options: {
          flatten: true,
          registerFunctions: function(engine) {
            var helpers = require('./helper/custom-helpers');
            engine.engine.registerFunctions(helpers);
          }
        },
        files: [
          { expand: true, cwd: 'src/templates/custom-helpers', src: ['helpers.hbs'], dest: 'dist/' }
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      dest: {
        pages: ['dist/{,*/}*.html']
      }
    }

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
