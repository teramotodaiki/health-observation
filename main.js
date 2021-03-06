// スプレッドシート内のシートの名前。これをシートの識別子にする
var sheetNames = {
  dataSource: '', // ここには最も左にあるシートの名前が入る
  dataRemarks: '備考',
  statSpentDays: '経過観察開始からの経過日数ごと',
  statDate: '日付ごと'
};

// 予想される潜伏期間 [日数]
// 健康監視が始まってからこの期間を過ぎた個人のデータは結果から除外する
var incubationPeriod = 14;

/**
 * 最初にこの関数を実行してください。
 */
function PLEASE_RUN_THIS_FUNCTION_AT_FIRST() {
  updateAll();
  registerFormEvent();
}

/**
 * 全てのシートを再描画する
 */
function updateAll() {
  var people = getPeople();
  var remarks = getRemarks();

  renderSpentDays(people, remarks);
  renderDate(people, remarks);
}

/**
 * 経過観察開始からの経過日数シートだけを再描画する
 */
function updateSpentDays() {
  var people = getPeople();
  var remarks = getRemarks();

  renderSpentDays(people, remarks);
}

/**
 * 日付シートだけを再描画する
 */
function updateDate() {
  var people = getPeople();
  var remarks = getRemarks();

  renderDate(people, remarks);
}

/**
 * 1. 備考欄が更新されたら、備考シートにデータのコピーを保存する
 * TODO: データソースが直接変更されたら、全てのシートを再描画する
 *
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 */
function onEdit(e) {
  var value = e.value;
  if (typeof value !== 'string') {
    return; // データが取得できなかった
  }
  var range = e.range;
  var sheet = range.getSheet();
  var name = sheet.getName();
  if (name !== sheetNames.statSpentDays && name !== sheetNames.statDate) {
    return; // 対象のシートではない
  }
  var column = range.getColumn();
  var row = range.getRow();
  var remarkColumn = getColumnByLabel(sheet, '備考'); // 備考欄の位置
  if (column !== remarkColumn || row < 2) {
    return; // 備考欄のセルではない
  }
  var idRange = sheet.getRange(row, 1);
  var id = idRange.getValue();

  updateRemark(id, value);

  // もう一方のシートを更新する
  if (name === sheetNames.statSpentDays) {
    updateDate();
  } else {
    updateSpentDays();
  }
}

/**
 * スプレットシートが開かれた時、トリガーを登録する
 */
function onOpen(e) {
  createMenu(e);
  updateAll();
  registerFormEvent();
}

/**
 * このスクリプトが Add-on としてインストールされたとき、onOpen をコールする
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * フォームが送信されたらシートを更新するように、トリガーを登録する
 */
function registerFormEvent() {
  // すでにトリガーがあればスキップ
  var triggers = ScriptApp.getProjectTriggers().filter(function(trigger) {
    return (
      trigger.getEventType() == ScriptApp.EventType.ON_FORM_SUBMIT &&
      trigger.getHandlerFunction() === 'updateAll'
    );
  });
  if (triggers.length > 0) {
    return;
  }

  // 新しいトリガーを登録する
  var spreadSheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('updateAll')
    .forSpreadsheet(spreadSheet)
    .onFormSubmit()
    .create();
}

/* Person */

/**
 * 最も左にあるシートをデータソースとみなし、そのデータを全て取得する
 * データは個人ごとにグルーピングされ、Person オブジェクトの配列として返す
 */
function getPeople() {
  // 全てのシートを取得する。最も左にあるシートをデータソースとみなし、その名前を取得しておく
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  const dataSource = sheets[0];
  sheetNames.dataSource = dataSource.getName();
  Logger.log(sheetNames.dataSource + 'からデータを取得します');

  // TODO: 例外処理

  var data = dataSource.getDataRange().getValues();

  // １行目のデータからカラムの数とラベルを読み取る
  // ただし、カラム１はタイムスタンプ、カラム２は識別子とみなす
  var labelOfColumns = [];
  for (var column = 2; column < 100; column++) {
    var label = data[0][column];
    if (label) {
      labelOfColumns.push(label);
    } else {
      break;
    }
  }
  Logger.log('カラム：' + labelOfColumns.join());

  const people = {}; // { 識別子: Person } のマップ

  // 2行目以降のデータを個人でグルーピングする
  for (var row = 1; row < data.length; row++) {
    var timestamp = data[row][0]; // タイムスタンプ文字列
    var id = data[row][1]; // 識別子
    var keyValuePairs = zipObject(labelOfColumns, data[row].slice(2)); // フォームに入力された内容のキーバリューペア値

    var current = people[id];
    if (!current) {
      // Person を新しく作ってマップに追加する
      people[id] = createPerson(id, timestamp, keyValuePairs);
    } else {
      // 既存の Person に新しい報告を追加する
      current.reports[timestamp] = keyValuePairs;
    }
  }

  return people;
}

