こちらの内容はあくまで審査に出すための一時的なものです。

本アドオンを適切な管理者（配布者、責任者）のもとに移譲していくための議論をスムーズにするための叩き台として公開しています。

[#2 アドオン公開にあたって記入した情報をまとめる](https://github.com/teramotodaiki/health-observation/issues/2) に本件の議論スレッドがありますので、ご活用ください。

**議論の内容は公開情報であることに御留意ください**

---

# GCP (Google Cloud Platform) プロジェクト

スクリプトをアドオンとして公開するための諸々の手続きに必要。利用した API の従量課金もここに来るのかも？（要調査）ちなみに、スクリプトを書いて動かすだけなら必要ない

- GCP プロジェクト
  - 個人（寺本）の GCP アカウントで作成
  - プロジェクト名 `health-observation`
- 課金アカウント
  - 寺本の課金アカウントを設定（必須だったので）
  - でも、課金されるようなものはなさそう？
- 組織
  - なし

# G Suite Marketplace SDK

アドオンを公開するための SDK（Google 公式）iOS でいう App Store Connect みたいな役割

申請手続きは https://developers.google.com/gsuite/add-ons/how-tos/publishing-editor-addons に沿って進めた

## アプリケーション情報

- アプリケーション名
  - 健康監視ツール
- アプリケーションの説明
  - Google フォームとスプレッドシートを用いて健康監視を行います。このアドオンは回答のスプレッドシートにインストールしてください
- アプリケーションのアイコン
  - 128x128
    - ![](https://lh3.googleusercontent.com/-ufo_V_NAqIs/XkGHuuPJ5ZI/AAAAAAAAYqc/3B6ykjdpPLAa2-p998i4TaXp2ALnJxXOgCLcBGAsYHQ/s400/x128.png)
  - 32x32
    - ![](https://lh3.googleusercontent.com/-UAMtYHsrcSE/XkGHxkdp2UI/AAAAAAAAYqk/7T06Rzc-QwsqAY7EQNkGa4UQe1CwacX-gCLcBGAsYHQ/s72-c/x32.png)
- デベロッパーのウェブサイト
  - https://www.health-monitoring.net/
- デベロッパー名
  - Daiki Teramoto
- デベロッパーのメールアドレス（省略可）
  - 寺本のメールアドレス
- 利用規約の URL
  - https://www.health-monitoring.net/TERMS_OF_USE
- プライバシー ポリシーの URL
  - https://www.health-monitoring.net/PRIVACY_POLICY
- OAuth 2.0 スコープ
  - https://www.googleapis.com/auth/userinfo.email
  - https://www.googleapis.com/auth/userinfo.profile
  - https://www.googleapis.com/auth/script.scriptapp
- Google アナリティクス ID
  - 未指定

## 詳細な説明

```
使い方はこちらを参照してください

https://teramotodaiki.github.io/health-observation/
```

## アプリケーションのバナー

![](https://lh3.googleusercontent.com/-W_MPPhqy4ZA/XkGJvIj0NnI/AAAAAAAAYq8/AksauxhIJN8AOsCSeF7pOqQQpBfb3z11gCLcBGAsYHQ/w220-h140/banner.png)

## スクリーンショット

（テストデータが写っているので掲載略）

## リンクと情報

- 問題の報告用 URL
  - https://github.com/teramotodaiki/health-observation/issues
- インストール後のヒント

```
シートが自動的に作られない場合は再起動してください
```

## リーチ

- カテゴリ
  - 公共事業（他にいいのがなかった）
- リージョン
  - 日本のみ

# OAuth 2.0 クライアント ID

利用者のスプレッドシートにアクセスするためには OAuth 認証を行う必要がある。「〜〜のアクセスを許可しますか？」という表示の、「誰がアクセスしようとしているのか」に当たる。企業名またはサービス名が出るのが一般的。開発者が管理しているドメインが必要

- アプリケーション名
  - 健康監視ツール
- アプリケーションのロゴ
  - ![](https://lh3.googleusercontent.com/pLsD_ekSZcI2TYCeZpiV1a5vzprwpfXyZz-I6ISwbjI_ocOCx3cKI-ls-l-Z35cG-Ks)
- サポートメール
  - 寺本のメールアドレス
- 承認済みドメイン
  - www.health-monitoring.net
- アプリケーション ホームページ リンク
  > 同意画面に表示されます。承認済みドメインでホストされている必要があります。
  - https://www.health-monitoring.net/
- アプリケーション プライバシー ポリシー リンク
  > 同意画面に表示されます。承認済みドメインでホストされている必要があります。
  - https://www.health-monitoring.net/PRIVACY_POLICY
- アプリケーション利用規約 リンク (省略可)
  > 同意画面に表示されます。承認済みドメインでホストされている必要があります。
  - 省略
