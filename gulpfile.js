// gulp modules
var gulp = require('gulp');         // for gulp
var mocha = require('gulp-mocha');  // run mocha in build
var util = require('gulp-util');   // used in unit tests and others
var transform = require('gulp-text-simple'); // to parse the datafiles
var merge = require('merge-stream');         // merges gulp streams
var concat = require('gulp-concat');    // to combine files into one
// mocha and chai are installed for testing

// Variable Setup
var sources = [
    'src/**/*.ts',
    'typings/**/*.d.ts'
];

var output = 'out/';

// import the data-parser module
var parseData = require("./data/parseData.js");

///
/// transform the scsubtabfile into JS file
///
function parse1() {
    return gulp.src('data/scsubtab.txt')
        // create the Gulp transformati)on and insert it into the Gulp stream 
        .pipe(parseData.transformScsubtab());
    //.pipe(gulp.dest('out/'));
}

//
// transform the valacdos file into JS
//
function parse2() {
    return gulp.src('data/valacdos.txt')
         // create the Gulp transformation and insert it into the Gulp stream 
        .pipe(parseData.transformValacdos());
    //.pipe(gulp.dest('out/'));
}

// task: parse both data files and merge
gulp.task('parsedata', function(){
    var p1 = parse1();
    var p2 = parse2();
    return merge(p1,p2)
        .pipe(concat('modCheckData.js'))
        .pipe(gulp.dest(output));
});

gulp.task('build', function () {
    return gulp.src(sources)
        .pipe(compilation()) // <- new compilation 
        .pipe(gulp.dest(output));
});

gulp.task('test', function () {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});
 
gulp.task('watch-test', function () {
    gulp.watch(['views/**', 'public/**', 'app.js', 'framework/**', 'test/**'], ['test']);
});