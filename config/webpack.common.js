const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = subPath => path.join(__dirname, '../src', subPath);
const publicDir = path.join(__dirname, '..', '/dist');

module.exports = isProd => ({
  entry: './src/index.tsx',
  output: {
    path: publicDir,
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
  },
  resolve: {
    extensions:  ['.js', '.ts', '.tsx', '.scss', '.css', '.html', '.json'],
    alias: {
      components: srcPath('components'),
      config: srcPath('config'),
      img: srcPath('img'),
      pages: srcPath('pages'),
      store: srcPath('store'),
      styles: srcPath('styles'),
      utils: srcPath('utils'),
    }
  },
  module: {
    rules: [
      {
        test: /.(s?css|sass)$/,
        exclude: /\.module\.(s?css|sass)$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [srcPath]
            }
          }
        ]
      },
      {
        test: /\.module\.(s?css|sass)$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]___[hash:base64:5]'
              },
              sourceMap: !isProd,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [srcPath]
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: 'tslint.json'
            }
          }
        ]
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve('url-loader'),
          options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
          },
      },
    ],
  },
});
