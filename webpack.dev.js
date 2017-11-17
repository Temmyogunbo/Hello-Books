const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const dotEnvWebpack = require('dotenv-webpack');


const { CLIENTPORT } = process.env;
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: CLIENTPORT,
    publicPath: `http://localhost:${CLIENTPORT}/`,
    // access dev server from an arbitrary url. handy in html5 router
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8000'
    },
    overlay: true,
    contentBase: path.join(__dirname, './client/app/public'),
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
});
