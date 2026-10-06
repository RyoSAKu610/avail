# Day 15 — C++ ⑤：std::map・std::string と UTF-8

> 所要時間 15分 ／ ラウンド5「辞書と文字列（日本語の扱い）」 ／ 前提: Day 13・Day 14 を終えていること

## 今日のゴール

- `std::map` と `std::unordered_map` を使い分けられる
- `map[key]` で読むと要素が作られてしまう落とし穴を説明できる
- `std::string` が UTF-8 のバイト列であることを理解し、文字数を数えられる

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
| 辞書 | `new Map()` | `map[string]int{}` | `std::map<std::string, int>` |
| ループの順番 | 追加順 | ランダム | `map` は**キー順**、`unordered_map` は不定 |
| ないキーを読む | `undefined` | ゼロ値 | `m[k]` は**ゼロ値で要素を作る** |
| あるか調べる | `m.has(k)` | `_, ok := m[k]` | `m.count(k)` / `m.find(k)` |
| キーと値を取り出す | `for (const [k, v] of m)` | `for k, v := range m` | `for (const auto& [k, v] : m)` |
| 文字列の長さ | UTF-16 単位 | バイト数 | バイト数（`size()`） |

覚えるのは次の 3 点です。

1. **`std::map` はキー順に並ぶ**。Go のように自分で並べ替える必要はありません。順番が要らず速さが欲しいときは `std::unordered_map` を使います。
2. **`m[k]` で読むと、ないキーが作られる**。調べるだけなら `count` か `find`、ないキーで例外にしたいなら `at` を使います。
3. **`std::string` は UTF-8 のバイト列**。Go と同じく `size()` はバイト数です。標準ライブラリには「文字数を数える」関数がないので、自分で数えるかライブラリを使います。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day15-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) の 2 番目の部分を見てください。

```cpp
std::cout << stock["メロン"] << "\n";  // 0 (しかも "メロン" が追加される!)
std::cout << stock.size() << "\n";     // 4
```

表示しただけのつもりでも、`map` に「メロン: 0」が追加されています。`const` な `map` では `[]` が使えない（コンパイルエラーになる）のも、このためです。

## 3. 演習：注文の集計と文字数チェック（5分）

Day 13・14 と同じお題です。[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
ぶどう: 1
みかん: 2
りんご: 3
種類: 3
名前: 山田太郎 (4文字 / 12バイト)
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day15-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 15
```

TODO 3 の `countChars` は、UTF-8 の仕組みを使います。漢字「山」は 3 バイトで `11100101 10110001 10110001` のように表され、2 バイト目以降は必ず `10` で始まります。`10` で始まらないバイトを数えれば、文字数になります。

## 4. 確認クイズ（2分）

**Q1.** `std::map<std::string, int> m; if (m["a"] == 0) {}` のあと、`m.size()` は？

<details><summary>答え</summary>

`1` です。比較のために `m["a"]` を読んだ時点で、`"a": 0` が作られています。存在チェックは `m.count("a")` や `m.find("a") != m.end()` で行います（C++20 からは `m.contains("a")` も使えます）。

</details>

**Q2.** `std::map` と `std::unordered_map` の使い分けは？

<details><summary>答え</summary>

キーの順に取り出したいときは `std::map`（内部は木構造）、順番が不要で検索の速さが欲しいときは `std::unordered_map`（内部はハッシュ表）を使います。Python の `dict` や Rust の `HashMap` に近いのは `unordered_map` です。

</details>

**Q3.** `std::string s = "日本"; s.substr(0, 1)` を表示するとどうなる？

<details><summary>答え</summary>

1 バイト目だけが取り出されるので、文字化けします（何も表示されないか、`?` などになります）。「日」は 3 バイトなので、`s.substr(0, 3)` で「日」になります。

</details>

## 日本企業での使われ方

- 古い C++ のシステムでは、日本語を Shift_JIS や EUC-JP という UTF-8 以前の文字コードで扱っていることがあります。文字コードの変換は、日本の現場で今でもよく出てくる作業です。
- Windows 向けのソフトでは `std::wstring`（ワイド文字列）が使われていることもあります。文字列の型がプロジェクトごとに違うことがあるので、最初に確認しましょう。

## 今日のまとめ

- `std::map` はキー順、`std::unordered_map` は順不同で速い
- `m[k]` で読むと要素が作られる。調べるだけなら `count` / `find`
- `std::string` は UTF-8 のバイト列。`size()` はバイト数

**次回（Day 16）**：ラウンド6「型を作る」。JavaScript の `class` で銀行口座を作ります。
