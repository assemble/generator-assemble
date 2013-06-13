/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> <%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
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
      options: {
        assets: 'dist/assets',
        data: 'src/data/*.{json,yml}',
        partials: [
          'src/templates/partials/{,*/}*.hbs',
          'src/content/*.hbs'
        ],
        registerFunctions: function(engine) {
          var helpers = require('./helper/helpers');
          engine.engine.registerFunctions(helpers);
        }
      },

      site: {
        options: {
          flatten: true,
          layout: 'src/templates/layouts/default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: 'src/templates/pages',
            src: ['*.hbs', '!index.hbs'],
            dest: 'dist/'
          },
          {
            expand: true,
            cwd: 'src/templates/pages',
            src: ['index.hbs'],
            dest: './' }
        ]
      }<% if (includeReadMe) { %>,

      readme: {
         options: {
          flatten: true,
          partials: 'src/templates/partials/readme/{,*/}*.hbs',
          data: './package.json',
          ext: ''
        },
        src:  'src/templates/readme.md.hbs',
        dest: 'dist/'
      }<% } %><% if (includeSitemap) { %>,

      sitemap: {
        options: {
          component: {
            name: 'generator-assemble',
            description: 'Yeoman generator for Assemble'
          },
          ext: '.xml',
          data: 'src/sitemap.json',
          flatten: true
        },
        files: {
          'dist/sitemap.xml': ['src/templates/sitemap.hbs']
        }
      }<% } %>
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['dist/**/*.{html,xml}']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
