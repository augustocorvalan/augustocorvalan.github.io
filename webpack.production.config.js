var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    publicPath: '/augustocorvalan.github.io/',
    filename: "app.js"
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader') 
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  postcss: [
    require('postcss-import')(),
    require('postcss-cssnext')(), 
    require('postcss-focus')(), //add a :focus to every :hover
    require("postcss-reporter")({ clearMessages: true })
 ]
}
