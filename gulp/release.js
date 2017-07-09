'use strict';
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
var copy        = require('gulp-copy');
var inject      = require('gulp-inject');
var bowerFiles  = require('main-bower-files');
var cfg         = require('./config');
var fs          = require('fs-extra');
var bump        = require('gulp-bump');
var semver      = require('semver');
var os          = require('os');
var sourcemaps  = require('gulp-sourcemaps');
var pkg         = require('../package.json');
var ver         = require('../release/version.json');
var bwr         = require('../bower.json');

gulp.task('rl_concatJS', function() {
    gulp.src([
        "./app/views/_module.js",
        "./app/views/auth/authService",
        "./app/views/cleaningDetails/cleaningDetailsCtrl.js",
        "./app/views/cleaningList/_module.js",
        "./app/views/cleaningList/cleaning-core/_module.js",
        "./app/views/cleaningList/cleaning-core/list/_module.js",
        "./app/views/cleaningList/cleaning-core//list/list-service.js",
        "./app/views/cleaningList/controllers/cleaningListCtrl.js",
        "./app/views/contact/_module.js",
        "./app/views/contact/contactCtrl.js",
        "./app/views/contact/contactSvc.js",
        "./app/views/dashboard/dashboardCtrl.js",
        "./app/views/home/*.js",
        "!./app/views/home/*_test.js",
        "./app/views/layout/_module.js",
        "./app/views/layout/footer/_module.js",
        "./app/views/layout/footer/footerCtrl",
        "./app/views/list/listCtrl.js",
        "./app/views/list/services/tdService.js",
        "./app/views/login/_module.js",
        "./app/views/login/loginCtrl.js",
        "./app/views/navbar/_module.js",
        "./app/views/navbar/navbarCtrl.js",
        "./app/views/register/registerCtrl.js",
        "./app/views/uploader/upload.js",
        "./app/views/uploader/uploadCtrl.js",
        "./app/views/userDetails/userDetailsCtrl.js",
        "./app/views/userList/_module.js",
        "./app/views/userList/user-core/_module.js",
        "./app/views/userList/user-core/user/_module.js",
        "./app/views/userList/user-core/user/user-service.js",
        "./app/views/userList/services/userSvc.js",
        "./app/views/userList/controllers/userCtrl.js"
    ])
        .pipe(concat('siteJS.js'))
        .pipe(gulp.dest('./temp/js'))
});

gulp.task('rl_uglifyJS', function() {
    gulp.src('./temp/js/siteJS.js')
        .pipe(uglify())
        .pipe(rename('siteJS.min.js'))
        .pipe(gulp.dest('./release/app/js'))
});

gulp.task('rl_concatCSS', function () {
    gulp.src([
        './app/app.css',
        './app/styles/main.css'
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./temp/css'))
});

gulp.task('rl_minifyCSS', function () {
    gulp.src('./temp/css/main.css')
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./release/app/css'))
});

gulp.task('rl_bower', function() {
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(gulp.src(['./app/bower_components/bootstrap/dist/css/bootstrap.css'], {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./release/app'));
});

gulp.task('inject', ['rl_scripts', 'rl_styles'], function () {
    var target = gulp.src('./app/index.html');

    return target.pipe(inject(gulp.src([
        './release/app/css/main.min.css',
        './app/app.js',
        './app/app.run.js',
        './release/app/js/siteJS.min.js',
        './app/bower_components/bootstrap/dist/css/bootstrap.css'
    ], {read: false}), {name: 'site'}))
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./release/app'));
});

gulp.task('rl_inject', ['rl_scripts', 'rl_styles'], function () {
    var target = gulp.src('./app/index.html');

    return target.pipe(inject(gulp.src([
        './release/app/css/main.min.css',
        './app/app.js',
        './app/app.run.js',
        './release/app/js/siteJS.min.js',
        './app/bower_components/bootstrap/dist/css/bootstrap.css'
    ], {read: false}), {name: 'site'}))
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(gulp.dest('./release/app'));
});

var getPackageJson = function () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('bump', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'patch');

    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./'));
});

gulp.task('rl_patch', ['bump'], function (buildTime, version, platform, release, obj) {
    var optionsAll = {
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
    platform = os.platform();
    release = os.release();

    buildTime = new Date().toLocaleString('en-US', optionsAll);
    version = pkg.version;
    var newVersion = semver.inc(version, 'patch');
    obj = {
        buildTime: buildTime,
        version: newVersion,
        platform: platform,
        release: release
    };
    fs.writeFile(cfg.paths.release + '/version.json', JSON.stringify(obj, null, 4));
});

gulp.task('rl_minor', function(buildTime, version, platform, release, obj) {
    var optionsAll = {
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
    platform = os.platform();
    release = os.release();
    buildTime = new Date().toLocaleString('en-US', optionsAll);
    version = ver.version;
    var newVersion = semver.inc(version, 'minor');
    obj = {
        buildTime: buildTime,
        version: newVersion,
        platform: platform,
        release: release
    };
    fs.writeFile(cfg.paths.release + '/version.json', JSON.stringify(obj, null, 4));
});

gulp.task('rl_major', function(buildTime, version, platform, release, obj) {
    var optionsAll = {
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
    platform = os.platform();
    release = os.release();
    buildTime = new Date().toLocaleString('en-US', optionsAll);
    version = ver.version;
    var newVersion = semver.inc(version, 'major');
    obj = {
        buildTime: buildTime,
        version: newVersion,
        platform: platform,
        release: release
    };
    fs.writeFile(cfg.paths.release + '/version.json', JSON.stringify(obj, null, 4));
});

gulp.task('rl_styles', sequence([
    'rl_concatCSS',
    'rl_minifyCSS'
]));

gulp.task('rl_scripts', sequence([
    'rl_concatJS',
    'rl_uglifyJS'
]));

gulp.task('rl_release:patch', sequence([
    'rl_styles',
    'rl_scripts',
    'rl_inject',
    'rl_patch'
]));

gulp.task('rl_release:minor', sequence([
    'rl_styles',
    'rl_scripts',
    'rl_inject',
    'rl_patch'
]));

gulp.task('rl_release:major', sequence([
    'rl_styles',
    'rl_scripts',
    'rl_inject',
    'rl_patch'
]));

