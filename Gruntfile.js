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
        }
    });

    grunt.event.on('watch', function (action, filepath) {
        // only update the changed files
        grunt.config('jshint.target.src', filepath);
    });

    grunt.registerTask('eslint', 'eslint:lib');

    require('load-grunt-tasks')(grunt);
};