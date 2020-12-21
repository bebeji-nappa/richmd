const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'debug.ts');
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
        loader: 'babel-loader',
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sc|c)ss$/,
        use: [ MiniCssExtractPlugin.loader, 'sass-loader', 'css-loader' ],
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
}
