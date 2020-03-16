const path = require('path');

const srcReactPath = 'public/src/js/react-applications';
const distReactPath = 'public/dist/react-applications'

module.exports = {
  entry: {
    'home/app': `./${srcReactPath}/home/app.jsx`,
  },
  devServer: {
    contentBase: distReactPath,
    hot: true
  },
  output: {
    publicPath: '/dist/react-applications/',
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
        use: ['file-loader'],
      },
    ]
  }
};