/**
 * 個人のオブジェクトを生成する（GAS には class がない）
 * @param id 識別子（データソースのカラム２）
 * @param timestamp タイムスタンプ文字列（データソースのカラム１）
 * @param keyValuePairs フォームに入力された内容のキーバリューペア値（データソースのカラム３〜）
 * @return 個人を表すオブジェクト
 */
function createPerson(id, timestamp, keyValuePairs) {
  var person = {
    /* 個人を特定する識別子。学籍番号など */
    id: id,
    /* 経過観察が始まった日付（数値） */
    startAt: Date.parse(timestamp),
    /* その他、フォームに入力された内容のキーバリューペア値を、タイムスタンプをキーとしたマップに保管する */
    reports: {}
  };
  person.reports[timestamp] = keyValuePairs;

  return person;
}

/* renderer */

// １日[ms]
var DAY = 24 * 60 * 60 * 1000;

/**
 * 経過観察の日数ごとにシートに表示する
 */
function renderSpentDays(people, remarks) {
  var now = Date.now();

  var sheet = SpreadsheetApp.getActive().getSheetByName(
    sheetNames.statSpentDays
  );
  if (!sheet) {
    // シートがない場合は新しく作る
    sheet = SpreadsheetApp.getActive().insertSheet(sheetNames.statSpentDays);
  }
  sheet.clearContents(); // 一度すべて空にする（書式設定は残す）

  // ヘッダを表示する
  var headers = ['識別子＼経過日'];
  for (var i = 0; i < incubationPeriod; i++) {
    headers.push(i + 1 + '日目'); // １日目〜　表示
  }
  headers.push('備考');
  sheet.appendRow(headers);

  // 現時刻から計算して 14 日前
  var since = now - incubationPeriod * DAY;
  Logger.log(
    new Date(since).toLocaleString() +
      ' より前に健康監視を開始した個人は除外します'
  );

  // それぞれの学生の報告内容を表示
  Object.keys(people).forEach(function(id) {
    var person = people[id];
    if (person.startAt < since) {
      return; // この人の健康監視は終了した
    }

    // 報告を開始してから N 日目の報告を [N] に入れる。あらかじめ空文字で埋めておく
    var row = [];
    for (var i = 0; i < incubationPeriod; i++) {
      row[i] = '';
    }
    var answers = []; // ある日の回答が何件あるかを保持する

    // それぞれの報告をセルに入れる
    Object.keys(person.reports).forEach(function(timestamp) {
      var keyValuePairs = person.reports[timestamp];
      var daysSpent = diffDays(Date.parse(timestamp), person.startAt); // timestamp が startAt から何日経過したか
      var text = Object.keys(keyValuePairs)
        .map(function(key) {
          // キーは最初の一文字だけ表示。キーとバリューは":"区切り、それぞれの項目は改行区切り
          return key.substr(0, 1) + ':' + keyValuePairs[key];
        })
        .join('\n');
      if (!row[daysSpent]) {
        row[daysSpent] = text;
        answers[daysSpent] = 1;
      } else if (answers[daysSpent] === 1) {
        // 既に同日の報告がある場合、改行を２つ入れて付け足す
        row[daysSpent] += '\n\n' + text;
        answers[daysSpent] = 2;
      } else if (answers[daysSpent] === 2) {
        // ３つ以上の回答は【重複あり】と表示する
        row[daysSpent] += '\n【重複あり】';
        answers[daysSpent] = 3;
      }
    });

    row.unshift(id); // 先頭に来る
    row.push(remarks[id] || ''); // 備考欄
    sheet.appendRow(row);
  });
}

/**
 * 日付ごとにシートに表示する
 */
