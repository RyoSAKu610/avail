# Day 20 — Go ⑦：error 値と if err != nil

> 所要時間 15分 ／ ラウンド7「エラー処理」 ／ 前提: Day 19 を終えていること

## 今日のゴール

- 関数の最後の戻り値で `error` を返し、呼び出し側で `if err != nil` と書ける
- `errors.New` で比較用のエラーを作り、`errors.Is` で見分けられる
- `fmt.Errorf` の `%w` でエラーに説明を足せる

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
| 失敗を伝える | 例外 | `Result<T, E>` | 例外 | **戻り値の `error`** |
| 失敗を返す | `raise` | `Err(e)` | `throw` | `return 0, err` |
| 成功を返す | `return x` | `Ok(x)` | `return x` | `return x, nil` |
| 呼び出し元へ渡す | 自動で伝わる | `?` | 自動で伝わる | `if err != nil { return err }` |
| 種類を見分ける | `except Foo:` | `match` | `instanceof` | `errors.Is(err, ErrFoo)` |
| 後片付け | `finally` | `Drop` | `finally` | `defer` |

覚えるのは次の 3 点です。

1. **Go に例外（try / catch）はない**。Rust の `Result` に近く、エラーは普通の戻り値として返します。
2. **呼んだらすぐ `if err != nil`**。Rust の `?` のような省略記法はないので、毎回書きます。これが Go のコードで最もよく見る 3 行です。
3. **エラーを `_` で捨てない**。捨てると、失敗しても何も起きなかったように処理が続いてしまいます。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day20-go/sample
```

[sample/main.go](sample/main.go) の `%w` と `errors.Is` の組み合わせを見てください。

```go
return "", fmt.Errorf("ID %d: %w", id, ErrNotFound)
// ...
if errors.Is(err, ErrNotFound) { ... }
```

`%w` で包むと「ID 9: 見つかりません」のように説明が増えますが、`errors.Is` は中に包まれた `ErrNotFound` を見つけてくれます。`err == ErrNotFound` と `==` で比べると、包んだエラーは一致しなくなります。

## 3. 演習：年齢の入力チェック（5分）

Day 19 と同じお題に、「範囲外の件数」を足しました。[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
"25" → 25歳
"abc" → エラー: 数値ではありません
"-3" → エラー: 範囲外です (0〜150)
"200" → エラー: 範囲外です (0〜150)
"42" → 42歳
OK: 2件 / エラー: 3件 (うち範囲外: 2件)
```

```bash
go run ./lessons/day20-go/exercise
node check.mjs 20
```

直す前は `"abc" → 0歳` と表示されます。`strconv.Atoi` のエラーを `_` で捨てたせいで、失敗がゼロ値 `0` として通ってしまっています。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの問題点は？

```go
f, _ := os.Open("config.json")
```

<details><summary>答え</summary>

エラーを捨てています。ファイルがなかったときに `f` は `nil` になり、あとで使ったところで panic（実行時エラー）が起きます。原因が離れた場所で表に出るので、調べるのが大変になります。

</details>

**Q2.** `err := fmt.Errorf("保存に失敗: %w", ErrDiskFull)` のとき、`err == ErrDiskFull` と `errors.Is(err, ErrDiskFull)` の結果は？

<details><summary>答え</summary>

`false` と `true` です。`%w` で包んだ新しいエラーは別の値ですが、`errors.Is` は包まれた中身までたどって比べます。

</details>

**Q3.** `defer f.Close()` はいつ実行される？

<details><summary>答え</summary>

その関数を抜けるときです（`return` でも panic でも）。ファイルを開いた直後に `defer f.Close()` と書いておけば、閉じ忘れを防げます。Python の `with` や、JavaScript の `finally` と同じ目的で使います。

</details>

## 日本企業での使われ方

- Go のコードレビューでは「エラーを捨てていないか」「エラーに十分な情報（どの処理の、どの入力で失敗したか）が付いているか」がよく確認されます。`fmt.Errorf("ユーザー %d の読み込み: %w", id, err)` のように包むのが定番です。
- `if err != nil` が多くて冗長に見えますが、「どこで失敗しうるかがすべて見える」ことが、障害対応のしやすさにつながると評価されています。

## 今日のまとめ

- エラーは最後の戻り値。成功は `return x, nil`、失敗は `return 0, err`
- 呼んだらすぐ `if err != nil`。`_` で捨てない
- `%w` で包み、`errors.Is` で見分ける。後片付けは `defer`

**次回（Day 21）**：C++ のエラー処理。例外と `std::optional` の両方を使います。
