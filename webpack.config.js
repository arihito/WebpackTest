module.exports = {
  // 読み込むフォルダ
  entry: './src',
  // 出力するパスとファイル名
  output: {
    path: 'builds',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        // 全てのjsファイル
        test: /\.js/,
        // babelにトランスパイル
        loader: 'babel',
        // プロジェクトルート直下のsrcフォルダ内を読み込む
        include: __dirname + '/src',
      }
    ]
  }
}
