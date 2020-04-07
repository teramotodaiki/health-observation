# 健康監視ツール (Health Monitoring Tool)

学校や会社などの組織で簡単に健康監視を行うためのアドオンです。

## 健康監視とは？

ウイルスの感染が確認された場合、その周囲で暮らしていた方を「濃厚接触者」と呼びます。この人たちの多くは非感染者ですが、一般的に１日２回の体温計測や症状の報告が必要とされています。これを「健康監視」と呼びます。健康監視を行うのは、主に自治体、保健所、大企業の産業保健師、大学などです。

現在、健康監視は電話で行われることが一般的です。対象が数人程度であれば担当者が電話をかけまくれば良いのですが、数十〜数百人の濃厚接触者がいた場合は現実的ではありません。そこで、Google フォームを用いて効率的に健康監視を行えるようにしたのが、このアドオンです。

## デモ

本ツールを体験したい方は、 [こちらのフォーム](https://t.co/eNepe7DDGZ?amp=1) をご覧ください。

デモ用ですので、適当なことを書いて送信していただいて構いません。生成された表はフォームに貼ってあるスプレッドシートのリンクからご覧いただけます。

## リンク

- [Privacy policy（プライバシーポリシー）](https://teramotodaiki.github.io/health-observation/PRIVACY_POLICY)
- [Terms of use（利用規約）](https://teramotodaiki.github.io/health-observation/TERMS_OF_USE)

## スクリーンショット

> ダミーデータを用いています

### 入力フォーム

フォームの内容は自由にカスタマイズできます。詳しくは [フォームの作り方](#フォームの作り方) を参照

[![Image from Gyazo](https://i.gyazo.com/78ca77ee2cb2816dfbbc3ec9427fc1bd.png)](https://gyazo.com/78ca77ee2cb2816dfbbc3ec9427fc1bd)

### 日付ごとに並べたシート（自動生成）

[![Image from Gyazo](https://i.gyazo.com/6635b05c61f2eeeb4fcbf6d4353abe6b.png)](https://gyazo.com/6635b05c61f2eeeb4fcbf6d4353abe6b)

### 経過観察開始からの経過日数ごとに並べたシート（自動生成）

[![Image from Gyazo](https://i.gyazo.com/195055d32c834f52bf91ec4ead0ae9e1.png)](https://gyazo.com/195055d32c834f52bf91ec4ead0ae9e1)

## 機能

- Google フォームで送信された内容をもとに、「日付ごと」「経過観察開始からの経過日数ごと」に並べたシートを自動生成します。
- 経過観察期間は **１４日間** とし、それ以上の期間が経過した個人はシートから除外されます。
- 各シートの「備考」欄に書かれた文字は、もう一方のシートにも同期されます。
- 任意の個人識別子を用いることができます。（例：社員番号、メールアドレス、ハンドルネーム）
  - 詳しくは [フォームの作り方](#フォームの作り方) を参照してください
- １日に複数の回答が送信された場合、【重複あり】と表示されます。スプレッドシート上の重複データを直接削除することも可能です。

## 使い方

1. [Google フォーム](https://www.google.com/intl/ja_jp/forms/about/) で調査用のフォームを作成します。詳しくは [フォームの作り方](#フォームの作り方) を参照してください
2. _スプレッドシートの作成_ （または _回答をスプレッドシートに表示_ ）をクリックして、新しいスプレッドシートを作ります。名前はなんでも構いません。
   [![Image from Gyazo](https://i.gyazo.com/fe67df9733dd396f29d5ba12eae0df22.png)](https://gyazo.com/fe67df9733dd396f29d5ba12eae0df22)
3. 画面上部のメニューにある _アドオン_ の _アドオンを取得_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/708130d16eb37deb6fdfab07a9894d08.png)](https://gyazo.com/708130d16eb37deb6fdfab07a9894d08)
4. 検索バーに _健康監視_ と入力して検索します
   [![Image from Gyazo](https://i.gyazo.com/73a44cfeda193b7d200dfa258df438e9.png)](https://gyazo.com/73a44cfeda193b7d200dfa258df438e9)
5. 検索結果に表示された健康監視ツールをクリックします
6. _インストール_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/257e01ebaa9ed03179866657e18d5f2c.png)](https://gyazo.com/257e01ebaa9ed03179866657e18d5f2c)
7. 権限を求められるので、**続行**をクリックします
8. インストールするアカウントを選ぶ画面が表示されるので、フォームを作った時の Google アカウントをクリックします
9. _許可_ をクリックします（画面の下の方に隠れていて見えないことがあります）
10. このように表示されれば、インストールは完了です！🎉 お疲れ様でした！
    [![Image from Gyazo](https://i.gyazo.com/eec98388e4edeaefb6a9f750f03cdbc0.png)](https://gyazo.com/eec98388e4edeaefb6a9f750f03cdbc0)

## 準備ができたら

学生や社員など、対象者にフォームを送信します。Google フォームの _送信_ をクリックすると、メールやリンクなどの方法で配布できます。詳しくは [フォームの配布](#フォームの配布) を参照してください

## フォームの作り方

タイトル、説明文、質問項目など、フォームの内容は自由に決められます。

ただし、 **最初の質問は個人識別子を問う質問にすること。** 個人識別子は、他の人と被らなければ、ランダムな数字などでも構いません。Google フォームの _メールアドレスを収集する_ オプションを用いても構いません。

２問目以降は自由に質問を追加できますが、スプレッドシートの見栄えを考えると、あまり質問を多くすることは推奨されません。現在、特定の質問を表示しないようにすることはできません。

また、質問文の一文字目（e.g. 体温であれば `体` ）がシートに反映されるので、一文字目をユニークにするといいかも知れません。

例： `体温` に `36.7` と回答した場合、フォームには `体:36.7` と表示されます。

## フォームの配布

Google フォームの編集画面の右上にある _送信_ ボタンを押すと、配布方法のメニューが表示されます
[![Image from Gyazo](https://i.gyazo.com/2fedef0720f2b4c86f2650fbb1c08d0c.png)](https://gyazo.com/2fedef0720f2b4c86f2650fbb1c08d0c)

### 個人識別子を事前入力する

個人識別子は、人によっては忘れていたり、打ち間違えてしまう恐れがあります。Google フォームの機能を使うと、フォームの項目をあらかじめ埋めた状態で配布することができます

事前入力を行うには、Google フォームの編集画面でメニューアイコンをクリックし、 _事前入力したリンクを取得_ をクリックします
[![Image from Gyazo](https://i.gyazo.com/258269274d8abd6aaafe5fa7c3f719f3.png)](https://gyazo.com/258269274d8abd6aaafe5fa7c3f719f3)

実際のフォームと全く同じ画面が出てくるので、事前入力したい項目を埋めて、下にある _リンクを取得_ ボタンをクリックします

クリップボードにリンクがコピーされるので、対象者にメール等の手段で送付します。このリンクは何度も使い回すことが出来ます。

## よくある質問

### Q.個人情報が組織外に出てしまうのではありませんか？

A. このツールは、Google のスプレッドシートを利用したもので、スプレッドシートの所有者以外がデータを見ることは一切できません。
また、監視対象者の登録に際しては、個人を識別できない通し番号を等を用い、別途、通し番号と個人との対応表を手元に保有することで、匿名化を行うことができます。

### Q. 観察期間開始のタイミングはどのように決定されますか？

A. 最初に回答があった日を観察期間開始とみなします。

### Q. 発熱を赤くするなど、特定のセルだけ書式を変更できますか？

A. スプレッドシートのカスタム書式設定をご自身で定義できます。

### フォームに回答を送信してもビューが更新されないのですが、どうすればいいですか？

A. 画面上部のメニューバーから、アドオン > 健康監視ツール > ビューを更新する とクリックしていただくと、手動で更新されます。
一度スプレッドシートを閉じてから開き直すと、自動更新が有効化されることがあります。
