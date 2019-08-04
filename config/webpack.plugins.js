const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultHTMLTemplateOptions = {
  chunks: ['main'],
  filename: 'index.html',
  title: 'Wish List',
};

module.exports = ({
  isProd,
  HTMLTemplateOptions = defaultHTMLTemplateOptions
}) => [
  new MiniCssExtractPlugin({
    hmr: !isProd,
  }),
  new HtmlWebpackPlugin({
    ...HTMLTemplateOptions,
    template: './src/index.ejs',
  }),
];
