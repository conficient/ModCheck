// gulp modules
var gulp = require('gulp');         // for gulp
var tsb = require('gulp-tsb');      // typescript compiler
var mocha = require('gulp-mocha');  // run mocha in build

// mocha and chai are installed for testing


// Variable Setup
var sources = [
  'src/**/*.ts',
  'typings/**/*.d.ts'
];

var output = 'build/';


// create and keep compiler 
var compilation = tsb.create({
    target: 'es5',
    module: 'amd',
    declaration: false
});

gulp.task('build', function() {
    return gulp.src(sources)
        .pipe(compilation()) // <- new compilation 
        .pipe(gulp.dest(output));
});
