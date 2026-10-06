# Day 9 — C++ ③：条件分岐とループ

> 所要時間 15分 ／ ラウンド3「条件分岐とループ」 ／ 前提: Day 7・Day 8 を終えていること

## 今日のゴール

- `for`・範囲 `for`・`while` を書ける
- `switch` で `break` を正しく使え、`switch` に使える型の制限を知っている
- 二重ループで表を出力できる

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
| 0〜2 を数える | `for (let i = 0; i < 3; i++)` | `for i := 0; i < 3; i++` | `for (int i = 0; i < 3; i++)` |
| 要素を順に | `for (const x of xs)` | `for _, x := range xs` | `for (const auto& x : xs)` |
| while | `while (c) { }` | `for c { }` | `while (c) { }` |
| `switch` の `break` | 必要 | 不要 | **必要** |
| `switch` で文字列 | できる | できる | **できない**（整数・文字・列挙型のみ） |
| 条件に整数を書く | できる（truthy） | できない | できる（0 以外は `true`） |

ラウンド 3 で見てきたとおり、ループと条件分岐の形は 3 言語でほとんど同じです。違いが出るのは次の 3 点です。

1. **範囲 `for` は `for (const auto& x : xs)` が基本形**。`auto` で型を推論し、`const&` でコピーを避けます。
2. **`switch` は JavaScript と同じく `break` が必要**。書き忘れると次の `case` も実行されます。
3. **`switch` に `std::string` は使えない**。文字列で分岐するときは `if` / `else if` を使います。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day09-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) の範囲 `for` を見てください。

```cpp
std::vector<std::string> fruits = {"りんご", "みかん"};
for (const std::string& fruit : fruits) {  // const 参照でコピーを避ける
    std::cout << fruit << "\n";
}
```

`std::vector` は Python のリストにあたるもので、Day 12 で詳しく学びます。

## 3. 演習：九九の表と曜日チェック（5分）

[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
1の段:  1  2  3  4  5  6  7  8  9
2の段:  2  4  6  8 10 12 14 16 18
3の段:  3  6  9 12 15 18 21 24 27
月曜日: 平日
土曜日: 休日
日曜日: 休日
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day09-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 9
```

`std::setw(3)` は「次に出力する値を幅 3 文字で右寄せにする」指定です。効果は次の 1 回だけなので、毎回書きます。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力は？

```cpp
int x = 1;
switch (x) {
    case 1: std::cout << "A";
    case 2: std::cout << "B"; break;
    case 3: std::cout << "C";
}
```

<details><summary>答え</summary>

`AB` です。`case 1` に `break` がないので `case 2` まで実行され、そこの `break` で止まります。`-Wextra` を付けると `this statement may fall through` という警告が出ます。わざとフォールスルーさせるときは `[[fallthrough]];` と書いて意図を示します。

</details>

**Q2.** `std::string cmd = "start"; switch (cmd) { ... }` はコンパイルできる？

<details><summary>答え</summary>

できません。`switch` に使えるのは整数・文字・列挙型だけです。`if (cmd == "start") { } else if (cmd == "stop") { }` と書きます。

</details>

**Q3.** `for (auto x : names)` と `for (const auto& x : names)` の違いは？（`names` は `std::vector<std::string>`）

<details><summary>答え</summary>

前者は要素を 1 つずつコピーします。後者はコピーせずに参照し、変更もできません。`int` のような小さい値ならコピーで構いませんが、文字列や大きなオブジェクトは後者で受け取ります。

</details>

## 日本企業での使われ方

- 組込み系のコーディング規約（MISRA C++ など）では、「`switch` の各 `case` は必ず `break` で終える」「`default` を必ず書く」といったルールがよく定められています。
- 古いコードでは `for (int i = 0; i < v.size(); i++)` のような添字ループが多く見られます。新しく書くときは範囲 `for` が好まれます。

## 今日のまとめ

- 範囲 `for` は `for (const auto& x : xs)`
- `switch` は `break` が必要。文字列には使えない
- 二重ループと `std::setw` で表がきれいに出せる

**次回（Day 10）**：ラウンド4「配列とリスト」。JavaScript の `map`・`filter`・`reduce` です。
