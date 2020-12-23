# Simple Usage of RichMD.js
## Set up RichMD.js
It execute this commands in CLI.

```txt
$ npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin
$ npm install --save-dev @babel/core @babel/preset-env babel-loader 
$ npm install core-js@3
$ npm install --save-dev css-loader mini-css-extract-plugin
$ npm install --save-dev file-loader url-loader
```

### Required folder structure example
```txt
src/
|--index.js   // This is Entry file.
webpack.config.js
babel.config.js
package.json
```

It create `webpack.config.js` in your project, This code add to `webpack.config.js`.

```js
const path = require('path');
const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const OUT_FILENAME = 'index.js';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const app = {
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
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 
          { 
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, 
          'css-loader'
        ],
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
    extensions: [ '.js', '.css' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true
  }
}

module.exports = app;
```
And, create `babel.config.js`, this code copy and paste.

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
};
```

## Usage RichMD.js
You can use RichMD.js as a ECMAScript module.

It create Entry file. This code copy and paste to `src/index.js`.

```js
import { richmd } from 'richmd'

const text = `# heading 1`
console.log(richmd(text)) // Markdown convert to HTML
```

It execute this commands in CLI, output HTML String.

```txt
$ webpack
$ node ./dist/index.js
```
