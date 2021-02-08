const path = require('path');

const srcDir = (...pathSegments) => path.resolve(
  __dirname, 'src', ...pathSegments,
);

const distDir = (...pathSegments) => path.resolve(
  __dirname, 'dist', ...pathSegments,
);


module.exports = {
  eleventyInputDir: path.relative(__dirname, srcDir('site')),
  eleventyOutputDir: path.relative(__dirname, distDir()),

  styleSrc: (...pathSegments) => srcDir('style', ...pathSegments),
  styleDistDir: distDir('style'),
}
