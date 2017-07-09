'use strict';
var path = require('path');
var gulp = require('gulp');
var es = require('event-stream');
var sq = require('gulp-sequence');
var cfg = require('./config');
var ngFile = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var $ = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

// gulp.task('bower', function () {
//     var booty = gulp.src('./app/index.html');
//
//     return booty.pipe(inject(gulp.src(
//         './app/bower_components/bootstrap/dist/css/bootstrap.css',
//         bowerFiles(),
//         {read: false}), {name: 'site'}))
//         .pipe(gulp.dest('./release/app'));
// });


