# Day 28 — JavaScript ⑩：ミニプロジェクト「ToDo 管理 CLI」

> 所要時間 15分 ／ ラウンド10「ミニプロジェクト」 ／ 前提: Day 25〜27 を終えていること

## 今日のゴール

- コマンドライン引数（`process.argv`）を受け取るツールを作れる
- JSON ファイルにデータを保存し、読み込める
- これまでの「配列・オブジェクト・例外」を組み合わせて、1 つの道具を完成させられる

ラウンド 10 は、各言語で小さな道具を 1 つずつ完成させます。JavaScript は、ターミナルで使う ToDo 管理ツールです。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. 作るものと、使う道具を確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. 作るものと使う道具（3分）

完成すると、次のように使えます。

```bash
node lessons/day28-js/exercise.js add "牛乳を買う"   # 追加しました: #1 牛乳を買う
node lessons/day28-js/exercise.js list              # [ ] #1 牛乳を買う
node lessons/day28-js/exercise.js done 1            # 完了にしました: #1 牛乳を買う
```

データはホームフォルダの `.drill15-todos.json` に保存されるので、ターミナルを閉じても残ります。

| やりたいこと | Python | JavaScript（Node.js） | 復習する日 |
| --- | --- | --- | --- |
| 引数を受け取る | `sys.argv[1:]` | `process.argv.slice(2)` | — |
| ファイルを読む | `open(f).read()` | `fs.readFileSync(f, "utf8")` | — |
| ファイルに書く | `open(f, "w").write(s)` | `fs.writeFileSync(f, s)` | — |
| JSON ↔ データ | `json.loads` / `json.dumps` | `JSON.parse` / `JSON.stringify` | — |
| 検索 | `next(t for t in ts if ...)` | `todos.find((t) => ...)` | Day 10 |
| 最大値 | `max(...)` | `Math.max(...配列)` | Day 10 |
| エラー | `raise` | `throw new Error()` | Day 19 |

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day28-js/sample.js hello 123
```

[sample.js](sample.js) で、JSON の保存と読み込みの流れを確認してください。

```js
fs.writeFileSync(file, JSON.stringify(data, null, 2)); // オブジェクト → 文字列 → ファイル
const loaded = JSON.parse(fs.readFileSync(file, "utf8")); // ファイル → 文字列 → オブジェクト
```

`node:fs` のように `node:` を付けた名前は、Node.js に最初から入っている標準モジュールです。

## 3. 演習：ToDo 管理 CLI（5分）

[exercise.js](exercise.js) の `TODO` 1〜4（4 つの関数）を完成させます。コマンドの振り分け（`run`）や表示（`format`）は完成済みです。

引数なしで実行するとデモが流れ、次の出力になれば完成です。

```text
=== デモ: 新しい ToDo リスト ===
> add 牛乳を買う
追加しました: #1 牛乳を買う
> add 日報を書く
追加しました: #2 日報を書く
> add 経費精算
追加しました: #3 経費精算
> done 2
完了にしました: #2 日報を書く
> done 9
エラー: #9 は見つかりません
> list
[ ] #1 牛乳を買う
[x] #2 日報を書く
[ ] #3 経費精算
残り: 2件
保存ファイルを読み直しても 3 件
```

```bash
node lessons/day28-js/exercise.js
node check.mjs 28
```

答え合わせが通ったら、使い方の例のように引数を付けて、自分の ToDo を登録してみましょう。

## 4. 確認クイズ（2分）

**Q1.** `node exercise.js done 2` のとき、`complete` に渡る `id` の型は？

<details><summary>答え</summary>

文字列の `"2"` です。コマンドライン引数はすべて文字列なので、`t.id === id` と比べると `2 === "2"` で `false` になります。`Number(id)` で数値にしてから比べます。

</details>

**Q2.** `JSON.stringify(todos, null, 2)` の `2` を省略するとどうなる？

<details><summary>答え</summary>

改行やインデントのない 1 行の JSON で保存されます。プログラムから読むだけなら問題ありませんが、人が開いて確認するときに読みにくくなります。

</details>

**Q3.** エラーのときに `process.exitCode = 1` を設定しているのはなぜ？

<details><summary>答え</summary>

呼び出し元（シェルのスクリプトや CI）に「失敗した」と伝えるためです。終了コードが 0 なら成功、0 以外なら失敗というのが、コマンドラインツールの共通のルールです。この教材の `check.mjs` も、不正解のときは終了コード 1 を返しています。

</details>

## 日本企業での使われ方

- 開発チームでは、定型作業（データの変換、リリース前のチェック、レポート作成など）を自動化する小さな CLI ツールを Node.js で書くことがよくあります。
- 設定ファイルやテストデータには JSON がよく使われます。`JSON.parse` と `JSON.stringify` は、フロントエンドでもバックエンドでも毎日使う関数です。

## 今日のまとめ

- 引数は `process.argv.slice(2)`。すべて文字列で届く
- 保存は `JSON.stringify` → `fs.writeFileSync`、読み込みは `fs.readFileSync` → `JSON.parse`
- 失敗したら終了コード 0 以外を返す

**次回（Day 29）**：Go で、JSON を返す Web API サーバーを作ります。
