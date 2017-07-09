var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var watch       = require('gulp-watch');
var batch       = require('gulp-batch');
var $           = require('gulp-load-plugins')();
var paths       = require('../gulp.config.json');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sequence    = require('gulp-sequence');
var sourcemaps  = require('gulp-sourcemaps');
var copy        = require('gulp-copy');
var sass        = require('gulp-sass');
var cfg         = require('./config');



gulp.task('build-css', function () {
    return gulp.src('./app/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/index.html', 'bower.json'], ['inject']);
    gulp.watch('./app/styles/main.scss', ['build-css']);
});




