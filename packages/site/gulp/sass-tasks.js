const http = require('http');
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const bldApi = require('../bld-api');

const browserSyncPort = 8080;

function reloadBrowser(done) {
  const url = `http://localhost:${browserSyncPort}/__browser_sync__?method=reload`;

  http.get(url, (resp) => {
    resp.on('data',() => {});
    resp.on('end', () => {
      done();
    });
  }).on('error', (err) => {
    done(err);
  });
}

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
