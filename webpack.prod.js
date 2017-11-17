const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new UglifyJSPlugin(),
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
});
