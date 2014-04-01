/**
 * <%= pkg.name %> v<%= pkg.version %> <<%= pkg.homepage %>>
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  // Force unix-style newlines
  grunt.util.linefeed = '\n';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Report the execution time of each task.
  require('time-grunt')(grunt);


  /**
   * Initialize Grunt configuration
   */

  grunt.initConfig({

    // Project Metadata
    site:   grunt.file.readYAML('.assemblerc.yml'),
    pkg:    grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,

    metadata: {
      year: '<%%= grunt.template.today("yyyy") %>',
      banner: [
        '/*!',
        ' * <%%= site.title %> v<%%= site.version %> <<%%= site.homepage %>>',
        ' * Copyright 2013-<%%= metadata.year %>, <%%= site.author.name %>.',
        ' * Released under the <%%= site.license.type %> license.',
        ' */\n\n'
      ].join('\n')
    },

    // Alias for Bootstrap's javascript
    bootstrap: {
      docs: '<%%= vendor %>/bootstrap/docs',
      fonts: '<%%= vendor %>/bootstrap/fonts',
      js: '<%%= vendor %>/bootstrap/dist/js',
      less: '<%%= vendor %>/bootstrap/less'
    },

    /**
     * HTML tasks
     */

    assemble: {
      options: {
        flatten: true,
        assets: '<%%= site.public %>',

        // Metadata
        pkg: '<%%= pkg %>',
        site: '<%%= site %>',
        data: '<%%= site.data %>/*.{json,yml}',

        // Templates
        partials: ['<%%= site.includes %>/*.hbs'],
        layoutdir: '<%%= site.layouts %>',
        layoutext: '<%%= site.layoutext %>',
        layout: '<%%= site.layout %>',

        // Extensions
        helpers: ['<%%= site.helpers %>/*.js'],
        plugins: '<%%= site.plugins %>'
      },

      // Build site
      site: {
        options: {
          permalinks: {preset: 'pretty'}
        },
        src: ['<%%= site.pages %>/*.hbs'],
        dest: '<%%= site.dest %>/'
      }
    },

    // Prettify HTML
    prettify: {
      options: {
        indent_scripts: 'keep'
      },
      site: {
        files: [
          {expand: true, cwd: '<%%= site.dest %>', src: '{,*/}*.html', dest: '<%%= site.dest %>/', ext: '.html'}
        ]
      }
    },


    /**
     * CSS tasks
     */

    // Compile Less to CSS
    less: {
      options: {
        process: true,
        paths: [
          '<%%= site.styles %>',
          '<%%= site.styles %>/bootstrap',
          '<%%= site.styles %>/utilities'
        ]
      },
      site: {
        options: {
          globalVars: {theme: 'base'}
        },
        src: ['<%%= site.styles %>/index.less'],
        dest: '<%%= assemble.options.assets %>/css/<%%= site.title %>.css'
      },
      blog: {
        options: {
          globalVars: {theme: 'blog'}
        },
        src: ['<%%= site.styles %>/index.less'],
        dest: '<%%= assemble.options.assets %>/css/blog.css'
      }
    },

    // Lint CSS
    csslint: {
      strict: {
        options: {
          csslintrc: '<%%= site.styles %>/.csslintrc'
        },
        src: ['<%%= less.site.dest %>']
      }
    },

    // Remove unused CSS from output.
    uncss: {
      options: {
        ignore: ['#webfonts', '.active']
      },
      site: {
        src: ['<%%= site.dest %>/{,*/}.html'],
        dest: '<%%= less.site.dest %>'
      }
    },


    /**
     * JavaScript tasks
     */

    // Lint JavaScripts
    jshint: {
      options: {
        jshintrc: '<%%= site.scripts %>/.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= site.scripts %>/{,*/}.js'
      ]
    },

    // Minify JavaScripts
    uglify: {
      options: {banner: '<%%= metadata.banner %>'},
      site: {
        src: ['<%%= site.scripts %>/{,*/}*.js'],
        dest: '<%%= site.public %>/js/<%%= site.title %>.min.js'
      }
    },


    /**
     * Design and production
     */

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
          base: ['<%%= site.dest %>']
        }
      }
    },

    watch: {
      assemble: {
        tasks: ['assemble'],
        files: [
          '<%%= site.templates %>/{,*/}*.hbs',
          '<%%= site.content %>/{,*/}*.md',
          '<%%= site.data %>/{,*/}*.{yml,json}',
        ]
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= site.dest %>/{,*/}*.html',
          '<%%= site.assets %>/{,*/}*.css',
          '<%%= site.assets %>/{,*/}*.js',
          '<%%= site.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /**
     * "setup" tasks
     */

    copy: {
      // Copy Bootstrap's js to local `scripts`
      bootstrap: {
        src: '<%%= bootstrap.js %>/bootstrap.js',
        dest: '<%%= site.scripts %>/vendor/bootstrap.js'
      },
      // Copy local `assets` to `public` dir
      assets: {
        files: [
          {expand: true, cwd: '<%%= site.assets %>', src: '**', dest: '<%%= site.public %>/'}
        ]
      }
    },

    // Clean files from previous build
    clean: {
      example: ['<%%= site.dest %>/{,*/}*.{html,css,js}']
    }

  });

  // Setup task only. You can delete after first run.
  grunt.loadTasks('tasks');

  // As of Assemble v0.5, this will be `grunt-assemble`
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean',
    'copy',
    'less',
    'assemble',
    'prettify',
    'uglify'
  ]);
};
