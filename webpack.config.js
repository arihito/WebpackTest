var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',   // 依存性をmainファイルに移動
    children: true, // 全ての子に対しても共通する依存性を探す
    minChunks: 2,   // 指定した回数分の繰り返した依存性に遭遇したら抜き出す
  }),
];

if (production) {
  plugins = plugins.concat([
    // 製品版のプラグインを指定

    // buildsフォルダ内をクリーンアップ
    new CleanPlugin('builds'),

    // キャッシュを軽減するため同名のチャンクファイルをマージ
    new webpack.optimize.DedupePlugin(),

    // 使用回数に合わせて最適化
    new webpack.optimize.OccurenceOrderPlugin(),

    // チャンクサイズの軽減により読み込み効率の悪化を防止
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // Webpack2用のローダーデバッグ
    new webpack.LoaderOptionsPlugin({
       debug: true
    })

    // 最終的なバンドルした全JSファイルを圧縮化
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // uglificationの警告を非表示
      },
    }),

    // 本番時にfalseを設定することでバンドルとトランスパイルに含まない
    new webpack.DefinePlugin({
      __SERVER__:   !production,
      __DEVELOPMENT__: !production,
      __DEVTOOLS__:    !production,
      'process.env': {
        BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]);
}

module.exports = {
  // ローダーをデバッグモードから切り替え
  debug: !production,
  // エラー行を表示するソースマップをローカル上の最適モード(eval)で出力
  devtool: production ? false : 'eval',
  // 読み込むフォルダ
  entry: './src',
  // 出力するパスとファイル名
  output: {
    path: 'builds',
    filename: production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'builds/',
  },
  plugins: plugins,
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
