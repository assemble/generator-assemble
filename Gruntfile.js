/*
 * generator-assemble
 * http://github.com/hariadi/generator-assemble
 *
 * Copyright (c) 2012 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all_files: [
        'Gruntfile.js',
        'test/*'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    clean: ['test/temp/**']

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-clean');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
