const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths');
const publicPath = './';

const nodeEnv = 'production';
const isDev = false;

// Enable build process terminated while there's an eslint error
const eslint = false;

// Setup the plugins for development/prodcution
const getPlugins = () => {
  // Common
  const plugins = [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new MiniCssExtractPlugin({
      // Don't use hash in development, we need the persistent for "renderHtml.js"
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    // Setup enviorment variables for client
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    // Setup global variables for client
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new FriendlyErrorsWebpackPlugin()
  ];

  if (isDev) {
    // Development
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      // Production
      new webpack.HashedModuleIdsPlugin(),
      // new CompressionPlugin({
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.jsx?$|\.css$|\.(scss|sass)$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),
      // Plugin to compress images with imagemin
      // Check "https://github.com/Klathmon/imagemin-webpack-plugin" for more configurations
      // new ImageminPlugin({
      //   pngquant: { quality: '95-100' }
      // }),
      // Visualize all of the webpack bundles
      // Check "https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin"
      // for more configurations
      new BundleAnalyzerPlugin()
    );
  }

  return plugins;
};

// Webpack configuration
module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'hidden-source-map',
  context: path.resolve(process.cwd()),
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'static/js/vendor.[chunkhash:8].js',
        },
        manifest: {
          priority: -20,
          filename: 'static/js/manifest.[chunkhash:8].js'
        }
      }
    }
  },
  output: {
    path: paths.appBuild,
    publicPath: publicPath,
    // Don't use chunkhash in development it will increase compilation time
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },
  module: {
    rules: [
      {
        // Eslint
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { failOnError: eslint }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          compact: true,
          presets: ['env', 'react'],
          plugins: [
            'loadable-components/babel'
          ]
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg|gif|png|jpe?g|webp)$/,
        loader: 'url-loader',
        options: { limit: 10240, name: '[name].[hash:8].[ext]' }
      }
    ]
  },
  plugins: getPlugins(),
  /* Advanced configuration */
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json']
  },
  cache: isDev,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};