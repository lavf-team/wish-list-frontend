const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultHTMLTemplateOptions = {
  chunks: ['main'],
  filename: 'index.html',
  title: 'Partygoer',
};

module.exports = ({
  isProd,
  HTMLTemplateOptions = defaultHTMLTemplateOptions
}) => [
  new MiniCssExtractPlugin({
    hmr: !isProd,
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: path.resolve(__dirname, '../'),
  }),
  new HtmlWebpackPlugin({
    ...HTMLTemplateOptions,
    template: './src/index.ejs',
  }),
];
