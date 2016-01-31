"use strict";
const webpack = require("webpack");
const path = require("path");

const nodeModulesPath = path.join(__dirname, "node_modules");

const reactMinPath = path.resolve(nodeModulesPath, "react/dist/react.min.js");
const reactDomMinPath = path.resolve(nodeModulesPath, "react-dom/dist/react-dom.min.js");
const explicitDependencies = {
  "react" : reactMinPath,
  "react-dom" : reactDomMinPath
};

module.exports = {
  debug : true,
  entry : {
    app : "./src/index"
  },
  cache : true,
  resolve : {
    // will resolve and parse requires with js, jsx and no extension
    extensions : ["", ".js", ".jsx"],
    // whenever webpack resolves a require("dependency"), it will get the given dependency path
    // can be parametrized for dev/production use
    alias : explicitDependencies
  },
  output : {
    path : "dist/",
    filename : "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test : /.jsx?$/,
        loader : 'babel',
        exclude : /node_modules/,
        query : {
          presets : ['es2015', 'react']
        }
      }
    ],
    // excludes react from being parsed by webpack as it's already bundled/minified
    noParse : [path.resolve(nodeModulesPath, 'react/dist/react.min.js')]
  },
  plugins : [
    // whenever webpack resolves a node_module requirement, put it in the vendors bundle
    new webpack.optimize.CommonsChunkPlugin({
      name : "vendors",
      filename : "vendors.bundle.js",
      minChunks : (module) => module.resource && module.resource.indexOf(nodeModulesPath) > -1
    })
  ]
};
