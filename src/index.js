// もしa要素が1つでも存在していれば
if (document.querySelectorAll('a').length) {

  // スプリットポイント内のチャンクコードを使用していれば読み込む
  require.ensure([], () => {

    // requireは出力処理をしないのでdefaultを手動で指定することでexportが可能
    const Button = require('./Components/Button').default;
    const button = new Button('google.com');
    button.render('a');
  }, 'button'); // チャンク名を第3引数に指定
}

// もしタイトル(h1)があれば、Headerコンポーネントを描画する
if (document.querySelectorAll('h1').length) {
  require.ensure([], () => {
    const Header = require('./Components/Header').default;
    new Header().render('h1');
  }, "header");
}
