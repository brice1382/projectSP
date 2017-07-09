var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var $           = require('gulp-load-plugins')();
var paths       = require('../gulp.config.json');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var sequence    = require('gulp-sequence');
var copy        = require('gulp-copy');

gulp.task('concat', function () {
    gulp.src([
        'app/views/_module.js',
        'app/views/home/homeCtrl.js',
        'app/views/contact/contactCtrl.js',
        'app/views/contact/contactSvc.js',
        'app/views/login/_module.js',
        'app/views/login/loginCtrl.js',
        'app/views/login/forgotPassword/forgotPasswordCtrl',
        'app/views/register/registerCtrl.js',
        'app/views/register/services/alert.js',
        'app/views/users/_module.js',
        'app/views/users/controllers/usersCtrl.js',
        'app/views/users/services/usersSvc.js',
        'app/views/uploader/uploadCtrl.js'
    ])
        .pipe(concat('views.js'))
        .pipe(gulp.dest('./app/dist/'))
});

gulp.task('concatLists', function() {
    gulp.src([
        'app/views/cleaningList/_module.js',
        'app/views/cleaningList/cleaning-core/_module.js',
        'app/views/cleaningList/cleaning-core/list/_module.js',
        'app/views/cleaningDetails/cleaningDetailsCtrl.js',
        'app/views/cleaningList/controllers/cleaningListCtrl.js',
        'app/views/cleaningList/services/listService.js',
        'app/views/cleaningList/cleaning-core/list/list-service.js'
    ])
        .pipe(concat('lists.js'))
        .pipe(gulp.dest('./app/dist/'))
});

gulp.task('allJS', function(){
    gulp.src(paths.js)
        .pipe($.concat('all.min.js'))
        .pipe($.bytediff.start())
        .pipe($.uglify({
            mangle: true
        }))
        .pipe($.bytediff.stop())
        .pipe(gulp.dest(paths.build));
    console.log(bytediff());
});

gulp.task('ugjs', function(){
    gulp.src('app/dist/views.js')
        .pipe(uglify())
        .pipe(rename('views.min.js'))
        .pipe(gulp.dest('./app/dist/app/js/'))
});