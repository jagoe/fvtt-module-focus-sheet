const path = require('path')
const GenerateJsonFromJsPlugin = require('generate-json-from-js-webpack-plugin')

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
    filename: 'scripts/focus-sheet.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new GenerateJsonFromJsPlugin({
      path: './src/lang/en.ts',
      filename: 'lang/en.json',
    }),
  ],
}
