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
var cfg         = require('./config');
var sh          = require('shelljs');
var fs          = require('fs-extra');
var bump        = require('gulp-bump');
var semver      = require('semver');
var args        = require('yargs').argv;
var pkg         = require('../package.json');
var ver         = require('../release/version.json');
var os          = require('os');
var ifaces = os.networkInterfaces();
var sourcemaps  = require('gulp-sourcemaps');
var bwr         = require('../bower.json');

var getVersion = function (buildTime, version) {
    buildTime = new Date().toLocaleString();
    var newVersion = semver.inc(ver.version, 'patch');

    return {
        buildTime: buildTime,
        Version: newVersion
    };
};

gulp.task('nodeShit', function(dookie, release, cpu) {
    dookie = os.platform();
    release = os.release();
    var type = os.type();
    cpu = os.cpus();
    var faces = os.networkInterfaces();
    console.log('Network Interfaces: ' + JSON.stringify(faces, null, 4));
    // console.log('CPU: ' + JSON.stringify(cpu, null, 4));
    console.log('Type: ' + type);
    console.log('Platform: ' + dookie + '\r\n' + 'Release Version: ' + release);
});

gulp.task('nodeShit2', function() {
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
});

gulp.task('version', function (buildTime, version, obj) {
    buildTime = new Date().toLocaleString();
    version = ver.version;
    var newVersion = semver.inc(version, 'patch');

    obj = {buildTime: buildTime, version: newVersion};
    fs.writeJson(cfg.paths.release + '/version.json', obj, getVersion());
});

gulp.task('custom-bump', ['bump'], function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'patch');

    return gulp.src('./version.json')
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./release'))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'minor');

    return gulp.src(['./bower.json', './package.json', './version.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./release'))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'major');

    return gulp.src(['./bower.json', './package.json', './version.json'])
        .pipe(bump({ version: newVer }))
        .pipe(gulp.dest('./release'))
        .pipe(gulp.dest('./'));
});

gulp.task('bump2', function () {
    var pkg = getPackageJson();
    var newVer = semver.inc(pkg.version, 'patch');
    var newTime = new Date().toLocaleString();

    gulp.src('./version.json')
        // .pipe(bump({ buildTime: newTime, version: newVer }))
        .pipe(getVersion({buildTime: newTime, version: newVer}))
        .pipe(rename('versions.json'))
        .pipe(gulp.dest('./app'));
});

gulp.task('bugfix:release', sequence(['bump', 'custom-bump']));

gulp.task('bumpminor:release', sequence(['bump-minor', 'custom-bump']));

gulp.task('bumpmajor:release', sequence(['bump-major', 'custom-bump']));



