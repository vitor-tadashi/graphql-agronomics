'use strict';

const path = require('path');
const lodash = require('lodash');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: lodash.assign({}, slsw.lib.entries),
  externals: [nodeExternals({
    modulesFromFile: true
  })],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { node: '8.10' } }]],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production'
};
