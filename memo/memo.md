# メモ

## 翻訳API（Deepl vs Google翻訳）

- [Deepl API](https://chigusa-web.com/blog/deepl-api/)

  - 無料版
    - 1ヶ月に50万文字まで翻訳が可能
    - 通常のDeeplが使えなくなる（ログアウトすればok）

  - 有料版
    - 制限なし（有料）
    - 優先的に翻訳
    - 基本料金630円 + ご利用文字数分の料金（1文字あたり0.0025円）

- Google 翻訳
  - [Google API](https://translate.google.co.jp/about/forbusiness.html)とpythonのライブラリ[googletrans](https://pypi.org/project/googletrans/)がある
  - googletransを使う
    - 無料
    - 15k文字/1回
    - 参考：https://sig9.org/archives/2448

## エラー関連

- googletrans
  - 最新バージョンでエラー
    - 解決：https://qiita.com/_yushuu/items/83c51e29771530646659
