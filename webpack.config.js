const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './client/index.js',
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
             test: /\.(png|svg|jpg|gif|mov)$/,
             use: [
               'file-loader',
             ],
           },
      ]
   },
   devServer: {
      historyApiFallback: true,
    },
   plugins:[
       new HtmlWebpackPlugin({
            template: './dist/index.html'
       }) 
   ]
}