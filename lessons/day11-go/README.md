# Day 11 — Go ④：スライスと append

> 所要時間 15分 ／ ラウンド4「配列とリスト」 ／ 前提: Day 10 を終えていること

## 今日のゴール

- 配列とスライスの違いがわかり、普段はスライスを使える
- `append` の結果を受け取り直す理由を説明できる
- `map`・`filter` がない Go で、`for range` を使って同じことを書ける

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust・JavaScript との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust・JavaScript との違い（3分）

| やりたいこと | Python | Rust | JavaScript | Go |
| --- | --- | --- | --- | --- |
| 作る | `[3, 1, 2]` | `vec![3, 1, 2]` | `[3, 1, 2]` | `[]int{3, 1, 2}` |
| 追加 | `xs.append(4)` | `xs.push(4)` | `xs.push(4)` | `xs = append(xs, 4)` |
| 長さ | `len(xs)` | `xs.len()` | `xs.length` | `len(xs)` |
| 切り出し | `xs[1:3]`（コピー） | `&xs[1..3]`（借用） | `xs.slice(1, 3)`（コピー） | `xs[1:3]`（**共有**） |
| 変換・絞り込み | 内包表記 | `iter().map()` | `map` / `filter` | `for range` + `append` |
| 並べ替え | `xs.sort()` | `xs.sort()` | `xs.sort((a, b) => a - b)` | `slices.Sort(xs)` |

覚えるのは次の 3 点です。

1. **普段使うのはスライス `[]int`**。`[3]int` のように長さを書くと「配列」になり、長さが型の一部になります。
2. **`append` は戻り値を受け取り直す**。容量が足りないと新しい領域にコピーされるので、`xs = append(xs, 4)` と書きます。
3. **`xs[1:3]` は元と同じメモリを共有する**。Python のようなコピーではありません。Rust の借用に近いですが、書き換えもできてしまう点に注意しましょう。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day11-go/sample
```

[sample/main.go](sample/main.go) の切り出しの部分を見てください。

```go
part := nums[1:3]
part[0] = 999
fmt.Println(nums) // [3 999 2 10] ← 元も変わる
```

コピーが欲しいときは `slices.Clone(nums)` を使います。

## 3. 演習：売上データの集計（5分）

Day 10 と同じお題です。[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

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
go run ./lessons/day11-go/exercise
node check.mjs 11
```

TODO 4 では、`import` に `"slices"` を足します。足しただけで使わないと `"slices" imported and not used` というエラーになるので、使うコードを書いてから実行しましょう。

JavaScript ではメソッドを 3 つつなげた処理が、Go では 1 つの `for` ループにまとまります。どちらが読みやすいか比べてみてください。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力は？

```go
xs := []int{1, 2}
append(xs, 3)
fmt.Println(xs)
```

<details><summary>答え</summary>

コンパイルエラーになります（`append(xs, 3) (value of type []int) is not used`）。`append` の戻り値を使っていないからです。`xs = append(xs, 3)` と書けば `[1 2 3]` になります。

</details>

**Q2.** `a := []int{1, 2, 3}; b := a[:2]; b[0] = 9` のあと、`a[0]` はいくつ？

<details><summary>答え</summary>

`9` です。`b` は `a` と同じメモリを共有しています。

</details>

**Q3.** `var xs []int` と宣言したスライスの `len(xs)` と、`xs = append(xs, 1)` はできる？

<details><summary>答え</summary>

`len(xs)` は `0` で、`append` もできます。スライスのゼロ値は `nil` ですが、長さ 0 のスライスとして扱えます。

</details>

## 日本企業での使われ方

- API サーバーでは、データベースから取り出した行をスライスに `append` して JSON で返す、という処理がよく出てきます（Day 29 で書きます）。
- 要素数が事前にわかるときは `make([]int, 0, n)` で容量を確保しておくと速くなります。性能を気にするチームのコードでよく見かけます。

## 今日のまとめ

- 普段はスライス `[]T`。`append` は `xs = append(xs, v)` と受け取り直す
- `xs[a:b]` は元とメモリを共有する。コピーは `slices.Clone`
- `map`・`filter` はないので、`for range` と `append` で書く

**次回（Day 12）**：同じ売上データを C++ の `std::vector` と `<algorithm>` で集計します。
