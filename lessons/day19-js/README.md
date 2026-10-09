# Day 19 — JavaScript ⑦：try・catch・throw

> 所要時間 15分 ／ ラウンド7「エラー処理」 ／ 前提: Day 16〜18 を終えていること

## 今日のゴール

- `throw` でエラーを投げ、`try` / `catch` / `finally` で受け止められる
- `Error` を継承して自分のエラーの種類を作り、`instanceof` で見分けられる
- 「想定外のエラーは握りつぶさずに投げ直す」理由を説明できる

ラウンド 7 は、3 言語とも同じ「年齢の入力チェック」を作ります。言語によってエラーの扱い方が大きく違うラウンドです。

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
| エラーを起こす | `raise ValueError("...")` | `return Err(...)` | `throw new Error("...")` |
| 受け止める | `try:` / `except E as e:` | `match` / `?` | `try { } catch (err) { }` |
| 種類で分ける | `except ValueError:` | `match` のパターン | `if (err instanceof Foo)` |
| 必ず実行 | `finally:` | `Drop` | `finally { }` |
| 失敗が型でわかるか | わからない | `Result` でわかる | **わからない** |

覚えるのは次の 3 点です。

1. **仕組みは Python の例外とほぼ同じ**。ただし `catch` は種類ごとに分けて書けないので、`instanceof` で見分けます。
2. **関数の宣言を見ても、throw するかどうかはわからない**。Rust の `Result` のように型で表されないので、ドキュメントやコメントで伝えます。
3. **想定外のエラーは投げ直す**。`catch` で何でも受け止めて何もしないと、本当のバグが隠れてしまいます。

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day19-js/sample.js
```

[sample.js](sample.js) の最後の部分は大事な注意点です。

```js
console.log(Number("abc"));        // NaN (エラーにはならない!)
```

JavaScript は、失敗しても例外を投げずに `NaN` や `undefined` を返す関数が多い言語です。「エラーにならなかったから成功」とは限らないので、結果を自分でチェックします。

## 3. 演習：年齢の入力チェック（5分）

[exercise.js](exercise.js) の `TODO` を直し、次の出力にします。

```text
"25" → 25歳
"abc" → エラー: 数値ではありません
"-3" → エラー: 範囲外です (0〜150)
"200" → エラー: 範囲外です (0〜150)
"42" → 42歳
OK: 2件 / エラー: 3件
```

```bash
node lessons/day19-js/exercise.js
node check.mjs 19
```

直す前は `"abc" → NaN歳` と表示されます。エラーにならずにおかしな値が通ってしまう、という JavaScript の性質がよくわかります。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力の順番は？

```js
try {
  console.log("A");
  throw new Error("x");
} catch (e) {
  console.log("B");
} finally {
  console.log("C");
}
```

<details><summary>答え</summary>

`A`、`B`、`C` の順です。`throw` のあとは `catch` に移り、最後に必ず `finally` が実行されます。

</details>

**Q2.** `catch (err) { }`（中身が空）のように書くと、何が問題？

<details><summary>答え</summary>

エラーが起きたことが誰にもわからなくなります（エラーの握りつぶし）。少なくともログに出すか、処理できないエラーは `throw err;` で投げ直します。コードレビューでとてもよく指摘される点です。

</details>

**Q3.** `throw "エラー"` のように文字列を投げるのはよい書き方？

<details><summary>答え</summary>

よくありません。文字列にはエラーの発生場所（スタックトレース）が含まれず、`instanceof` で種類を見分けることもできません。必ず `new Error(...)` かその子クラスを投げます。

</details>

## 日本企業での使われ方

- 業務システムでは「入力チェック（バリデーション）」のエラーと「システムの障害」を分けて扱うのが基本です。前者は画面にメッセージを出し、後者はログに記録して運用担当に知らせます。今日のように、エラーの種類をクラスで分けておくと処理しやすくなります。
- 画面に出すエラーメッセージの文言は、仕様書で決められていることがよくあります。

## 今日のまとめ

- `throw new Error()` で投げ、`try` / `catch` / `finally` で受け止める
- エラーの種類は `class 〇〇Error extends Error` で作り、`instanceof` で見分ける
- 想定外のエラーは投げ直す。`NaN` のような「エラーにならない失敗」にも注意

**次回（Day 20）**：Go のエラー処理。例外がなく、エラーを「値」として返します。
