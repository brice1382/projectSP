var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var $           = require('gulp-load-plugins')();
var paths       = require('../gulp.config.json');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sequence    = require('gulp-sequence');
var copy        = require('gulp-copy');

gulp.task('concatControllers', function() {
    gulp.src([
        'app/views/cleaningDetails/cleaningDetailsCtrl.js',
        'app/views/cleaningList/controllers/cleaningListCtrl.js'
    ])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('./build/listsJS'))
});

gulp.task('concatServices', function() {
    gulp.src([
        'app/views/cleaningList/services/listService.js',
        'app/views/cleaningList/cleaning-core/list/list-service.js'
    ])
        .pipe(concat('services.js'))
        .pipe(gulp.dest('./build/listsJS'))
});

gulp.task('concatModules', function() {
    gulp.src([
        'app/views/cleaningList/_module.js',
        'app/views/cleaningList/cleaning-core/_module.js',
        'app/views/cleaningList/cleaning-core/list/_module.js'
    ])
        .pipe(concat('_modules.js'))
        .pipe(gulp.dest('./build/listsJS'))
});

gulp.task('concatListsJS', function() {
    gulp.src('build/listsJS/*.js')
        .pipe(concat('lists.js'))
        .pipe(uglify())
        .pipe(rename('lists.min.js'))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('buildJS', sequence([
    'concatModules',
    'concatServices',
    'concatControllers'
], 'concatListsJS'));