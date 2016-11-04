'use strict';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js',
  },
  resolve: {
    packageAlias: 'browser',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};
