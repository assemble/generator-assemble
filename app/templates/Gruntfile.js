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

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: 'dist/assets',
          layout: 'src/templates/layouts/default.hbs',
          data: 'src/data/*.{json,yml}',
          partials: 'src/templates/partials/*.hbs'
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs']
        }
      }
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
