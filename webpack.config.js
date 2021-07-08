const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/client/index.js'),
  output: {
    path: path.join(__dirname, '/src/public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src/public'),
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
