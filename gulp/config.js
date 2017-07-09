var gutil = require('gulp-util');

exports.paths = {
    src: 'app',
    build: 'build',
    release: 'release',
    dist: 'dist'
};

exports.wiredep = {
    exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
    directory: 'bower_components'
};

exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};