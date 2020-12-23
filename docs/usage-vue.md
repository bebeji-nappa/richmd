# Usage RichMD.js for Vue(v2)
It is usage example RichMD.js by Vue. 

### Install packages
It execute this commands in CLI, It install required packages.

```txt
$ npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin html-webpack-plugin
$ npm install --save-dev @babel/core @babel/preset-env babel-loader vue-loader
$ npm install core-js@3 vue
$ npm install --save-dev css-loader mini-css-extract-plugin
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

### Set up RichMD.js

1. It create `webpack.config.js` in your project, This code add to `webpack.config.js`.

```js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    extensions: [ '.js', '.vue', '.css' ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: TEMPLATE_FILE
    }),
    new MiniCssExtractPlugin(),
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

1. This code add `src/App.vue`.

```js
<template>
  <form id="post-form">
    <div id="editor">
      <textarea v-model="markdownText" class="textField"></textarea>
    </div>
    <div id="preview">
      <div v-html="compiledMarkdown" class="preview"></div>
    </div>
  </form>
</template>
<script>
import { richmd } from 'richmd'

export default {
  data() {
    return {
      markdownText: ''
    }
  },
  computed: {
    compiledMarkdown () {
      return richmd(this.markdownText)
    }
  },
}
</script>
<style>
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
</style>
```

4. This code add `src/index.html`.

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>RichMD.js Playground</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

5. This code add `src/index.js`.

```js
import Vue from 'vue'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
```

6. It execute this commands in CLI, Build webpack & Start up webpack-dev-server

```txt
$ webpack serve
```

7. Access `http://localhost:8080` in your web browser and check if the application is running.
