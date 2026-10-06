# Day 12 — C++ ④：std::vector と <algorithm>

> 所要時間 15分 ／ ラウンド4「配列とリスト」 ／ 前提: Day 10・Day 11 を終えていること

## 今日のゴール

- `std::vector` の作成・追加・長さ・要素アクセスができる
- `<algorithm>` の関数に `begin()` と `end()` を渡して使える
- ラムダ式 `[](int n) { ... }` を読み書きできる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. JavaScript・Go との違いを表で確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. JavaScript・Go との違い（3分）

| やりたいこと | JavaScript | Go | C++ |
| --- | --- | --- | --- |
| 作る | `[3, 1, 2]` | `[]int{3, 1, 2}` | `std::vector<int> v = {3, 1, 2};` |
| 追加 | `xs.push(4)` | `xs = append(xs, 4)` | `v.push_back(4);` |
| 長さ | `xs.length` | `len(xs)` | `v.size()` |
| 範囲外アクセス | `undefined` | panic（実行時エラー） | `v[i]` は**未定義動作**、`v.at(i)` は例外 |
| 合計 | `reduce` | `for` で足す | `std::accumulate(v.begin(), v.end(), 0)` |
| 並べ替え | `xs.sort((a, b) => a - b)` | `slices.Sort(xs)` | `std::sort(v.begin(), v.end())` |
| 代入 `b = a` | 同じ配列を指す | 同じメモリを共有 | **まるごとコピー** |
| 無名関数 | `(n) => n * 2` | `func(n int) int { ... }` | `[](int n) { return n * 2; }` |

覚えるのは次の 3 点です。

1. **`<algorithm>` の関数は「範囲」を受け取る**。`std::sort(v.begin(), v.end())` のように、始まりと終わりの位置（イテレータ）を渡します。
2. **`v[i]` は範囲チェックをしない**。範囲外を読むと未定義動作です。不安なときは `v.at(i)` を使います。
3. **`vector` の代入はコピー**。Go のスライスや JavaScript の配列と違い、`b = a` で中身がまるごと複製されます。Rust の `.clone()` を自動でやっているイメージです。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day12-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) のラムダ式と `count_if` の組み合わせを見てください。

```cpp
auto isBig = [](int n) { return n >= 3; };
long big = std::count_if(nums.begin(), nums.end(), isBig);
```

`[]` はラムダ式の目印です。`[]` の中には、外の変数をどう取り込むか（キャプチャ）を書きます。Rust のクロージャ `|n| n >= 3` と同じ役割です。

## 3. 演習：売上データの集計（5分）

Day 10・11 と同じお題です。[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
売上: 1200, 800, 3000, 450, 2200
1000円以上: 1200, 3000, 2200
税込: 1320, 880, 3300, 495, 2420
合計: 7650円
最大: 3000円
昇順: 450, 800, 1200, 2200, 3000
元の順番: 1200, 800, 3000, 450, 2200
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day12-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 12
```

`sales` は `const` なので、`std::sort(sales.begin(), sales.end())` と書くとコンパイルエラーになります。コピーしてから並べ替えましょう。

これでラウンド 4 は終わりです。同じ処理を JavaScript はメソッドの連結で、Go は `for` ループで、C++ は `<algorithm>` で書きました。

## 4. 確認クイズ（2分）

**Q1.** `std::vector<int> a = {1, 2}; std::vector<int> b = a; b[0] = 9;` のあと、`a[0]` はいくつ？

<details><summary>答え</summary>

`1` です。`b = a` でコピーが作られるので、`b` を変えても `a` は変わりません。Day 11 の Go のスライスとは逆の結果です。

</details>

**Q2.** `std::max_element(v.begin(), v.end())` の戻り値をそのまま `int` に代入できない理由は？

<details><summary>答え</summary>

戻り値は値ではなく「最大の要素の位置（イテレータ）」だからです。`*` を付けて `*std::max_element(...)` とすると値を取り出せます。空の `vector` では `end()` が返るので、`*` を付けると未定義動作になる点にも注意しましょう。

</details>

**Q3.** `v.size()` の型は何？ `for (int i = 0; i < v.size(); i++)` で警告が出ることがあるのはなぜ？

<details><summary>答え</summary>

`size_t` という符号なし整数型です。`int`（符号あり）と比べると `-Wall` で `comparison of integer expressions of different signedness` という警告が出ます。演習の `join` 関数のように `size_t i` を使うか、範囲 `for` を使います。

</details>

## 日本企業での使われ方

- C++ の採用面接やコーディングテストでは、`std::vector`・`std::sort`・`std::map` などの標準ライブラリ（STL）を使いこなせるかがよく見られます。
- 古いコードでは独自の配列クラスや C の配列（`int a[10]`）が使われていることもあります。新しく書くなら `std::vector` が基本です。

## 今日のまとめ

- `std::vector<T>` が基本の可変長配列。追加は `push_back`
- `<algorithm>` は `begin()` と `end()` を渡す。ラムダ式で条件を渡せる
- `vector` の代入はコピー。`[]` は範囲チェックなし

**次回（Day 13）**：ラウンド5「辞書と文字列」。JavaScript のオブジェクト・`Map` と、日本語の文字列の扱いです。
