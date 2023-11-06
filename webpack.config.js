const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'development',
  //mode: 'production',
  entry: './src/app/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Era',
      template: 'public/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};

module.exports = (env, argv) => {
  return config;
};

/*
module.exports = (env, argv) => {
    config.mode = argv.mode;
    if ( argv.mode === 'development' ) {
        config.output.filename = 'main.js';
    } else {
        config.output.filename = 'main.min.js';
    }
    return config;
};
*/