# Usage RichMD for React
It is usage example RichMD for React. 

### Install packages
It execute this commands in CLI, It install required packages.

```txt
$ npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin html-webpack-plugin
$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
$ npm install core-js@3 react react-dom
$ npm install --save-dev css-loader mini-css-extract-plugin
$ npm install --save-dev file-loader url-loader
```

### Folder structure example
```txt
src/
|--index.jsx
|--index.html 
|--styles/
   |--style.css
webpack.config.js
babel.config.js
```

### Set up RichMD

1. It create `webpack.config.js` in your project, This code add to `webpack.config.js`.

```js
const path = require('path');
const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.jsx');
const TEMPLATE_FILE = path.resolve(SRC_DIR, 'index.html');
const OUT_FILENAME = 'index.js';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.jsx$/,
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
    extensions: [ '.js', '.jsx', '.css' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
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
    "@babel/preset-react"
  ]
};
```

1. This code add `src/index.jsx`.

```js
import React, { useState } from 'react';
import { render } from 'react-dom'
import { richmd } from 'richmd'
import './styles/style.css'

const Editor = () => {
  const [text, setMarkdown] = useState('');

  return (
    <>
      <form id="post-form">
        <div id="editor">
          <textarea className="textField" onChange={(e) => setMarkdown(e.target.value)}></textarea>
        </div>
        <div id="preview">
          <div className="preview" dangerouslySetInnerHTML={{__html: richmd(text)}}></div>
        </div>
      </form>
    </>
  )
}

render(<Editor />, document.getElementById('root'))
```

4. This code add `src/index.html`.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>RichMD Playground</title>
  </head>
  <body>
    <div id="root" />
  </body>
</html>

```

1. This code add `src/styles/style.css`.

```css
#post-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  width: 100%;
  height: auto;
}
#editor {
  padding: 0 10px;
  width: 50%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#preview {
  width: 50%;
  height: auto;
  border-left: solid 1px #ccc;
}
.preview {
  width: 95%;
  margin: 0 auto;
}
.textField {
  border: none;
  outline: none;
  resize: none;
  margin: none;
  width: 95%;
  height: 100vh;
  font-size: 16px;
  line-height: 25px;
}
.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  width: 95%;
  border: solid 1px #ccc;
}
.listPadding {
  padding: 0 5px;
}

```

6. It execute this command in CLI, Build webpack & Start up webpack-dev-server

```txt
$ webpack serve
```

7. Access `http://localhost:8080` in your web browser and check if the application is running.
