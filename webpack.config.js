module.exports = {
  entry: './src/components/App.jsx',
  output: {
    filename: './dist/bundle.js',
  },
  resolve: {
    packageAlias: 'browser',
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        exclude: [/joi-browser/],
      },
    ],
  },
};
