const path = require('path')

module.exports = {
  devtool: 'eval-source',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'labile.min.js',
    library: 'Labile'
  },
  watch: true
}
