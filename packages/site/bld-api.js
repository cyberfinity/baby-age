const path = require('path');

const srcDir = (...pathSegments) => path.resolve(
  __dirname, 'src', ...pathSegments,
);

const distDir = (...pathSegments) => path.resolve(
  __dirname, 'dist', ...pathSegments,
);


module.exports = {
  eleventy: {
    inputDir: path.relative(__dirname, srcDir('site')),
    outputDir: path.relative(__dirname, distDir()),

    includesDirname: '_includes',
    dataDirname: '_data',
  },

  styleSrc: (...pathSegments) => srcDir('style', ...pathSegments),
  styleDistDir: distDir('style'),
}
