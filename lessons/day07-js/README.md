# Day 7 — JavaScript ③：条件分岐とループ

> 所要時間 15分 ／ ラウンド3「条件分岐とループ」 ／ 前提: Day 4〜6 を終えていること

## 今日のゴール

- `if`・`for...of`・`for`・`while`・`switch` を書ける
- truthy / falsy（条件として真・偽とみなされる値）を説明できる
- `||` と `??` を使い分けられる

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
| 条件分岐 | `if x > 0:` / `elif` | `if x > 0 { }` / `else if` | `if (x > 0) { }` / `else if` |
| リストを順に | `for x in items:` | `for x in &items { }` | `for (const x of items) { }` |
| 0〜2 を数える | `for i in range(3):` | `for i in 0..3 { }` | `for (let i = 0; i < 3; i++) { }` |
| 多分岐 | `match`（3.10〜） | `match` | `switch`（`break` が必要） |
| 三項演算子 | `a if c else b` | `if c { a } else { b }` | `c ? a : b` |
| 空リストの真偽 | `False` | （bool 以外は条件にできない） | **`true`** |

覚えるのは次の 3 点です。

1. **配列を回すときは `for...of`**。よく似た `for...in` は「キー（添字）」を回すので、配列には使いません。
2. **`switch` は `break` を忘れると次の `case` に落ちる**。Rust の `match` とは別物だと考えましょう。
3. **falsy は `false`・`0`・`""`・`null`・`undefined`・`NaN` だけ**。Python と違い、空の配列 `[]` や文字列 `"0"` は truthy です。

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day07-js/sample.js
```

[sample.js](sample.js) の最後にある `||` と `??` の違いを見てください。

```js
const input = "";
console.log(input || "(未入力)"); // "" は falsy なので (未入力)
console.log(input ?? "(未入力)"); // ?? は null と undefined のときだけ代わりの値 → ""
```

数量の `0` のように「falsy だけど正しい値」を扱うときは、`||` だと `0` が消えてしまいます。そういうときは `??` を使います。

## 3. 演習：テストの成績表（5分）

[exercise.js](exercise.js) の `TODO` を直し、次の出力にします。

```text
佐藤: 92点 → 優
鈴木: 74点 → 良
(名前なし): 65点 → 可
高橋: 48点 → 不可
合格者: 3人
```

```bash
node lessons/day07-js/exercise.js
node check.mjs 7
```

TODO 2 では、`const student = students[0];` と次の `{` の行を `for (const student of students) {` の 1 行に置き換えます。

## 4. 確認クイズ（2分）

**Q1.** `if ([]) { console.log("A"); } else { console.log("B"); }` の出力は？

<details><summary>答え</summary>

`A` です。空の配列は truthy です。配列が空かどうかを調べるときは `if (list.length === 0)` と書きます。

</details>

**Q2.** 在庫数 `stock` が `0` のときも `0` と表示したい。`stock || "不明"` と `stock ?? "不明"` のどちらを使う？

<details><summary>答え</summary>

`stock ?? "不明"` です。`||` だと `0` は falsy なので `"不明"` になってしまいます。`??` は `null` と `undefined` のときだけ右側を使います。

</details>

**Q3.** 次のコードで `"休日"` 以外に何が出力される？

```js
switch ("土") {
  case "土": console.log("休日");
  case "月": console.log("平日");
}
```

<details><summary>答え</summary>

`"平日"` も出力されます。`break` がないので、一致した `case` から下がすべて実行されます（フォールスルー）。ESLint の `no-fallthrough` ルールで検出できます。

</details>

## 日本企業での使われ方

- `if (value)` のような truthy 判定は便利ですが、`0` や空文字を正しく扱えずにバグになることがあります。チームによっては「比較は明示的に書く」ルールにしています。
- TypeScript のプロジェクトでは、`??`（Null 合体演算子）や `?.`（オプショナルチェーン）がとてもよく使われます。

## 今日のまとめ

- 配列は `for...of`、回数指定は `for (let i = 0; ...)`
- `switch` は `break` を忘れない
- 空の配列や `"0"` は truthy。`0` を残したいなら `??`

**次回（Day 8）**：Go の条件分岐とループ。ループは `for` 1 つだけです。
