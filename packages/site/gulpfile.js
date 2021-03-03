const gulp = require('gulp');
const sassTasks = require('./gulp/sass-tasks');
const eleventyTasks = require('./gulp/eleventy-tasks');
const jsTasks = require('./gulp/js-tasks');

const build = gulp.parallel(
  sassTasks.build,
  eleventyTasks.build,
  jsTasks.build,
);

const serve = gulp.parallel(
  gulp.series(
    sassTasks.build,
    sassTasks.watch,
  ),
  jsTasks.watch,
  eleventyTasks.serve,
);

module.exports = {
  default: build,
  serve,
};
