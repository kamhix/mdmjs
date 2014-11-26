'use strict';

var del = require('del');
var gulp = require('gulp');
var argv = require('yargs').argv;
var $$ = require('gulp-load-plugins')({pattern: ['gulp-*']});

var curTheme = argv.theme;

gulp.task('clean', function (cb) {
  return del(['themes/dist/' + curTheme], cb);
});

gulp.task('fonts', function () {
  return gulp.src(['bower_components/fontawesome/fonts/*'])
    .pipe(gulp.dest('themes/dist/' + curTheme + '/fonts'))
    .pipe($$.size());
});

gulp.task('assets', ['fonts'], function () {
  return gulp.src([
    'themes/src/' + curTheme + '/**/*.{jpeg,png,jpg}',
    'themes/src/' + curTheme + '/**/*.info'
  ])
    .pipe(gulp.dest('themes/dist/' + curTheme))
    .pipe($$.size());
});

gulp.task('html', ['assets'], function () {
  var assets = $$.useref.assets({
     searchPath: '/themes/src/' + curTheme
  });

  return gulp.src('themes/src/' + curTheme + '/*.html')
    .pipe(assets)
    .pipe($$.if('*.js', $$.replace('../../common', '../common')))
    .pipe(assets.restore())
    .pipe($$.useref())
    .pipe(gulp.dest('themes/dist/' + curTheme));
});

gulp.task('build-themes', function () {
    gulp.start('html');
});

gulp.task('default', ['clean'], function () {
  gulp.start('build-themes');
});
