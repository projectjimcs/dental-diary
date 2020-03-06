const path = require('path');
// import path from 'path';

// const __dirname = path.resolve();

module.exports = {
  entry: {
    home: './public/src/js/react-applications/home/app.jsx'
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/public/dist',
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
    ]
  }
};