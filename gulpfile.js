


var gulp = require("gulp");

var htmlmin = require('gulp-htmlmin');

var csso = require('gulp-csso');

var uglify = require('gulp-uglify');

var source = "source/";

var dest ="production/";



gulp.task("default", function() {
console.log("hello");

});


gulp.task("htmlminify", function(){
return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('production/'))
});

gulp.task("cssminify", function () {
    return gulp.src('source/*.css')
        .pipe(csso())
        .pipe(gulp.dest(dest));
});

gulp.task('jscompress', function() {
  return gulp.src('source/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});