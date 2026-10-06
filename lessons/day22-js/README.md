# Day 22 — JavaScript ⑧：Promise と async / await

> 所要時間 15分 ／ ラウンド8「その言語らしさ ①」 ／ 前提: Day 19〜21 を終えていること

## 今日のゴール

- JavaScript が「待たずに次へ進む」言語であることを説明できる
- `async` 関数の中で `await` を使い、通信などの結果を待てる
- `Promise.all` で複数の処理を同時に進められる

ラウンド 8 は、それぞれの言語が得意なことを 1 つずつ学びます。JavaScript は**非同期処理**です。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust との違い（3分）

| やりたいこと | Python | Rust | JavaScript |
| --- | --- | --- | --- |
| あとで届く結果 | `Coroutine` / `Future` | `Future` | `Promise` |
| 非同期関数 | `async def f():` | `async fn f()` | `async function f() { }` |
| 結果を待つ | `await f()` | `f().await` | `await f()` |
| まとめて待つ | `asyncio.gather(...)` | `join!(...)` | `Promise.all([...])` |
| 実行する仕組み | `asyncio.run()` が必要 | tokio などが必要 | **最初から組み込み** |
| 失敗 | 例外 | `Result` | `reject` → `await` で例外になる |

覚えるのは次の 3 点です。

1. **JavaScript は待たずに次の行へ進む**。通信やタイマーの結果は `Promise`（あとで結果が届く約束）として返ってきます。
2. **`await` は `async` 関数の中で使う**。`await` を付け忘れると、結果ではなく `Promise` そのものが変数に入ります。
3. **独立した処理は `Promise.all` で同時に**。1 つずつ `await` すると、待ち時間が足し算になってしまいます。

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day22-js/sample.js
```

[sample.js](sample.js) の最初の部分で、出力の順番を確認してください。

```js
console.log("1. 開始");
delay(100).then(() => console.log("3. 100ms 後に届いた"));
console.log("2. 先にこちらが出る");
```

`delay(100)` を呼んでも 100ms 止まることはなく、すぐ次の行に進みます。ブラウザでは、待っている間も画面の操作を受け付けるために、この仕組みが使われています。

## 3. 演習：注文 API からデータを取る（5分）

[exercise.js](exercise.js) の `TODO` を直し、次の出力にします。

```text
注文 #1 を取得中...
注文 #1: コーヒー 500円
3件まとめて取得: コーヒー, ケーキ, サンド
合計: 1650円
注文 #9: エラー (注文 #9 は存在しません)
```

```bash
node lessons/day22-js/exercise.js
node check.mjs 22
```

直す前は `注文 #1: undefined undefined円` と表示されます。`await` がないので、`order` に注文ではなく `Promise` が入っているためです。

## 4. 確認クイズ（2分）

**Q1.** `async function f() { return 1; }` の `f()` の戻り値は？

<details><summary>答え</summary>

`1` ではなく、`1` で解決される `Promise` です。`async` 関数は必ず `Promise` を返します。中身を使うには `await f()` か `f().then(...)` と書きます。

</details>

**Q2.** 次の 2 つは、それぞれ約何ミリ秒かかる？（`delay(100)` は 100ms 待つ）

```js
await delay(100); await delay(100); await delay(100);           // (A)
await Promise.all([delay(100), delay(100), delay(100)]);         // (B)
```

<details><summary>答え</summary>

(A) は約 300ms、(B) は約 100ms です。(A) は 1 つ終わってから次を始めますが、(B) は 3 つを同時に始めて全部そろうのを待ちます。

</details>

**Q3.** `Promise.all` に渡した中の 1 つが reject されると？

<details><summary>答え</summary>

`Promise.all` 全体がすぐに reject され、`await` している場所で例外になります。一部が失敗しても全部の結果が欲しいときは `Promise.allSettled` を使います。

</details>

## 日本企業での使われ方

- フロントエンドでは、画面を表示したあとにサーバーの API からデータを取ってくる処理（`await fetch(...)`）が必ず出てきます。読み込み中の表示やエラー表示とセットで実装します。
- Node.js のバックエンドでは、データベースへの問い合わせもほとんどが `async` / `await` で書かれます。`await` の付け忘れは典型的なバグなので、ESLint や TypeScript の設定で検出するチームが多いです。

## 今日のまとめ

- JavaScript は待たずに次へ進み、時間のかかる処理は `Promise` を返す
- `async` 関数の中で `await` すると、結果が届くまで待てる。失敗は `try` / `catch`
- 独立した処理は `Promise.all` で同時に進める

**次回（Day 23）**：Go の goroutine と channel。Go が得意な「並行処理」です。
