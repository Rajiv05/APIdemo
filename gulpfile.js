'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();

 
gulp.task('sass', function () {
  return gulp.src('./assets/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets'))
    .pipe(browserSync.stream());;
});
 
gulp.task('sass:watch', function () {

	browserSync.init({
        server: "."
    });

  	gulp.watch('./assets/**/*.scss', ['sass']);

  	gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch(".assets/*.js").on('change', browserSync.reload);
});