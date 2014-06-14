module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */',
        compress: {
            drop_console: true
        }
      },
      my_targets: {
        files: {
            'build/js/main.js': ['src/js/main.js'],
            'build/js/scripts.js': ['src/js/scripts.js'],
            'build/js/the_data.js': ['src/js/the_data.js'],
        }
      }
    },
    copy: {
      my_targets: {
        files: [
          {
            expand:true,
            cwd: "src/",
            src: [
                '**/*', // The full source tree
                '!**/js/main.js', // Ignore
                '!**/js/scripts.js', // Ignore
                '!**/js/the_data.js', // Ignore
            ],
            dest: 'build/',
            filter: "isFile"
          }
        ]
      }
    },
    'gh-pages': {
        options: {
            base: 'build'
        },
        src: ['**']
    }
  });
  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  // Default task(s).
  grunt.registerTask('default', ['uglify','copy']);
};