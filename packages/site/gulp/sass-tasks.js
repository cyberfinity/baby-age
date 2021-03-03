const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const bldApi = require('../bld-api');
const { reloadBrowser } = require('./utils')

function build() {
  return gulp.src(bldApi.styleSrc('style.scss'))
    .pipe(sass())
    .pipe(gulp.dest(bldApi.styleDistDir));
}

function watch() {
  return gulp.watch(
    bldApi.styleSrc('**', '*.scss'),
    gulp.series(
      build,
      reloadBrowser
    ),
  );
}

module.exports = {
  build,
  watch
};
