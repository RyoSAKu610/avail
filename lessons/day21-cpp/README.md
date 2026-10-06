# Day 21 — C++ ⑦：例外と std::optional

> 所要時間 15分 ／ ラウンド7「エラー処理」 ／ 前提: Day 19・Day 20 を終えていること

## 今日のゴール

- `throw` と `try` / `catch` で例外を扱い、種類ごとに `catch` を書き分けられる
- 例外は `const std::exception&` で受け取る理由がわかる
- 「値がないかもしれない」結果を `std::optional` で返せる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Rust・JavaScript・Go との違いを表で確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Rust・JavaScript・Go との違い（3分）

| やりたいこと | Rust | JavaScript | Go | C++ |
| --- | --- | --- | --- | --- |
| 失敗を伝える | `Result` | 例外 | `error` 値 | **例外**（または戻り値） |
| 投げる | `Err(e)` | `throw new Error()` | `return err` | `throw std::runtime_error("...")` |
| 種類ごとに処理 | `match` | `instanceof` | `errors.Is` | `catch (const 型& e)` を並べる |
| メッセージ | `e.to_string()` | `e.message` | `err.Error()` | `e.what()` |
| 値がないかも | `Option<T>` | `undefined` | `v, ok` | `std::optional<T>` |
| 値なし | `None` | `undefined` | `ok == false` | `std::nullopt` |

ラウンド 7 で 3 つの考え方を見てきました。C++ は両方の道具を持っています。

1. **例外は種類ごとに `catch` を並べられる**。上から順に一致するものが選ばれるので、親クラス（`std::exception`）は最後に書きます。
2. **例外は `const 型&` で受け取る**。値で受け取るとコピーが作られ、子クラスの情報が失われることがあります。
3. **「ないかもしれない」は `std::optional`**。Rust の `Option` と同じ考え方です。例外を使うほどでもない「見つからない」などに向いています。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day21-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) の `std::stoi` の 2 つの例に注目してください。

```cpp
std::stoi("abc");                         // invalid_argument 例外
std::cout << std::stoi("12abc") << "\n";  // 12 ← 先頭だけ変換して成功してしまう!
```

`"12abc"` は数値として正しくありませんが、`std::stoi` は先頭の `12` だけを変換して成功します。演習では、2 番目の引数 `pos`（変換できた文字数）を使ってこれを防ぎます。

## 3. 演習：年齢の入力チェック（5分）

Day 19・20 と同じお題に、`std::optional` 版の関数を足しました。[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
"25" → 25歳
"abc" → エラー: 数値ではありません
"-3" → エラー: 範囲外です (0〜150)
"200" → エラー: 範囲外です (0〜150)
"42" → 42歳
OK: 2件 / エラー: 3件
tryParseAge("42"): 42
tryParseAge("abc"): なし
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day21-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 21
```

これでラウンド 7 は終わりです。同じ入力チェックを、JavaScript は例外、Go はエラー値、C++ は例外と `optional` で書きました。

## 4. 確認クイズ（2分）

**Q1.** 次の `catch` の順番の問題点は？

```cpp
try { ... }
catch (const std::exception& e) { ... }
catch (const std::invalid_argument& e) { ... }
```

<details><summary>答え</summary>

`std::invalid_argument` は `std::exception` の子クラスなので、1 つ目の `catch` で必ず捕まり、2 つ目は実行されません。具体的な型を先に、親クラスを後に書きます（g++ は警告を出してくれます）。

</details>

**Q2.** `std::optional<int> x = std::nullopt; int v = *x;` はどうなる？

<details><summary>答え</summary>

未定義動作です。値がないのに `*` で取り出しています。確認してから取り出すか、`x.value()`（値がなければ `std::bad_optional_access` 例外）か `x.value_or(0)` を使います。

</details>

**Q3.** 例外と `std::optional` のどちらを使うか、どう決める？

<details><summary>答え</summary>

「起きてはいけない失敗」や「呼び出し元に理由を伝えたい失敗」は例外、「見つからない」のように普通に起きる結果は `std::optional` が向いています。なお、組込み系やゲーム開発では、性能や安全性の理由で例外そのものを使わない（`-fno-exceptions` でコンパイルする）プロジェクトもあります。

</details>

## 日本企業での使われ方

- 自動車などの組込み系では、例外を禁止するコーディング規約がよくあります。その場合、エラーは戻り値（エラーコードや `optional` など）で返します。プロジェクトの規約を必ず確認しましょう。
- 例外を使うプロジェクトでは、「どの関数がどの例外を投げるか」をコメントやドキュメントに書くのが一般的です。

## 今日のまとめ

- `throw` で投げ、`catch (const 型& e)` で受け取る。具体的な型を先に書く
- メッセージは `e.what()`。`std::stoi` の「先頭だけ変換」に注意
- 「ないかもしれない」は `std::optional`。`std::nullopt` が値なし

**次回（Day 22）**：ラウンド8「その言語らしさ ①」。JavaScript の `Promise` と `async` / `await` です。
