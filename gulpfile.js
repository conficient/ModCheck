var gulp = require('gulp');
var tsb = require('gulp-tsb');
var del = require('del');

var sources = [
  'src/**/*.ts',
  'typings/**/*.d.ts'
];

var output = 'out/';

var onError = error => { console.error('*** Error: ' + error); };

var compilation = tsb.create({
    module: 'amd', 
    inlineSourceMap: false,
    sourceRoot: __dirname + '/src',
		declaration: false
}, false, false, onError);

gulp.task('clean', () => del([output]));

gulp.task('build', ['clean'], () => {
		return gulp.src(sources)
    .pipe(compilation())
    .pipe(gulp.dest(output));
});

gulp.task('test', () => {
  // execute unit tests

});

gulp.task('watch', ['build'], () => {
    gulp.watch(sources, ['build']);
});

gulp.task('default', ['watch']);