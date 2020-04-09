const path = require('path');

const srcReactPath = 'public/src/js/react-applications';
const distReactPath = 'public/dist/react-applications'

module.exports = {
  entry: {
    'home/app': `./${srcReactPath}/home/app.jsx`,
    'admin-dashboard/app': `./${srcReactPath}/admin-dashboard/app.jsx`,
    'user-dashboard/app': `./${srcReactPath}/user-dashboard/app.jsx`,
  },
  devServer: {
    contentBase: distReactPath,
    hot: true
  },
  output: {
    path: __dirname + '/public/dist/',
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          }
        ],
      },
    ]
  }
};