var gulp       = require('gulp');
var karma      = require('karma').server;
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var inject     = require('gulp-inject-string');
var cpy        = require('gulp-copy');
var miss       = require('mississippi');
var imageop = require('gulp-image-optimization');

gulp.task('build', function() {
    gulp.src('src/spManager/**/*.js')
        .pipe(concat('sp-manager.js'))
        .pipe(inject.wrap("(function() {\n\t'use strict';\n\n", "\n}());"))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('sp-manager.min.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('note-builder', function() {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: 'America/New_York'
    };
    var date = ('\r\n' + 'Note Created On: ' + new Date().toLocaleString('en-US', options));
    gulp.src('notes.txt')
        .pipe(cpy('src-notes'))
        .pipe(gulp.dest('./dist'))
        .pipe(inject.wrap('', date))
        .pipe(inject.wrap("/** ", " */"))
        .pipe(rename('notes.js'))
        .pipe(gulp.dest('./dist/src-notes'))
        .pipe(uglify())
        .pipe(rename('sp-manager.min.js'))
        .pipe(gulp.dest('./dist/src-notes'))
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default', ['test', 'build']);

gulp.task('appendNote', function () {
    gulp.src(['./dist/src-notes/notes.js', './dist/sp-manager.js'])
        .pipe(concat('sp-manager.js'))
        .pipe(gulp.dest('./dist/src-notes/'))
});

gulp.task('some-stuff', ['note-builder', 'appendNote']);

