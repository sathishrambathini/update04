const path = require('path');

module.exports = {
  entry: './src/plugin.js',
  output: {
    filename: 'plugin.js',
    path: path.resolve(__dirname, 'dist')
  }
};