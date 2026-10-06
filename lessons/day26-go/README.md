# Day 26 — Go ⑨：interface と go test

> 所要時間 15分 ／ ラウンド9「その言語らしさ ②」 ／ 前提: Day 25 を終えていること

## 今日のゴール

- `interface` を定義し、それを満たす型を作れる（`implements` は書かない）
- interface を引数にして、いろいろな型を同じように扱える
- `go test` でテストを実行し、テーブル駆動テストが読める

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust・TypeScript との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust・TypeScript との違い（3分）

| やりたいこと | Python | Rust | TypeScript | Go |
| --- | --- | --- | --- | --- |
| 共通の約束 | `Protocol` / ABC | `trait` | `interface` | `interface` |
| 約束を満たすと宣言 | 継承（ABC の場合） | `impl Trait for T` | `implements`（任意） | **書かない**（メソッドがあれば OK） |
| 約束を引数に | `def f(s: Shape)` | `fn f(s: &dyn Shape)` | `function f(s: Shape)` | `func f(s Shape)` |
| テストの実行 | `pytest` | `cargo test` | Jest / Vitest など | `go test`（標準） |
| テストの書き方 | `def test_x():` | `#[test] fn x()` | `test("x", () => {})` | `func TestX(t *testing.T)` |

覚えるのは次の 3 点です。

1. **interface は「メソッドの一覧」**。その一覧のメソッドをすべて持つ型は、宣言しなくても自動でその interface を満たします。Rust の `impl Trait for T` に当たる宣言は要りません。
2. **interface を引数にすれば、満たす型は何でも渡せる**。演習では 3 種類の料金プランを `[]FeePlan` という 1 つのスライスに入れて同じように扱います。
3. **テストは標準機能**。`_test.go` で終わるファイルに `func TestXxx(t *testing.T)` を書き、`go test` で実行します。追加のライブラリは要りません。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day26-go/sample
```

[sample/main.go](sample/main.go) の `Rect` と `Circle` には、`Shape` を満たすという宣言がどこにもありません。

```go
func (r Rect) Area() float64 { return r.W * r.H }
func (r Rect) Name() string  { return "長方形" }
```

`Area()` と `Name()` の 2 つを持っているので、自動的に `Shape` として使えます。標準ライブラリの `fmt.Stringer`（`String() string` を持つ型）も同じ仕組みで、`Yen` 型を `fmt.Println` に渡すと `1980円` と表示されます。

## 3. 演習：料金プランの比較（5分）

[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
通話 120 分の場合
従量プラン: 2400円
定額プラン: 2000円
基本料+超過プラン: 2800円
いちばん安いのは: 定額プラン (2000円)
```

```bash
go run ./lessons/day26-go/exercise
go test ./lessons/day26-go/exercise   # テストも通るか確かめる
node check.mjs 26
```

`exercise/main_test.go` にテストが書いてあります。最初に `go test` を実行すると、どの入力で何が違うかが `FAIL` として表示されます。TODO を解くと `ok` になります。

テストの中身は「入力と期待値の組」を並べた表になっています（テーブル駆動テスト）。ケースを足すときは表に 1 行足すだけです。

## 4. 確認クイズ（2分）

**Q1.** `FlatPlan` から `Name()` メソッドを消すと、何が起きる？

<details><summary>答え</summary>

`FlatPlan` が `FeePlan` を満たさなくなるので、`[]FeePlan{..., FlatPlan{...}}` のところでコンパイルエラーになります（`FlatPlan does not implement FeePlan (missing method Name)`）。宣言は書かなくても、チェックはコンパイラがしっかり行います。

</details>

**Q2.** `go test` が見つけるテストの条件は？

<details><summary>答え</summary>

ファイル名が `_test.go` で終わり、関数名が `Test` で始まって `(t *testing.T)` を引数に取るものです。`t.Errorf` で失敗を報告すると、そのテストは `FAIL` になります。

</details>

**Q3.** interface はなるべく大きく（メソッドを多く）するのがよい？

<details><summary>答え</summary>

逆で、小さいほうがよいとされています。Go の標準ライブラリの `io.Reader` は `Read` メソッド 1 つだけの interface です。メソッドが少ないほど、多くの型が満たせて使い回しやすくなります。

</details>

## 日本企業での使われ方

- Go のバックエンドでは、データベースや外部 API を interface の向こうに隠し、テストのときは偽物（モック）に差し替える設計がよく使われます。
- 「テーブル駆動テスト」は Go の現場で最も一般的なテストの書き方です。プルリクエストにテストを付けるのが当たり前のチームが多く、`go test` を CI で自動実行します。

## 今日のまとめ

- interface はメソッドの一覧。メソッドがそろえば宣言なしで満たす
- interface を引数やスライスの型にすると、いろいろな型を同じように扱える
- テストは `_test.go` に `func TestXxx(t *testing.T)`。`go test` で実行

**次回（Day 27）**：C++ の RAII とスマートポインタ。Day 24 の `new` / `delete` の問題を解決します。
