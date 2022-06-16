const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ANTDCSSFILEPATH = path.resolve(__dirname, './node_modules/antd/dist/antd.less');
module.exports = {
  entry: './app/index.tsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index_bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$|jsx/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['import', { libraryName: 'antd', style: 'css' }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        issuer: {
          exclude: /\.less$/,
        },
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        include: ANTDCSSFILEPATH,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|ttf|svg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 10,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(process.cwd(), 'app'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif', '.png', '.svg'],
  },
};
