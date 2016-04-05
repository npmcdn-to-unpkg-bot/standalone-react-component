const webpack = require( 'webpack' );

const DEBUG = true;

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

const config = {
  entry: './app.js',
  output: {
    filename: 'app.js',
    path: './build/',
    publicPath: './',
    sourcePrefix: '  ',
  },

  externals: {
    react: 'React',
  },

  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval-source-map' : false,

  stats: {
    colors: true,
    reasons: DEBUG,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin( GLOBALS ),
  ].concat( DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ] ),

  resolve: {
    extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx', ],
  },

  module: {
    preLoaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }, ],

    loaders: [ {
      test: /\.scss$/,
      loaders: [ 'style', 'css', 'autoprefixer', 'sass', ],
    }, {
      test: /\.css$/,
      loaders: [ 'style', 'css', 'autoprefixer', ],
    }, {
      test: /\.gif/,
      loader: 'url-loader?limit=10000&mimetype=image/gif',
    }, {
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg',
    }, {
      test: /\.png/,
      loader: 'url-loader?limit=10000&mimetype=image/png',
    }, {
      test: /\.svg/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, ],
  },
};

module.exports = config;
