# Day 30 — C++ ⑩：ミニプロジェクト「CSV の成績集計ツール」

> 所要時間 15分 ／ ラウンド10「ミニプロジェクト」 ／ 前提: Day 28・Day 29 を終えていること

## 今日のゴール

- `std::ifstream` と `std::getline` でファイルを 1 行ずつ読める
- 区切り文字で文字列を分割し、数値に変換できる
- おかしな行があっても止まらずに処理を続けるツールを作れる

最終日です。C++ で、CSV ファイルを読み込んで集計するツールを完成させます。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. 作るものと、使う道具を確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズと 30 日の振り返り |

## 1. 作るものと使う道具（3分）

[scores.csv](scores.csv) を読み込みます。5 行目の田中さんは国語の点数が空欄です。このような「壊れた行」は飛ばして処理を続けます。

```text
名前,国語,数学,英語
佐藤,78,92,85
鈴木,65,58,72
高橋,90,88,95
田中,,70,80
```

| やりたいこと | Python | Go | C++ | 復習する日 |
| --- | --- | --- | --- | --- |
| ファイルを 1 行ずつ | `for line in open(f):` | `bufio.Scanner` | `std::getline(in, line)` | — |
| 区切って分ける | `line.split(",")` | `strings.Split` | `std::getline(ss, field, ',')` | Day 15 |
| 文字列 → 数値 | `int(s)` | `strconv.Atoi` | `std::stoi(s)` | Day 21 |
| 失敗したら「なし」 | `None` | `ok` / `err` | `std::optional` | Day 21 |
| 閉じる | `with` | `defer f.Close()` | スコープを抜けると自動（RAII） | Day 27 |

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day30-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) の `std::getline` の 2 通りの使い方を見てください。

```cpp
while (std::getline(in, line)) { ... }   // ファイルから 1 行ずつ
std::getline(ss, name, ',');             // 文字列から「,」までを 1 項目
```

ファイルは `std::ofstream` / `std::ifstream` が消えるときに自動で閉じられます。Day 27 で学んだ RAII が、標準ライブラリでも使われています。

## 3. 演習：CSV の成績集計ツール（5分）

[exercise.cpp](exercise.cpp) の `TODO` 1〜4 を完成させ、次の出力にします。

```text
読み込み: scores.csv
佐藤: 合計 255 / 平均 85.0
鈴木: 合計 195 / 平均 65.0
高橋: 合計 273 / 平均 91.0
スキップ: 5行目 (田中,,70,80)
--- 科目ごとの平均 ---
国語: 77.7
数学: 79.3
英語: 84.0
最高合計: 高橋 (273点)
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day30-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 30
```

直す前は、`split` が行を分割しないので、すべての行が「スキップ」になります。TODO 1 を解くと田中さん以外が表示され、TODO 2 で空欄の行だけが正しく飛ばされます。

## 4. 確認クイズ（2分）

**Q1.** `split("田中,,70,80", ',')` の結果は何個の要素になる？

<details><summary>答え</summary>

4 個です（`"田中"`・`""`・`"70"`・`"80"`）。カンマとカンマの間の空文字も 1 項目として数えられます。その空文字を `std::stoi` に渡すと例外になるので、`parseRow` で `std::nullopt` を返して飛ばします。

</details>

**Q2.** おかしな行があったとき、プログラム全体を止めずに「スキップ」して続けるのはなぜ？

<details><summary>答え</summary>

実務のデータには、入力ミスや欠けた値が必ずといってよいほど混ざっているからです。1 行の不備で全体が止まると困るので、問題のある行を記録して飛ばし、あとで確認できるようにするのが一般的です。逆に、1 行でも不備があれば全体を中止すべき処理（お金の計算など）もあるので、仕様に合わせて決めます。

</details>

**Q3.** 日本の現場で CSV を扱うときに、文字コードで注意することは？

<details><summary>答え</summary>

Excel で保存した CSV は、Shift_JIS（日本語版 Windows の古い標準の文字コード）になっていることがよくあります。UTF-8 だと思って読むと文字化けします。どの文字コードで受け渡すかを、最初に取り決めておくことが大切です。

</details>

## 日本企業での使われ方

- 取引先や他部署とのデータのやり取りには、今でも CSV がよく使われます。CSV の読み込み・集計・変換は、言語を問わず頻繁に出てくる仕事です。
- 製造業の現場では、測定装置やセンサーが出力したログファイルを C++ のツールで解析する、といった使い方もあります。

## 30 日の振り返り

おつかれさまでした。30 日で、3 つの言語について次のことを学びました。

| ラウンド | JavaScript | Go | C++ |
| --- | --- | --- | --- |
| 1〜3 | `const` / `let`、truthy・falsy | `:=`、ゼロ値、`for` だけのループ | `const`、参照渡し、`switch` の `break` |
| 4〜5 | `map` / `filter` / `reduce`、`Map` | スライス、`map`、`rune` | `vector`、`<algorithm>`、UTF-8 |
| 6〜7 | `class`、例外 | struct とポインタレシーバ、`error` 値 | `class`、例外と `optional` |
| 8〜9 | `async` / `await`、TypeScript | goroutine、interface、`go test` | ポインタ、RAII とスマートポインタ |
| 10 | ToDo 管理 CLI | JSON API サーバー | CSV 集計ツール |

次のステップの例です。

- **JavaScript**：TypeScript で React か Vue.js の小さな画面を作り、Day 29 の API からデータを表示してみる
- **Go**：Day 29 の API にデータベース（SQLite など）をつなぎ、追加・更新もできるようにする
- **C++**：AtCoder の過去問（A・B 問題）を C++ で解き、STL に慣れる

**全体の進み具合**は `node check.mjs` で確認できます。30 日分すべてに「✓ 完了」が並んだら修了です。
