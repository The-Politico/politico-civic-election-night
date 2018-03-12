const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const _ = require('lodash');

module.exports = port => ({
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'Common': path.resolve(__dirname, 'src/js/common'),
      'CommonModels': path.resolve(__dirname, 'src/js/common/models'),
      'CommonUtils': path.resolve(__dirname, 'src/js/common/utils'),
      'CommonConstants': path.resolve(__dirname, 'src/js/common/constants'),
      'CommonComponents': path.resolve(__dirname, 'src/js/common/components'),
      'SCSS': path.resolve(__dirname, 'src/scss'),
      'SpecialApp': path.resolve(__dirname, 'src/js/special-app'),
      'StateApp': path.resolve(__dirname, 'src/js/state-app'),
    },
  },
  entry: _.zipObject(
    glob.sync('./src/js/main-*.js*').map(f => path.basename(f, path.extname(f))),
    glob.sync('./src/js/main-*.js*').map(f => [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
      f,
    ]),
  ),
  output: {
    path: '/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                  debug: true,
                  modules: false,
                },
              ],
              'react',
              'stage-0',
              'airbnb',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', {
            loader: 'svgr/webpack',
            options: {
                icon: true,
            },
        }],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
  stats: 'minimal',
  devtool: 'cheap-module-eval-source-map',
  watch: true,
});
