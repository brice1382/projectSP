var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var $           = require('gulp-load-plugins')();
var paths       = require('../gulp.config.json');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sequence    = require('gulp-sequence');
var copy        = require('gulp-copy');

gulp.task('concatCSS', function(){
    gulp.src(['./app/styles/main.css', './app/app.css'])
        .pipe(concat('mainStyle.css'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('cleanCSS', function(){
    return gulp.src('app/dist/mainStyle.css')
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./app/dist/app/css/'))
});

gulp.task('styles', sequence(['concatCSS', 'cleanCSS']));