const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/module.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'focus-sheet.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
}
