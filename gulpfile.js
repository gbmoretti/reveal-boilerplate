'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.']
    },
    ui: false
  });
  gulp.watch([
    'index.html',
    'slides/*',
    'styles/**/*.scss'
  ], ['sass'])
  .on('change', browserSync.reload);
});

gulp.task('deploy', function () {
  return gulp.src([
    'index.html',
    'slides/*',
    'build/*',
    'node_modules/reveal.js/**',
    'hotfix/**'
  ], {
    base: '.'
  })
  .pipe($.ghPages());
});

gulp.task('default', ['sass', 'serve']);
