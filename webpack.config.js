const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src/client/index.js"),
  output: {
    path: path.join(__dirname, "/src/public"),
    filename: "bundle.js",
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "src/public"),
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: { stream: require.resolve("stream-browserify") },
  },
  plugins: [new NodePolyfillPlugin()],
};
