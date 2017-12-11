const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotEnv.config();

module.exports = {
  entry: [
    './app/src/index.jsx'
  ],
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(`./app/public`),
    publicPath: 'https://emmanuelhellobooks.herokuapp.com/',

  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {

    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'resolve-url-loader',
            'sass-loader?sourceMap'],
        })
        ,
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader', 'resolve-url-loader'],
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=1000000&mimetype=application/font-woff',
      },
      {
        test: /\.(svg|png|jpeg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },

  node: {
    fs: 'empty'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new ExtractTextPlugin('./style.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(`./app/index.html`)
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production'),
        SECRET_KEY: JSON.stringify(process.env.SECRET_KEY),
        APP_CLOUD_NAME: JSON.stringify(process.env.APP_CLOUD_NAME),
        APP_API_KEY: JSON.stringify(process.env.APP_API_KEY),
        APP_API_SECRET: JSON.stringify(process.env.APP_API_SECRET),
        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID)
      }

    })
  ]
};
