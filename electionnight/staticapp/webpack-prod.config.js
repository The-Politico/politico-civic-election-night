const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const _ = require('lodash');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
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
      'RunoffApp': path.resolve(__dirname, 'src/js/runoff-app'),
      'SpecialApp': path.resolve(__dirname, 'src/js/special-app'),
      'StateApp': path.resolve(__dirname, 'src/js/state-app'),
    },
  },
  entry: _.zipObject(
    glob.sync('./src/js/main-*.js*').map(f => path.basename(f, path.extname(f))),
    glob.sync('./src/js/main-*.js*'),
  ),
  output: {
    path: path.resolve(__dirname, '../static/electionnight'),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath('css/[name].css').replace('css/js', 'css'),
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
};
