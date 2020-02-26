# health-observation

学校や会社などの組織で簡単に健康監視を行うためのアドオンです。

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

## 準備 ① 　フォームを作成する

1. [Google フォーム](https://www.google.com/intl/ja_jp/forms/about/) で調査用のフォームを作成します。詳しくは [フォームの作り方](#フォームの作り方) を参照してください
2. _スプレッドシートの作成_ （または _回答をスプレッドシートに表示_ ）をクリックして、新しいスプレッドシートを作ります。名前はなんでも構いません。
   [![Image from Gyazo](https://i.gyazo.com/fe67df9733dd396f29d5ba12eae0df22.png)](https://gyazo.com/fe67df9733dd396f29d5ba12eae0df22)
3. これでフォームの作成は完了です。今すぐ健康監視を始める場合は、次の章を進めてください

## 準備 ② 　スクリプトを適用する

> 現在アドオンの公開審査中につき、Google 公式ストアからのインストールは出来ません。２０２０年３月以降に導入予定の方は、アドオンの公開をお待ちください
>
> それまでにご利用いただきたい場合、次の手順にそってスクリプトを適用してください。 **本プロジェクトのソースコードは全て一般公開されています** ので、誰でもご利用いただけます

1. 先ほど作成した回答のスプレッドシートを開きます
1. _ツール_ → _スクリプトエディタ_ をクリックします。すると、 _無題のプロジェクト_ という名前の編集画面が表示されます
   [![Image from Gyazo](https://i.gyazo.com/a228eb33aa745a804c63dc280a669898.png)](https://gyazo.com/a228eb33aa745a804c63dc280a669898)
   [![Image from Gyazo](https://i.gyazo.com/fbf55e32d5fb07202f760e199e32a7cf.png)](https://gyazo.com/fbf55e32d5fb07202f760e199e32a7cf)
1. `コード.gs` の中に書いてある文字 `function myFuncion () { }` を、全て消してください
   [![Image from Gyazo](https://i.gyazo.com/f3c5fad98ff2a20bbebeb1d3c88bd4d5.png)](https://gyazo.com/f3c5fad98ff2a20bbebeb1d3c88bd4d5)
   このように、入力欄を空にしてください
1. 次に [こちらのリンクをクリック](https://teramotodaiki.github.io/health-observation/copy-the-script) して、 _スクリプトをコピー_ して下さい
1. コピーした文章を、先ほど消したところにを貼り付けます。１行目あたりを **右クリック** して _貼り付け_ を押してください
   [![Image from Gyazo](https://i.gyazo.com/c7d4b30546797935a056e5382c4a4411.png)](https://gyazo.com/c7d4b30546797935a056e5382c4a4411)
1. このようになれば OK です（細かい内容は違っているかも知れません）
   [![Image from Gyazo](https://i.gyazo.com/e7656febd64d58312dbc85705780367f.png)](https://gyazo.com/e7656febd64d58312dbc85705780367f)
1. 保存ボタン（フロッピーディスクのアイコン）をクリックします
   [![Image from Gyazo](https://i.gyazo.com/a491941f3fa68d226330c1f3215a6ba7.png)](https://gyazo.com/a491941f3fa68d226330c1f3215a6ba7)
1. このような表示が出てくるので、好きな名前をつけて _OK_ をクリックします。 _無題のプロジェクト_ のままでも構いません
   [![Image from Gyazo](https://i.gyazo.com/85457b6769b4f498b32f43a4d7cdebf9.png)](https://gyazo.com/85457b6769b4f498b32f43a4d7cdebf9)
1. _関数を選択_ → _PLEASE_RUN_THIS_FUNCTION_AT_FIRST_ を選択します
   [![Image from Gyazo](https://i.gyazo.com/cfc4a12557d930ac13a5a28f5df8db19.png)](https://gyazo.com/cfc4a12557d930ac13a5a28f5df8db19)
1. 再生ボタンを押して、スクリプトを実行します
   [![Image from Gyazo](https://i.gyazo.com/10e48ffa96f837f3e7938f7e6db4337b.png)](https://gyazo.com/10e48ffa96f837f3e7938f7e6db4337b)
1. このような表示が出てくるので、 _許可を確認_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/bb5784696ab3050de4cd8084085bbcfd.png)](https://gyazo.com/bb5784696ab3050de4cd8084085bbcfd)
1. このような表示が出てくるので、 _詳細_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/326bcceffcbffb199cfeb18dd034168b.png)](https://gyazo.com/326bcceffcbffb199cfeb18dd034168b)
1. このような表示が出てくるので、 _【先ほど付けた名前】（安全ではないページ）に移動_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/9df67a3fd55879d0d1ddc67ccde71296.png)](https://gyazo.com/9df67a3fd55879d0d1ddc67ccde71296)
1. このような表示が出てくるので、 _許可_ をクリックします
   [![Image from Gyazo](https://i.gyazo.com/6fa2f90913226edf4d4921fb59a30333.png)](https://gyazo.com/6fa2f90913226edf4d4921fb59a30333)
1. 元のページに戻るので、もう一度再生ボタンを押して、スクリプトを実行します
   [![Image from Gyazo](https://i.gyazo.com/10e48ffa96f837f3e7938f7e6db4337b.png)](https://gyazo.com/10e48ffa96f837f3e7938f7e6db4337b)
1. ボタンを押してから数秒後に、スプレッドシートの方に「経過観察開始からの経過日数ごと」「日付ごと」の２つのシートが生成されます。これでセットアップは完了です 🎉 お疲れ様でした！

## 準備ができたら

学生や社員など、対象者にフォームを送信します。Google フォームの _送信_ をクリックすると、メールやリンクなどの方法で配布できます。詳しくは [フォームの配布](#フォームの配布) を参照してください

## フォームの作り方

タイトル、説明文、質問項目など、フォームの内容は自由に決められます。

ただし、 **最初の質問は個人識別子を問う質問にすること。** 個人識別子とは、たとえば「社員番号」「メールアドレス」などです。Google フォームの _メールアドレスを収集する_ オプションを用いても構いません。

２問目以降は自由に質問を追加できますが、スプレッドシートの見栄えを考えると、あまり質問を多くすることは推奨されません。現在、特定の質問を表示しないようにすることはできません。

また、質問文の一文字目（e.g. 体温であれば `体` ）がシートに反映されるので、一文字目をユニークにするといいかも知れません。

例： `体温` に `36.7` と回答した場合、フォームには `体:36.7` と表示されます。

## フォームの配布

Google フォームの編集画面の右上にある _送信_ ボタンを押すと、配布方法のメニューが表示されます
[![Image from Gyazo](https://i.gyazo.com/2fedef0720f2b4c86f2650fbb1c08d0c.png)](https://gyazo.com/2fedef0720f2b4c86f2650fbb1c08d0c)

### 個人識別子を事前入力する

社員番号やメールアドレスなどの個人識別子は、人によっては忘れていたり、打ち間違えてしまう恐れがあります。Google フォームの機能を使うと、フォームの項目をあらかじめ埋めた状態で配布することができます

事前入力を行うには、Google フォームの編集画面でメニューアイコンをクリックし、 _事前入力したリンクを取得_ をクリックします
[![Image from Gyazo](https://i.gyazo.com/258269274d8abd6aaafe5fa7c3f719f3.png)](https://gyazo.com/258269274d8abd6aaafe5fa7c3f719f3)

実際のフォームと全く同じ画面が出てくるので、事前入力したい項目を埋めて、下にある _リンクを取得_ ボタンをクリックします

クリップボードにリンクがコピーされるので、対象者にメール等の手段で送付します。このリンクは何度も使い回すことが出来ます。

## その他

### 観察期間開始のタイミングはどのように決定されますか？

最初に回答があった日を観察期間開始とみなします。

### 発熱を赤くするなど、特定のセルだけ書式を変更できますか？

スプレッドシートのカスタム書式設定をご自身で定義できます。現在、このアドオンでは標準サポートしていません。
