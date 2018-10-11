const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const help = require('../helpers');

const NODE_ENV = process.env.NODE_ENV;
const prod = NODE_ENV === 'production';

module.exports = {
  entry: {
    app: ['babel-polyfill', help.root('frontend/src/index.js')],
  },
  output: {
    path: help.root('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: { app: 'frontend/src' },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: help.root('frontend'),
        loader: 'babel-loader',
      },
      {
        test: [/\.scss$/, /\.css$/],
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          { loader: 'file-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'), // Uncomment for production
        // NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: help.root('frontend/public/index.html'),
      inject: true,
      xhtml: true,
    }),
  ],
};
