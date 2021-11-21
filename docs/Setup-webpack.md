# Usage Webpack

It set up Webpack with the assumption that you will use it with Vue.

### Install packages
It execute this commands in CLI, It install required packages.

```txt
$ npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin html-webpack-plugin
$ npm install --save-dev @babel/core @babel/preset-env babel-loader vue-loader
$ npm install core-js@3 vue
$ npm install --save-dev css-loader style-loader
$ npm install --save-dev file-loader url-loader
```

### Folder structure example
```txt
src/
|--index.js
|--index.html 
|--App.vue
webpack.config.js
babel.config.js
```

### Set up Richmd

1. It create `webpack.config.js` in your project, This code add to `webpack.config.js`.

```js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const TEMPLATE_FILE = path.resolve(SRC_DIR, 'index.html');
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
        test: /\.vue$/,
        use: [ 'vue-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader',
        options: {
          limit: 10000
        } 
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue', '.css' ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: TEMPLATE_FILE
    }),
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true
  }
}
```

2. And, create `babel.config.js`, this code copy and paste.

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: 3
      },
    ],
  ]
}
```
