module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            compatible: {
                COMPATI: 'compatiable'
            },
            dev: {
                BUILD_MODE: 'debug'
            },
            prod: {
                BUILD_MODE: 'release'
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
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
        },
        // dynamically config
        webpack: {}
    });

    grunt.registerTask('webpackWrapped', function (target) {
        grunt.config('webpack.' + target, require('./webpack.pars'));
        grunt.task.run('webpack:' + target);
    });

    grunt.event.on('watch', function (action, filepath) {
        // only update the changed files
        grunt.config('eslint.target.src', filepath);
    });

    grunt.registerTask('eslint', 'eslint:target');
    grunt.registerTask('test', ['eslint:target', 'mochaTest']);

    grunt.registerTask('build-d', ['env:dev', 'eslint:target', 'clean:build', 'webpackWrapped:dist']);
    grunt.registerTask('build', ['env:prod', 'eslint:target', 'clean:build', 'webpackWrapped:dist']);

    grunt.registerTask('compati-build-d', ['env:dev', 'env:compatible', 'eslint:target', 'clean:build', 'webpackWrapped:dist']);
    grunt.registerTask('compati-build', ['env:prod', 'env:compatible', 'eslint:target', 'clean:build', 'webpackWrapped:dist']);

    require('load-grunt-tasks')(grunt);
};