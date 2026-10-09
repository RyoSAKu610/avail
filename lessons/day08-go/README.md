# Day 8 — Go ③：条件分岐とループ

> 所要時間 15分 ／ ラウンド3「条件分岐とループ」 ／ 前提: Day 7 を終えていること

## 今日のゴール

- Go のループは `for` だけで、3 通りの書き方があることがわかる
- `switch` を `break` なしで書ける
- `if` の初期化文（`if v, err := ...; err == nil`）が読める

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
| 条件分岐 | `if x > 0:` | `if x > 0 { }` | `if (x > 0) { }` | `if x > 0 { }` |
| 0〜2 を数える | `for i in range(3):` | `for i in 0..3` | `for (let i = 0; i < 3; i++)` | `for i := 0; i < 3; i++ { }` |
| while | `while c:` | `while c { }` | `while (c) { }` | `for c { }` |
| 無限ループ | `while True:` | `loop { }` | `while (true) { }` | `for { }` |
| リストを順に | `for i, x in enumerate(xs):` | `for (i, x) in xs.iter().enumerate()` | `for (const x of xs)` | `for i, x := range xs { }` |
| 多分岐の `break` | 不要（`match`） | 不要（`match`） | **必要** | **不要** |
| 条件に数値を書く | できる | できない | できる | **できない** |

覚えるのは次の 3 点です。

1. **ループは `for` だけ**。`while` も無限ループも `for` で書きます。
2. **`switch` は一致した `case` だけ実行**。JavaScript と違い `break` は要りません。`case "土", "日":` のように値を並べられます。
3. **条件は必ず `bool`**。Rust と同じで、`if count { }` のような書き方はエラーです。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day08-go/sample
```

[sample/main.go](sample/main.go) の `if` の初期化文に注目してください。

```go
if n, err := strconv.Atoi("42"); err == nil {
	fmt.Println("数値に変換できた:", n)
}
```

`;` の前で作った `n` と `err` は、この `if`（と `else`）の中でしか使えません。変数の有効範囲を狭くできるので、Go のコードでとてもよく見かけます。

## 3. 演習：FizzBuzz と営業日チェック（5分）

[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
月: 平日
土: 休日
日: 休日
```

```bash
go run ./lessons/day08-go/exercise
node check.mjs 8
```

FizzBuzz は、15 の倍数の判定を最初に書くのがポイントです。3 の倍数を先に判定すると、15 が `Fizz` になってしまいます。

## 4. 確認クイズ（2分）

**Q1.** Go で `while (x < 10)` に相当する書き方は？

<details><summary>答え</summary>

`for x < 10 { }` です。Go には `while` というキーワードがありません。

</details>

**Q2.** 次のコードの出力は？

```go
switch 2 {
case 1:
	fmt.Println("one")
case 2:
	fmt.Println("two")
case 3:
	fmt.Println("three")
}
```

<details><summary>答え</summary>

`two` だけです。Go の `switch` は一致した `case` を実行したら終わります。次の `case` も実行したいときだけ `fallthrough` と書きます（めったに使いません）。

</details>

**Q3.** `for i, x := range items` で、添字がいらないときはどう書く？

<details><summary>答え</summary>

`for _, x := range items` です。使わない変数は `_` で捨てます。逆に値がいらず添字だけ欲しいときは `for i := range items` と書けます。

</details>

## 日本企業での使われ方

- 「`else` をなるべく書かず、条件を満たさないときは早めに `return` する」（アーリーリターン）が Go の定番スタイルです。Day 20 のエラー処理でもこの形が出てきます。
- 書き方の選択肢が少ないので、誰が書いても似たコードになります。チームで読みやすいことが Go が好まれる理由の一つです。

## 今日のまとめ

- ループは `for` だけ。`for 条件 { }` が while、`for { }` が無限ループ
- `switch` に `break` は不要。値はカンマで並べられる
- `if v, err := f(); err == nil { }` で変数の範囲を狭くできる

**次回（Day 9）**：C++ の条件分岐とループ。範囲 `for` と、`switch` の `break` 忘れに注意します。
