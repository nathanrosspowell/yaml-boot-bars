//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var fs = require('fs');
var path = require('path');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-replace');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                compress: {
                    drop_console: true
                }
            },
            ybb: {
                files: {
                    'build/js/main.js': ['src/js/main.js'],
                    'build/js/scripts.js': ['src/js/scripts.js'],
                }
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        copy: {
            ybb: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: [
                        '**/*', // The full source tree, but...
                        '!**/index.handlebars', // ignore this,
                        '!**/js/main.js', // ignore this,
                        '!**/js/scripts.js', // ignore this,
                        '!**/yaml/*', // and ignore this folder.
                    ],
                    dest: 'build/',
                    filter: "isFile"
                }]
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        yaml: {
            ybb: {
                options: {
                    space: 2
                },
                files: [{
                    expand: true,
                    cwd: 'src/yaml/',
                    src: ['**/*.yml'],
                    dest: 'temp/json/'
                }]
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        concat: {
            ybb: {
                options: {
                    process: function(src, filepath) {
                        var filename = filepath.replace(/^.*[\\\/]/, '')
                        var withoutExt = filename.split('.')[0]
                        return '"' + withoutExt + '": ' + src + ",";
                    },
                },
                files: {
                    'temp/concatfile.json': ['temp/json/*.json']
                },
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        replace: {
            ybb: {
                options: {
                    patterns: [{
                        match: /\},$/g, // This is the last comma in the file
                        replacement: "}",
                    }]
                },
                files: {
                    'temp/concatfile.json': 'temp/concatfile.json'
                },
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        file_append: {
            ybb: {
                files: {
                    'temp/built.json': {
                        prepend: "{\n",
                        append: "\n}\n",
                        input: 'temp/concatfile.json'
                    }
                },
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        'compile-handlebars': {
            ybb: {
                template: 'src/index.handlebars',
                templateData: 'temp/built.json',
                output: 'build/index.html'
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        prettify: {
            ybb: {
                options: {
                    json: ['temp/built.json']
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        jsbeautifier: {
            "ybb": {
                src: [
                    "Gruntfile.js",
                    "src/main.js",
                    "src/scripts.js",
                ]
            },
        },
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        'gh-pages': {
            ybb: {
                options: {
                    base: 'build'
                },
                src: ['**']
            }
        }
    });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-yaml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-static-handlebars');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Default task: does everything except deployment
    grunt.registerTask('default', ['make-yaml', 'handlebars', 'uglify', 'copy']);
    grunt.registerTask('make-yaml', ['yaml', 'concat', 'replace', 'file_append']);
    grunt.registerTask('handlebars', ['compile-handlebars', 'prettify']);
    // deploy task: runs everything in order.
    grunt.registerTask('deploy', ['default', 'gh-pages']);
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
