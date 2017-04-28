var webpack = require("webpack");

module.exports = {
  entry: __dirname + '/react/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    unsafeCache: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015']
      }
    }]
  }
}
