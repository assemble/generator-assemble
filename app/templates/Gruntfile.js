/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%%= site.templates %%>/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%%= site.templates %%>/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project siteuration.
  grunt.initConfig({

    site: grunt.file.readYAML('.assemblerc.yml'),

    watch: {
      assemble: {
        tasks: ['assemble'],
        files: [
          '<%%= site.templates %%>/{,*/}*.hbs',
          '<%%= site.content %%>/{,*/}*.md',
          '<%%= site.data %%>/{,*/}*.{yml,json}',
        ]
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %%>'
        },
        files: [
          '<%%= site.dest %%>/{,*/}*.html',
          '<%%= site.assets %%>/{,*/}*.css',
          '<%%= site.assets %%>/{,*/}*.js',
          '<%%= site.assets %%>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: ['<%%= site.dest %%>']
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        assets: '<%%= site.dest %%>/assets',

        // Metadata
        site: '<%%= site %%>',
        data: '<%%= site.data %%>/*.{json,yml}',

        // Templates
        partials: ['<%%= site.includes %%>/*.hbs']<% if(plugins && plugins.length > 0){ %>,
        layoutdir: '<%%= site.layouts %%>',
        layoutext: '<%%= site.layoutext %%>',
        layout: '<%%= site.layout %%>',

        // Extensions
        plugins: [<% if(typeof plugins === 'object'){ _.each(plugins, function(name, i) { %>'<%= name %>'<% if(i < (plugins.length - 1)) { %>,<% } }); } else { %>'<%= name %>'<%} %>],<%}
        _.each(plugins, function(name, i) { if(name == 'permalinks') { %>
        permalinks: {
          preset: 'pretty'
        },<% }
        if(name == 'assemble-contrib-contextual') { %>
        contextual: {
          dest: 'tmp/'
        },<% }
        }); %>
      },

      // Build site
      site: {
        files: {
          '<%%= site.dest %%>/': ['<%%= site.pages %%>/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%%= site.dest %%>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
