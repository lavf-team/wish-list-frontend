const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpackPlugins = require('./webpack.plugins');

const isProd = false;
const HOST = '0.0.0.0';
const PORT = '9001';
const devBack = 'localhost';

module.exports = webpackMerge(commonConfig(isProd), {
  mode: 'development',
  devtool: 'source-map',
  plugins: webpackPlugins({
    isProd,
  }),

  devServer: {
    publicPath: '/',
    host: HOST,
    port: PORT,
    compress: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/': `http://${devBack}:8080`,
    }
  },
});
