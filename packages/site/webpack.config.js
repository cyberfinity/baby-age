const bldApi = require('./bld-api');

module.exports = {
  mode: 'production',
  devtool: "source-map",
  entry: bldApi.jsSrc('index.ts'),
  output: {
    path: bldApi.jsDistDir,
    filename: 'bundle.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
