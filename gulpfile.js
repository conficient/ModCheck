// gulp modules
var gulp = require('gulp');         // for gulp
var tsb = require('gulp-tsb');      // typescript compiler
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

var parseScsubtab = function (s) {
    // module wrapper
    // create result function start
    var result = "var modCheckData;\n" + 
        "(function (modCheckData) {\n" + 
        "function replaceSort(sc) {\n";

    // split file into lines
    var lines = s.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l) {
            result += " if(sc == " + l.substr(0, 6) + ") return " + l.substr(7, 6) + ";\n";
        }
    }
    result += " return sc; // use original sort code\n}\n";
    return result;
};

var parseValacdos = function (s) {
    // create result function
    var result = "// get validation entries\nfunction getEntries(sc) {\n var r =[];\n";
    // split file into lines
    var lines = s.split('\n');
    // create function
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l) {
            var sc1 = parseInt(l.substr(0, 6));
            var sc2 = parseInt(l.substr(7, 6));
            var method = l.substr(14, 5).trim();
            // build array
            var a = "[", b = "";
            for (var j = 0; j < 14; j++) {
                var c = l.substr(j * 5 + 19, 5).trim();
                a += b + c;
                b = ",";
            }
            a += "]";
            var e = parseInt(l.substr(90, 3));
            if (isNaN(e)) e = 0;
            if(sc1 == sc2)
                result += "  if(sc == " + sc1 + ")\n";
            else
                result += "  if(sc >= " + sc1 + " && sc <= " + sc2 + ")\n";

            result += "    r.push({m: \"" + method + "\", w: " + a + ", e: " + e + "});\n";
            // m: method, w: weights, e: exception
        }
    }
    result += "  return r;\n}\n" +
              "})(modCheckData || (modCheckData = {}));";
    return result;
};

var transformScsubtab = transform(parseScsubtab);
var transformValacdos = transform(parseValacdos);

///
/// transform the scsubtabfile into JS file
///
function parse1() {
    return gulp.src('data/scsubtab.txt')
        // create the Gulp transformati)on and insert it into the Gulp stream 
        .pipe(transformScsubtab());
    //.pipe(gulp.dest('out/'));
}

//
// transform the valacdos file into JS
//
function parse2() {
    return gulp.src('data/valacdos.txt')
         // create the Gulp transformation and insert it into the Gulp stream 
        .pipe(transformValacdos());
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


// create and keep compiler 
var compilation = tsb.create({
    target: 'es5',
    module: 'commonjs'
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