module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['lib/*.js'],
                tasks: ['eslint'],
                options: {
                    spawn: false
                }
            }
        },
        eslint: {
            lib: {
                src: ['lib/*.js']
            }
        }
    });

    grunt.event.on('watch', function (action, filepath) {
        // only update the changed files
        grunt.config('jshint.lib.src', filepath);
    });

    grunt.registerTask('eslint', 'eslint:lib');

    require('load-grunt-tasks')(grunt);
};