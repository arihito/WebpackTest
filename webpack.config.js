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
