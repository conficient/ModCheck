// gulp modules
var gulp = require('gulp');         // for gulp
var clean = require('gulp-clean');  // to clean out folder
var mocha = require('gulp-mocha');  // run mocha in build
var util = require('gulp-util');    // used in unit tests and others
var transform = require('gulp-text-simple');    // to parse the datafiles
//var merge = require('merge-stream');          // merges gulp streams
var merge = require('merge2');
var concat = require('gulp-concat');    // to combine files into one

// mocha and chai are installed for testing

// Variable Setup
var sources = [
    'src/**/*.js'
];
var tests = [
    'test/**/*.js'
];

var output = 'out/';

// import the data-parser module
var parseData = require("./data/parseData.js");

var getDataCode = function () {
    // scsubtab datafile
    var p1 = gulp.src('data/scsubtab.txt')
        .pipe(parseData.transformScsubtab());
    // valacdos datafile
    var p2 = gulp.src('data/valacdos.txt')
        .pipe(parseData.transformValacdos());
    return merge(p1, p2)
        .pipe(concat('data.js'));
}

// clean output folder
gulp.task('clean', function() {
    return gulp.src(output)
    .pipe(clean());
});

// task: parse both data files and merge (for testing data parsing)
gulp.task('parsedata', ['clean'], function () {
    return getDataCode()
        .pipe(gulp.dest(output));
});

gulp.task('build', ['clean'], function () {
    // get /src/** code
    var code = gulp.src(sources)
        .pipe(concat('code.js'));

    // generate data functions
    var dataCode = getDataCode();

    return merge(code, dataCode)
        .pipe(concat('modCheck.js'))
        .pipe(gulp.dest(output));
});

gulp.task('test', function () {
    return gulp.src(tests, { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});

gulp.task('watch-test', function () {
    gulp.watch(['views/**', 'public/**', 'app.js', 'framework/**', 'test/**'], ['test']);
});