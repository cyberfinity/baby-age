const webpack = require('webpack');
const config = require('../webpack.config');
const { reloadBrowser } = require('./utils')

const compiler = webpack(config);

function build(done) {
  compiler.run((err, stats) => { // [Stats Object](#stats-object)
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    if (err || stats.hasErrors()) {
      done(err || 'Webpack build failed')
    }
    done();
  });
}

function watch() {
  compiler.watch({
    // watch options
  },(err, stats) => { // [Stats Object](#stats-object)
    // if (err || stats.hasErrors()) {
    //   // [Handle errors here](#error-handling)
    // }

    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));

    if (!stats.hasErrors()) {
      reloadBrowser(()=>{});
    }
  });
}

module.exports = {
  build,
  watch,
};
