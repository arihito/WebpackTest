var webpack = require('webpack');

module.exports = {
  // 読み込むフォルダ
  entry: './src',
  // 出力するパスとファイル名
  output: {
    path: 'builds',
    filename: 'bundle.js',
    chunkFilename: "[name].bundle.js",
    publicPath: 'builds/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',   // 依存性をmainファイルに移動
      children: true, // 全ての子に対しても共通する依存性を探す
      minChunks: 2,   // 指定した回数分の繰り返した依存性に遭遇したら抜き出す
    }),
  ],
  module: {
    loaders: [
      {
        // 全てのjsファイル
        test: /\.js/,
        // babelにトランスパイル
        loader: 'babel-loader',
        // プロジェクトルート直下のsrcフォルダ内を読み込む
        include: __dirname + '/src',
      },
      {
        test: /\.scss/,
        // !は区切りで複数ファイルを指定
        // ['style-loader', 'css-loader', 'sass-loader']と同じ]
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      }
    ]
  }
}
