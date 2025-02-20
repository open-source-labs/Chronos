const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stats: {
    warningsFilter: (warning) => warning.includes('Deprecation'), // ignores SCSS deprecation warnings
  },
  entry: './app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2015',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', "sass-loader",
{
  loader: 'sass-loader',
  options: {
    implementation: require('sass') // Use Dart Sass
  },
}
 ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|ttf|svg|gif)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: './app',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/react-devtools'), // Path to the React DevTools directory in node_modules
          to: 'react-devtools', // Output directory in your webpack build
        },
      ],
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif', '.png', '.svg'],
  },
};
// webpack.config.js (ES Module version)
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';

// // Note: In an ES module, __dirname is not available by default.
// // We can use process.cwd() to get the current working directory, or define __dirname manually.
// const __dirname = process.cwd();

// export default {
//   mode: 'development', // or 'production' depending on your needs
//   entry: './src/index.js', // adjust the entry point as needed
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html', // adjust the template path as needed
//     }),
//   ],
//   // Add any additional configuration options below
// };
