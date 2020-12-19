const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const OUT_FILENAME = 'index.js'

module.exports = {
  mode: 'development',
  entry: ENTRY_FILE,
  output: {
    path: DIST_DIR,
    filename: OUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
    ]
  },
  resolve: {
    extensions: [ '.js' ],
    alias: {
      '@': SRC_DIR
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