function renderDate(people, remarks) {
  var now = Date.now();

  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetNames.statDate);
  if (!sheet) {
    // シートがない場合は新しく作る
    sheet = SpreadsheetApp.getActive().insertSheet(sheetNames.statDate);
  }
  sheet.clearContents(); // 一度すべて空にする（書式設定は残す）

  // ヘッダを表示する
  var headers = ['識別子＼日付', '備考'];
  for (var i = 0; i < incubationPeriod; i++) {
    var date = new Date(now - i * DAY);
    headers.push(date.getMonth() + 1 + '/' + date.getDate()); // MM/DD
  }

  sheet.appendRow(headers);

  // 現時刻から計算して 14 日前
  var since = now - incubationPeriod * DAY;
  Logger.log(
    new Date(since).toLocaleString() +
      ' より前に健康監視を開始した個人は除外します'
  );

  // それぞれの学生の報告内容を表示
  Object.keys(people).forEach(function(id) {
    var person = people[id];
    Logger.log(person.startAt - since);
    if (person.startAt < since) {
      return; // この人の健康監視は終了した
    }

    // N 日前の報告を row[N + 2] に入れる配列。あらかじめ空文字で埋めておく
    var row = [
      id, // 識別子＼日付のカラム
      remarks[id] || '' // 備考のカラム
    ];
    for (var i = 0; i < incubationPeriod; i++) {
      row.push('');
    }
    var answers = []; // ある日の回答が何件あるかを保持する

    // それぞれの報告をセルに入れる
    Object.keys(person.reports).forEach(function(timestamp) {
      var keyValuePairs = person.reports[timestamp];
      var daysAgo = diffDays(now, Date.parse(timestamp)); // timestamp が何日前のものか
      var index = daysAgo + 2; // [N + 2]
      var text = Object.keys(keyValuePairs)
        .map(function(key) {
          // キーは最初の一文字だけ表示。キーとバリューは":"区切り、それぞれの項目は改行区切り
          return key.substr(0, 1) + ':' + keyValuePairs[key];
        })
        .join('\n');

      if (!row[index]) {
        row[index] = text;
        answers[index] = 1;
      } else if (answers[index] === 1) {
        // 既に同日の報告がある場合、改行を２つ入れて付け足す
        row[index] = text + '\n\n' + text;
        answers[index] = 2;
      } else if (answers[index] === 2) {
        // 3つ以上の回答は【重複あり】と表示する
        row[index] += '\n【重複あり】';
        answers[index] = 3;
      }
    });

    sheet.appendRow(row);
  });
}

/* remark */

/**
 * 「備考」シートのデータを全て取得する
 * 返されるオブジェクトは ID と備考文字列のキーバリューペア
 */
function getRemarks() {
  var dataRemark = SpreadsheetApp.getActive().getSheetByName(
    sheetNames.dataRemarks
  );
  if (!dataRemark) {
    return {};
  }
  var remarks = {};
  var rows = dataRemark.getDataRange().getValues();
  for (var i = 0; i < rows.length; i++) {
    var id = rows[i][0];
    var remark = rows[i][1];
    remarks[id] = remark;
  }
  return remarks;
}

function testUpdateRemark() {
  updateRemark(1004, 'テストです');
}

/**
 * 備考欄が更新されたら、シート「備考」にコピーする
 * @param id 識別子
 * @param value 備考の文字列
 */
function updateRemark(id, value) {
  var dataRemark = SpreadsheetApp.getActive().getSheetByName(
    sheetNames.dataRemarks
  );
  if (!dataRemark) {
    // シートがなければ作る。フォーム、２つのビュー、の後に挿入する
    dataRemark = SpreadsheetApp.getActive().insertSheet(
      sheetNames.dataRemarks,
      3
    );
  }
  var idRows = dataRemark.getRange('A:A').getValues();

  // ID が存在していたら、その行の２列目のセルを上書きする
  for (var i = 0; i < idRows.length; i++) {
    // ID は文字列として比較する
    var currentId = idRows[i][0] + '';
    if (currentId === id + '') {
      var remarkRange = dataRemark.getRange(i + 1, 2);
      remarkRange.setValue(value);
      return;
    }
  }

  // ID が存在しなければ、新しい行を追加する
  dataRemark.appendRow([id, value]);
}

/* utils */

/**
 * Same function to zipObjet of lodash.
 * https://lodash.com/docs/4.17.15#zipObject
 */
function zipObject(keys, values) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i] + ''] = values[i];
  }
  return obj;
}

/**
 * ふたつの Unix エポック[ミリ秒]が、何日離れているかを求める
 * 現在のタイムゾーンで 0:00am を基準として整数値を返す
 */
function diffDays(time1, time2) {
  var date1 = new Date(time1);
  var date2 = new Date(time2);
  var diff =
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) -
    new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor(diff / DAY);
}

/**
 * カラムのラベルを受け取って、そのカラムが何列目にあるのかを返す
 * @param sheet 対象のシート
 * @param label ラベル名
 */
function getColumnByLabel(sheet, label) {
  // 最初の一行目を全て取得する
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var row = range.getValues()[0];
  for (var i = 0; i < row.length; i++) {
    if (row[i] === label) {
      return i + 1; // [0] が column=1 に相当する
    }
  }
  return null; // ラベルが存在しない
}

/**
 * デバッグ用のメニューを作る
 */
function createMenu(e) {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('ビューを更新する', 'updateAll');
  menu.addToUi();
}
