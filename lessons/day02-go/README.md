# Day 2 — Go ①：動かす・変数・型

> 所要時間 15分 ／ ラウンド1「動かす・変数・型」 ／ 前提: Day 1 を終えていること

## 今日のゴール

- `go run` で Go のプログラムを実行できる
- `:=` と `var` と `const` を使い分けられる
- 「ゼロ値」と「型変換は明示」の 2 つのルールを説明できる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust との違い（3分）

| やりたいこと | Python | Rust | Go |
| --- | --- | --- | --- |
| 変数を作る | `x = 1` | `let x = 1;` | `x := 1` |
| 型を書いて作る | `x: int = 1` | `let x: i32 = 1;` | `var x int = 1` |
| 再代入 | できる | `let mut` が必要 | そのままできる |
| 値を入れずに宣言 | できない | 使う前に代入が必須 | **ゼロ値**が入る（`0`、`""`、`false`） |
| 型変換 | `float(x)` | `x as f64` | `float64(x)` |
| 使っていない変数 | 何も起きない | 警告 | **コンパイルエラー** |
| 文字列に値を埋め込む | `f"{x}円"` | `format!("{x}円")` | `fmt.Sprintf("%d円", x)` |
| 自動整形ツール | black など | rustfmt | gofmt（標準付属） |

覚えるのは次の 3 点です。

1. **関数の中では `:=` でほぼ足りる**。型を明示したいときや、値を後で入れたいときに `var` を使います。
2. **値を入れずに宣言すると「ゼロ値」が入る**。Rust のように「未初期化はエラー」でも、C++ のように「中身が不定」でもありません。
3. **`int` と `float64` は混ぜて計算できない**。`float64(x)` のように自分で変換します。Rust の `as` と同じ考え方です。

## 2. サンプルを実行して読む（5分）

リポジトリのルートで実行します。

```bash
go run ./lessons/day02-go/sample
```

Go は **1 つのフォルダが 1 つのパッケージ**です。`main` 関数を持つプログラムを 3 つ（サンプル・演習・解答）置くために、`sample/`・`exercise/`・`solution/` とフォルダを分けています。

[sample/main.go](sample/main.go) で特に見てほしいのは、型変換の部分です。

```go
hourly := 1200 // int
hours := 7.5   // float64
// pay := hourly * hours  ← コンパイルエラー: mismatched types int and float64
pay := float64(hourly) * hours // 「型名(値)」で変換する
```

**試してみよう**：`sample/main.go` の `main` 関数の中に `unused := 1` と 1 行足して実行すると、次のエラーになります。確認したら元に戻しましょう。

```text
declared and not used: unused
```

Python なら何も起きず、Rust なら警告で済むところが、Go ではエラーです。消し忘れたデバッグ用の変数がコードに残らないための仕組みです。

## 3. 演習：アルバイトの給与明細（5分）

[exercise/main.go](exercise/main.go) の `TODO` を上から順に直し、次の出力にします（[expected.txt](expected.txt) と同じ内容です）。

```text
=== 給与明細 ===
氏名: 鈴木 花子
時給: 1200円 / 勤務: 7.5時間 × 20日
基本給: 180000円
交通費: 10000円
支給額: 190000円
(basePay の型: int)
```

```bash
go run ./lessons/day02-go/exercise   # 自分で実行して確かめる
node check.mjs 2                     # 答え合わせ
```

最後の行の `(basePay の型: int)` は、基本給を `int` に戻せているかの確認です。`float64` のままだと `%d` の部分が `%!d(float64=180000)` という表示になります。

答え合わせが通ったら、[solution/main.go](solution/main.go) と見比べましょう。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力は？

```go
var n int
var s string
var b bool
fmt.Println(n, s == "", b)
```

<details><summary>答え</summary>

`0 true false` です。値を入れずに宣言した変数には、型ごとのゼロ値が入ります。Rust ではこの書き方はコンパイルエラー、Python では `NameError` になります。

</details>

**Q2.** 次のコードはコンパイルできる？

```go
func main() {
	x := 10
	y := 20
	fmt.Println(x)
}
```

<details><summary>答え</summary>

できません。`y` を使っていないので `declared and not used: y` というエラーになります。使っていない `import` もエラーになります。

</details>

**Q3.** `a := 7`、`b := 2` のとき、`fmt.Println(a / b)` の出力は？

<details><summary>答え</summary>

`3` です。`int` 同士の割り算は切り捨てで、Rust と同じです。`3.5` が欲しいときは `float64(a) / float64(b)` と書きます。Day 1 の JavaScript（`7 / 2` が `3.5`）との違いに注意しましょう。

</details>

## 日本企業での使われ方

- Web 系企業のバックエンド（サーバー側）でよく使われます。メルカリのように、Go で多数のマイクロサービスを運用していることを公開している企業もあります。
- Docker・Kubernetes・Terraform といったインフラの定番ツールも Go 製です。SRE やインフラ担当でも Go のコードを読む機会があります。
- `gofmt` で書き方が統一されるので、コードレビューで「スペースの数」のような好みの議論が起きにくいです。エディタで保存時に自動整形する設定が前提になっています。

## 今日のまとめ

- 関数の中では `:=`、値を後で入れるなら `var`、定数は `const`
- 値を入れずに宣言すればゼロ値。使わない変数はコンパイルエラー
- `int` と `float64` は混ぜられない。`float64(x)` で変換する

**次回（Day 3）**：同じ「変数と型」を C++ で。今度は「コンパイルしてから実行」の 2 段階です。
