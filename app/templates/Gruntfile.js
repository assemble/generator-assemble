/*
 * assemble-jekyll
 * https://github.com/hariadi/
 *
 * Copyright (c) 2013 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        assets: 'dist/assets',
        //layout: 'src/templates/layouts/default.hbs',
        partials: 'src/templates/partials/*.hbs',
        flatten: true,
        data: 'src/data/*.{json,yml}'
      },
      pages: {
        files: {
          'dist/': ['src/templates/pages/*.hbs'],
          'dist/_include/': ['src/templates/pages/_includes/*.hbs'],
          'dist/_layouts/': ['src/templates/pages/_layouts/*.hbs']
        }        
      }
    },

    // Before generating any new files, 
    // remove any previously-created files.
    clean: {
      dest: {
        src: [ 'dist/**/*.html' ]
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
