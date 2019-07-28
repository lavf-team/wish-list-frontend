const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = subPath => path.join(__dirname, '../src', subPath);
const publicDir = path.join(__dirname, '..', '/dist');

const getCSSLoader = (withModules = false, isProd) => [
  {loader: MiniCssExtractPlugin.loader},
  {
    loader: 'css-loader',
    options: withModules ? {
      modules: {
        mode: 'local',
        localIdentName: '[local]___[hash:base64:5]'
      },
      sourceMap: !isProd,
      importLoaders: 1,
    } : {
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
];

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
      libs: srcPath('libs'),
    }
  },
  module: {
    rules: [
      {
        test: /.(s?css|sass)$/,
        exclude: /\.module\.(s?css|sass)$/,
        use: getCSSLoader(false, isProd),
      },
      {
        test: /\.module\.(s?css|sass)$/,
        use: getCSSLoader(true, isProd)
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
