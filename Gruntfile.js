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
                '!**/yaml/*', // Ignore
            ],
            dest: 'build/',
            filter: "isFile"
          }
        ]
      }
    },
    yaml: {
      my_targets: {
        options: {
          space: 2
        },
        files: [
            {
              expand: true,
              cwd: 'src/yaml/',
              src: ['**/*.yml'],
              dest: 'temp/json/'
            }
        ]
      }
    },
    concat: {
      my_targets: {
        options: {
          process: function(src, filepath) {
            var filename = filepath.replace(/^.*[\\\/]/, '')
            var withoutExt = filename.split('.')[ 0 ]
            return "'"+ withoutExt + "': " +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
        },
        files: {
          'temp/built.js': [ 'temp/json/*.json' ]
        },
      }
    },
    file_append: {
      my_targets: {
        files: {
          'temp/built.json': {
            prepend: "{\n",
            append: "\n}",
            input: 'temp/built.js'
          }
        },
      }
    },
    'gh-pages': {
        my_targets: {
          options: {
            base: 'build'
          },
          src: ['**']
        }
    }
  });
  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-static-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-yaml');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-gh-pages');
  // Default task: move everything to the 'build' folder.
  grunt.registerTask('default', ['uglify','copy']);
  grunt.registerTask('make-yaml', ['yaml','concat', 'file_append']);
  // deploy task: runs everything in order.
  grunt.registerTask('deploy', ['uglify','copy', 'gh-pages']);
};