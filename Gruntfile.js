module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['lib/*.js', 'test/*.js'],
                tasks: ['eslint'],
                options: {
                    spawn: false
                }
            }
        },
        eslint: {
            target: {
                src: ['lib/*.js', 'test/*.js']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'babel/register'
                },
                src: ['./test/**/*.js']
            }
        }
    });

    grunt.event.on('watch', function (action, filepath) {
        // only update the changed files
        grunt.config('eslint.target.src', filepath);
    });

    grunt.registerTask('eslint', 'eslint:target');
    grunt.registerTask('test', ['eslint:target', 'mochaTest']);

    require('load-grunt-tasks')(grunt);
};