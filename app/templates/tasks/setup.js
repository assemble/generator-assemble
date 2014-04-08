module.exports = function(grunt) {

  /**
   * First run. This task self-deletes after initial setup.
   */

  grunt.registerTask('setup', 'First run. Delete this task after initial setup.', function() {
    grunt.config('copy', {

      // Copy and re-organize Bootstrap's javascript, .less files, fonts, icons and images.
      bootstrap: {
        files: [
          {src: '<%= bootstrap.js %>/bootstrap.js', dest: '<%= site.scripts %>/vendor/bootstrap.js'},
          {src: '<%= bootstrap.docs %>/assets/css/_src/docs.css', dest: '<%= site.styles %>/themes/docs.less'},
          {src: '<%= bootstrap.docs %>/assets/js/_vendor/holder.js', dest: '<%= site.scripts %>/vendor/holder.js'},
          {expand: true, cwd: '<%= bootstrap.docs %>/assets/', src: ['{ico,img}/**'], dest: '<%= site.assets %>/'},
          {expand: true, cwd: '<%= bootstrap.fonts %>', src: ['**'], dest: '<%= site.assets %>/fonts/'},
          {expand: true, cwd: '<%= bootstrap.less %>', src: ['**'], dest: '<%= site.styles %>/bootstrap/'},
          {expand: true, cwd: '<%= bootstrap.less %>/mixins', src: ['**'], dest: '<%= site.styles %>/mixins/'},
          {src: ['<%= bootstrap.less %>/mixins.less'], dest: '<%= site.styles %>/mixins.less'},
          {src: ['<%= bootstrap.less %>/utilities.less'], dest: '<%= site.styles %>/utilities/utilities.less'},
          {src: ['<%= bootstrap.less %>/variables.less'], dest: '<%= site.styles %>/variables.less'},
        ]
      },

      // Strip variables.less and mixins.less from bootstrap.less
      customize_bootstrap: {
        src: '<%= bootstrap.less %>/bootstrap.less',
        dest: '<%= site.styles %>/bootstrap/bootstrap.less',
        options: {
          process: function (content, src) {
            return content.replace(/^[\s\S]+ Reset/gm, '// Reset');
          }
        }
      }
    });

    // Remove duplicates of files that were copied elsewhere.
    grunt.config('clean', {
      bootstrap: [
        '<%= site.styles %>/bootstrap/variables.less',
        '<%= site.styles %>/bootstrap/utilities.less',
        '<%= site.styles %>/bootstrap/mixins.less'
      ],
      tasks: ['tasks']
    });

    grunt.task.run('copy:bootstrap');
    grunt.task.run('copy:customize_bootstrap');
    grunt.task.run('clean:bootstrap');



    /**
     * Task, delete thyself.
     */

    grunt.task.run('clean:tasks');
  });
};