var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var watch       = require('gulp-watch');
var batch       = require('gulp-batch');
var $           = require('gulp-load-plugins')();
var paths       = require('./gulp.config.json');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sequence    = require('gulp-sequence');
var copy        = require('gulp-copy');
var cfg         = require('./gulp/config');
var sh          = require('shelljs');
var fs          = require('fs-extra');
var bump        = require('gulp-bump');
var semver      = require('semver');
var args        = require('yargs').argv;
var pkg         = require('./package.json');
var version     = require('./version.json');
var filter      = require('gulp-filter');
var bwr         = require('./bower.json');
var zip         = require('gulp-zip');
var wrench      = require('wrench');
var os          = require('os');
var gutil       = require('gulp-util');

gulp.task('copy', function(){
    gulp.src(['app/app.js', 'app/index.html', './version.json'])
        .pipe(copy('./build'))
        .pipe(gulp.dest('./build'))
});

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});



gulp.task('archive', function() {
    gulp.src('./app')
        .pipe(zip('projectSP.zip'))
        .pipe(gulp.dest('./build'))
});

gulp.task('log', function() {
    var someGulpFile = './extras.txt';
    var opt = {
        name: 'todd',
        file: someGulpFile
    };
    gulp.src(someGulpFile)
        .pipe(gutil.log('Gulp is running!'))
        .pipe(gutil.colors.magenta('123'))
        .pipe(gutil.replaceExtension('extras.txt', '.js')) // file.js
        .pipe(gutil.template('test <%= name %> <%= file.path %>', opt))
        .pipe(gulp.dest('./build'))
});

// gulp.task('default', ['watch']);

// gulp.task('build:production', sequence(['bump', 'buildJS']));
//
// gulp.task('build:release', sequence(['bump-minor', 'buildJS']));
//
// gulp.task('build', sequence(['concat', 'concatCSS']));
//
// gulp.task('default', sequence(['concat', 'concatCSS'], 'ugjs', 'cleanCSS'));

module.exports = gulp;