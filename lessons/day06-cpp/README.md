# Day 6 — C++ ②：関数と参照渡し

> 所要時間 15分 ／ ラウンド2「関数」 ／ 前提: Day 4・Day 5 を終えていること

## 今日のゴール

- 戻り値の型と引数の型を付けて C++ の関数を書ける
- 「値渡し」と「参照渡し（`&`）」の違いを説明できる
- 文字列などを `const std::string&` で受け取る理由がわかる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Rust・Go との違いを表で確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Rust・Go との違い（3分）

| やりたいこと | Rust | Go | C++ |
| --- | --- | --- | --- |
| 関数を定義 | `fn add(a: i32, b: i32) -> i32` | `func add(a, b int) int` | `int add(int a, int b)` |
| 戻り値なし | `fn f()` | `func f()` | `void f()` |
| 変更できる参照を渡す | `&mut x` | ポインタ `*int` | 参照 `int& x` |
| 読むだけの参照を渡す | `&x` | （値渡しかポインタ） | `const int& x` |
| デフォルト引数 | なし | なし | `int rate = 10` |
| 同じ名前で型違いの関数 | なし（トレイトで実現） | なし | オーバーロードできる |

覚えるのは次の 3 点です。

1. **何も付けなければ値渡し（コピー）**。関数の中で引数を変えても、呼び出し元には影響しません。
2. **`&` を付けると参照渡し**。呼び出し元の変数そのものを書き換えられます。Rust の `&mut` に近いですが、呼び出し側で `&` を書かなくてよい点が違います。
3. **大きな値は `const 型&` で受け取る**。コピーを避けつつ、変更もさせない定番の書き方です。Rust の `&`（不変の借用）にあたります。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day06-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) で一番大事なのは次の部分です。

```cpp
void addOneByValue(int x) { x = x + 1; }   // コピーを変更するだけ
void addOneByRef(int& x)  { x = x + 1; }   // 呼び出し元の変数を変更する
```

呼び出す側はどちらも `addOneByValue(n)`、`addOneByRef(n)` と同じ見た目です。Rust のように `&mut n` と書かないので、**関数の宣言を見ないと変更されるかどうかがわからない**点に注意しましょう。

## 3. 演習：ポイントカード（5分）

[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
山田 太郎 さん: 100pt
2,980円のお買い物で 29pt 獲得
山田 太郎 さん: 129pt
山田 太郎 さん: 279pt
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day06-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 6
```

TODO 2 を直す前は、ポイントを足しても `100pt` のままです。値渡しのせいで、関数の中のコピーだけが変わっているからです。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力は？

```cpp
void reset(int x) { x = 0; }
int main() { int a = 5; reset(a); std::cout << a; }
```

<details><summary>答え</summary>

`5` です。`reset` は値渡しなので、コピーが 0 になるだけです。`void reset(int& x)` にすると `0` になります。

</details>

**Q2.** `void print(std::string s)` と `void print(const std::string& s)` の違いは？

<details><summary>答え</summary>

前者は呼び出すたびに文字列がコピーされます。後者はコピーせずに元の文字列を参照し、`const` なので関数の中で変更もできません。読むだけの文字列や `vector` は後者で受け取るのが一般的です。

</details>

**Q3.** `int withTax(int rate = 10, int price)` という宣言はできる？

<details><summary>答え</summary>

できません。デフォルト引数は、後ろの引数から順に付ける必要があります。`int withTax(int price, int rate = 10)` が正しい形です。

</details>

## 日本企業での使われ方

- 組込み系の現場では、関数の引数が「入力」か「出力」かをコメントやコーディング規約で明示することがよくあります（例: 出力用の引数は参照またはポインタで受け取る）。
- 「`std::string` を値渡ししている」「`const` を付け忘れている」は、C++ のコードレビューで最もよく指摘される点の一つです。

## 今日のまとめ

- `戻り値の型 名前(型 引数)`。戻り値がなければ `void`
- 何もなしは値渡し（コピー）、`&` で参照渡し、読むだけなら `const 型&`
- C++ はデフォルト引数とオーバーロードが使える

**次回（Day 7）**：ラウンド3「条件分岐とループ」。JavaScript の `if`・`for...of` と、「truthy / falsy」の考え方です。
