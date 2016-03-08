var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

// start node.js
gulp.task('server', function() {

    var nodemonTask = nodemon({
        script: './app.js',
        ext: 'js json html',
        ignore: [
            'gulpfile.js',
            './node_modules/**/*.json',
            './node_modules',
            './node_modules/**/*.js'
        ],
        env: {
            'NODE_ENV': 'dev'
        }
    });

    return (nodemonTask);
});

// default task
gulp.task('default', ['server'], function() {});
