'use strict';

var gulp = require('gulp');
const { series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const { parallel } = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
const minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');
var build = require('gulp-build');

var cleanCss = require('gulp-clean-css');


function buildStyles() {
    return gulp.src('./css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
};

exports.buildStyles = buildStyles;

exports.watch = function () {
    gulp.watch('./css/*.scss', parallel('buildStyles'));
};

gulp.task('browser-sync', function () {
    var files = ['./*html', './css/*.css', 'imgagenes/*{.png, jpg, gif}', './js/*.js'];
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('compress', function(done) {
    gulp.src(['./imagenes/*.{png,jpg,jpeg,gif}'])
      .pipe(minify())
      .pipe(gulp.dest('dist/imagenes'))
      done();
  });

gulp.task('usemin', function() {
    return gulp.src('./*.html')
      .pipe(usemin({
        css: [ rev ],
        html: [ function () {return htmlmin({ collapseWhitespace: true });} ],
        js: [ uglify, rev ],
        inlinejs: [ uglify ],
        inlinecss: [ cleanCss, 'concat' ]
      }))
      .pipe(gulp.dest('dist/'));
  });

  exports.build = series('clean','compress', 'usemin');
  exports.default = series('browser-sync');
