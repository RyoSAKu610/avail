# Day 17 — Go ⑥：struct とメソッド

> 所要時間 15分 ／ ラウンド6「型を作る」 ／ 前提: Day 16 を終えていること

## 今日のゴール

- `struct` を定義し、`New〇〇` 関数で作れる
- 値レシーバとポインタレシーバを使い分けられる
- 大文字・小文字で公開・非公開が決まるルールを説明できる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust・JavaScript との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust・JavaScript との違い（3分）

| やりたいこと | Rust | JavaScript | Go |
| --- | --- | --- | --- |
| 型を定義 | `struct Foo { x: i32 }` | `class Foo { }` | `type Foo struct { x int }` |
| 作る関数 | `Foo::new()` | `new Foo()` | `NewFoo()`（慣習） |
| メソッド | `impl Foo { fn f(&self) }` | class の中に書く | `func (f Foo) F()`（型の外に書く） |
| 書き換えるメソッド | `&mut self` | （常に書き換えられる） | `func (f *Foo) F()` |
| 公開・非公開 | `pub` を付ける | `#` で非公開 | **大文字で始めると公開** |
| 継承 | なし（トレイト） | `extends` | なし（埋め込み） |
| 代入 `b = a` | ムーブ | 同じものを指す | **コピー** |

覚えるのは次の 3 点です。

1. **メソッドは型の外に書く**。`func (a *BankAccount) Deposit(...)` の `(a *BankAccount)` を「レシーバ」と呼びます。Rust の `self` にあたります。
2. **書き換えるならポインタレシーバ `*T`**。値レシーバ `T` はコピーを受け取るので、書き換えても元は変わりません。Rust の `&self` と `&mut self` の違いに近い感覚です。
3. **名前の 1 文字目で公開範囲が決まる**。`Owner` は他のパッケージから見え、`balance` は見えません。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day17-go/sample
```

[sample/main.go](sample/main.go) の `Raise` と `RaiseBroken` を比べてください。

```go
func (e *Employee) Raise(percent int) { ... }       // ポインタレシーバ: 元が変わる
func (e Employee) RaiseBroken(percent int) { ... }  // 値レシーバ: コピーが変わるだけ
```

`RaiseBroken` もコンパイルは通るので、気づきにくいバグになります。「1 つでもポインタレシーバのメソッドがあれば、その型のメソッドはすべてポインタレシーバにそろえる」というルールのチームも多いです。

## 3. 演習：銀行口座（5分）

Day 16 と同じお題です。[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
口座: 山田 太郎
入金 5000 → 残高 5000円
出金 2000 → 残高 3000円
出金 9000 → 残高不足 (残高 3000円)
取引回数: 2
```

```bash
go run ./lessons/day17-go/exercise
node check.mjs 17
```

TODO 3 で `Deposit` の中身だけを書いてレシーバを直し忘れると、入金しても残高は `0円` のままです。試してから直すと、違いがよくわかります。

## 4. 確認クイズ（2分）

**Q1.** `account := NewBankAccount("A")` の `account` の型は？ `account.Deposit(100)` は何を書き換える？

<details><summary>答え</summary>

型は `*BankAccount`（ポインタ）です。`Deposit` はポインタレシーバなので、`account` が指している口座そのものを書き換えます。なお、Go は `account.Balance()` のように、ポインタからでも値レシーバのメソッドを自動で呼べます。

</details>

**Q2.** `type user struct { name string }` を別のパッケージから使えるようにするには？

<details><summary>答え</summary>

`type User struct { Name string }` のように、型名とフィールド名を大文字で始めます。JSON に変換するとき（Day 29）も、大文字のフィールドしか出力されません。

</details>

**Q3.** Go に `class` や `extends` がないとき、共通の機能はどう使い回す？

<details><summary>答え</summary>

構造体の「埋め込み」（サンプルの `Manager` の中の `Employee`）で、別の型のフィールドとメソッドを取り込みます。また、「この形のメソッドを持つ型なら何でもよい」という使い回しには、Day 26 で学ぶ `interface` を使います。

</details>

## 日本企業での使われ方

- Go のバックエンドでは、データベースの 1 行やリクエストの中身を `struct` で表すのが基本です。`json:"name"` のような「タグ」を付けて使うことが多く、Day 29 で扱います。
- 値レシーバとポインタレシーバの混在はレビューでよく指摘されます。迷ったらポインタレシーバにそろえるのが無難です。

## 今日のまとめ

- `type 名前 struct { }` で型を作り、`New名前` 関数で作るのが慣習
- 書き換えるメソッドはポインタレシーバ `(a *T)`
- 大文字で始まる名前は公開、小文字は非公開

**次回（Day 18）**：同じ銀行口座を C++ の `class` で作ります。
