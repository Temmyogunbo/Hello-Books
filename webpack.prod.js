const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const dotEnvWebpack = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './client/app/src/index.jsx'
  ],
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(`${__dirname}/client/app/public`),
    publicPath: 'https://emmanuelhellobooks.herokuapp.com/',

  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {

    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|bower_components)/,
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
        }),
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
        test: /\.(svg|png|jpe?g)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
    new webpack.optimize.UglifyJsPlugin(),
    new UglifyJSPlugin(),
    new dotEnvWebpack({
      path: './.env',
      safe: false,
    }),
    new webpack.DefinePlugin({
      proces: {
        env: {
          NODE_ENV: JSON.stringify('production'),
          SECRET_KEY: JSON.stringify(process.env.SECRET_KEY),
          APP_CLOUD_NAME: JSON.stringify(process.env.APP_CLOUD_NAME),
          APP_API_KEY: JSON.stringify(process.env.APP_API_KEY),
          APP_API_SECRET: JSON.stringify(process.env.APP_API_SECRET),
          GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID)
        }
      }
    })
  ]
};
