// gulp modules
var gulp = require('gulp');         // for gulp
var tsb = require('gulp-tsb');      // typescript compiler
var mocha = require('gulp-mocha');  // run mocha in build
var transform = require('gulp-text-simple'); // to parse the datafiles
// mocha and chai are installed for testing


// Variable Setup
var sources = [
  'src/**/*.ts',
  'typings/**/*.d.ts'
];

var output = 'out/';

// transform scsubtab.txt file into a series of if.. statements
var transformString = function (s) {
    // split file into lines
    var result = "function checkSort(sc) {\n";
    var lines = s.split('\n');
    console.log("Split into " + lines.length + " lines");
    for (var i=0; i< lines.length; i++){
        var l = lines[i];
        if(l){
            result +=" if(sc == " + l.substr(0,6) + ") return " + l.substr(7,6) + ";\n";
        }
    }
    result += " return sc; // use plan sort\n}\n";
    return result;
};
 
// create the factory with GulpText simple 
var myTransformation = transform(transformString);
 
gulp.task('parsedata', function () {
    return gulp.src('data/scsubtab.txt')
        .pipe(myTransformation()) // create the Gulp transformation and insert it into the Gulp stream 
        .pipe(gulp.dest('out/'));
});


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
