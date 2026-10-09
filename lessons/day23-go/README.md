# Day 23 — Go ⑧：goroutine と channel

> 所要時間 15分 ／ ラウンド8「その言語らしさ ①」 ／ 前提: Day 22 を終えていること

## 今日のゴール

- `go` を付けて関数を呼び、処理を同時に動かせる
- channel（`chan`）で goroutine 間の値の受け渡しができる
- `sync.WaitGroup` と `sync.Mutex` の役割を説明できる

Go が最も得意なのは、たくさんの処理を同時に動かす**並行処理**です。

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
| 同時に動かす | `threading` / `asyncio` | `thread::spawn` / `async` | `Promise`（1 スレッド） | `go f()` |
| 値の受け渡し | `queue.Queue` | `mpsc::channel` | `await` の結果 | `ch <- v` / `v := <-ch` |
| 全部終わるまで待つ | `join()` | `join()` | `Promise.all` | `sync.WaitGroup` |
| 共有データの保護 | `Lock` | `Mutex<T>` | （不要） | `sync.Mutex` |
| データ競合の検出 | なし | コンパイル時 | （起きない） | `go run -race` |

覚えるのは次の 3 点です。

1. **`go f()` だけで同時に動く**。goroutine はとても軽く、数千〜数万個を作っても問題ありません。JavaScript と違い、複数の CPU コアを使って本当に並列に動きます。
2. **値の受け渡しは channel で**。`ch <- v` で送り、`<-ch` で受け取ります。受け取る側は、値が届くまで待ちます。
3. **同じ変数を複数の goroutine で書き換えるなら `Mutex`**。Rust と違い、コンパイラは止めてくれません。`go run -race` で検出できます。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day23-go/sample
```

[sample/main.go](sample/main.go) の 3 番目の部分を何度か実行してみてください。`X 完了`・`Y 完了`・`Z 完了` の順番が実行するたびに変わることがあります。channel には「終わった順」に届くからです。

```go
for _, name := range []string{"X", "Y", "Z"} {
	go func() {
		results <- work(name, 100)
	}()
}
```

それぞれ 100ms かかる処理を 3 つ動かしても、全体は約 100ms で終わります。

## 3. 演習：3 店舗の売上を同時に集計（5分）

[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
渋谷店: 3200円
新宿店: 4500円
池袋店: 2800円
全店合計: 10500円
所要時間: 約 200ms (同時に取得できている)
```

```bash
go run ./lessons/day23-go/exercise
node check.mjs 23
```

直す前も金額は正しく出ますが、1 店舗ずつ取得しているので最後の行が「約 600ms」になります。結果は終わった順に届くので、`index` を使って元の順番の位置に入れるのがポイントです。

## 4. 確認クイズ（2分）

**Q1.** `ch := make(chan int)` に、受け取る goroutine がいない状態で `ch <- 1` を実行すると？

<details><summary>答え</summary>

受け取る相手が現れるまで止まり続けます。すべての goroutine が止まると `fatal error: all goroutines are asleep - deadlock!` で終了します。`make(chan int, 10)` のようにバッファを付けると、10 個までは相手がいなくても送れます。

</details>

**Q2.** `main` 関数が終わると、動いている途中の goroutine はどうなる？

<details><summary>答え</summary>

途中でも終了します。サンプルの最初の `go fmt.Println(...)` が表示されないことがあるのはこのためです。終わるのを待つには channel で受け取るか、`sync.WaitGroup` を使います。

</details>

**Q3.** サンプルの 4 番目で `mu.Lock()` と `mu.Unlock()` を消すとどうなる？

<details><summary>答え</summary>

複数の goroutine が同時に `total` を書き換えるので、合計が 5050 より小さくなることがあります（データ競合）。`go run -race ./lessons/day23-go/sample` で実行すると、`WARNING: DATA RACE` と教えてくれます。

</details>

## 日本企業での使われ方

- Web 系企業のバックエンドでは、1 つのリクエストの処理中に複数のサービスやデータベースへ同時に問い合わせる場面で goroutine がよく使われます。
- 実務では `context` パッケージを使って「タイムアウトしたら goroutine を止める」処理を組み合わせます。並行処理のバグは再現しにくいので、`-race` 付きでテストを実行するチームが多いです。

## 今日のまとめ

- `go f()` で同時に動く。`main` が終わると goroutine も終わる
- channel で値を送受信する。受け取る側は届くまで待つ
- 共有データは `sync.Mutex` で守る。`-race` で競合を検出できる

**次回（Day 24）**：C++ のポインタと参照、スタックとヒープ。C++ が「速い」理由の土台です。
