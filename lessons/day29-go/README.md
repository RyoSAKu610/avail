# Day 29 — Go ⑩：ミニプロジェクト「商品 API サーバー」

> 所要時間 15分 ／ ラウンド10「ミニプロジェクト」 ／ 前提: Day 28 を終えていること

## 今日のゴール

- struct タグを使って、struct と JSON を変換できる
- `net/http` で URL ごとの処理（ハンドラ）を登録し、JSON を返す API を作れる
- ステータスコード（200・404）を正しく返せる

Go が日本の Web 系企業で最もよく使われている用途、**Web API サーバー**を作ります。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. 作るものと、使う道具を確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. 作るものと使う道具（3分）

完成すると、次の URL に GET でアクセスしたときに JSON が返ります。

| URL | 返すもの | ステータス |
| --- | --- | --- |
| `/items` | 商品の一覧 | 200 |
| `/items/2` | ID が 2 の商品 | 200 |
| `/items/9` | `{"error": "商品 9 は見つかりません"}` | 404 |

| やりたいこと | Python（Flask など） | Go | 復習する日 |
| --- | --- | --- | --- |
| URL と処理を結びつける | `@app.get("/items")` | `mux.HandleFunc("GET /items", f)` | — |
| URL の一部を取り出す | `/items/<id>` | `"GET /items/{id}"` と `r.PathValue("id")` | — |
| データ → JSON | `json.dumps` | `json.Marshal` / `json.NewEncoder(w).Encode` | — |
| JSON のキー名 | 辞書のキー | struct タグ `` `json:"id"` `` | Day 17 |
| 文字列 → 数値 | `int(s)` | `strconv.Atoi(s)` | Day 20 |

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day29-go/sample
```

[sample/main.go](sample/main.go) は、JSON の変換を表示したあと、サーバーとして待ち受けます。ブラウザで `http://localhost:8080/hello/山田` を開いてみましょう。終わったらターミナルで Ctrl+C を押して止めます。

```go
type User struct {
	ID    int    `json:"id"`
	Email string `json:"email,omitempty"` // omitempty: 空なら出力しない
	pass  string // 小文字 (非公開) のフィールドは JSON に出ない
}
```

Day 17 で学んだ「大文字で始まるフィールドだけが公開」のルールが、JSON の変換にもそのまま使われています。

## 3. 演習：商品 API サーバー（5分）

[exercise/main.go](exercise/main.go) の `TODO` 1〜4 を完成させます。引数なしで実行すると、テスト用のサーバー（`httptest`）を立てて実際に HTTP でアクセスするデモが流れます。次の出力になれば完成です。

```text
GET /items → 200
[{"id":1,"name":"コーヒー","price":500},{"id":2,"name":"ケーキ","price":650}]
Content-Type: application/json
GET /items/2 → 200
{"id":2,"name":"ケーキ","price":650}
GET /items/9 → 404
{"error":"商品 9 は見つかりません"}
```

```bash
go run ./lessons/day29-go/exercise
node check.mjs 29
```

完成したら、`-serve` を付けて本物のサーバーとして起動し、ブラウザで `http://localhost:8080/items` を開いてみましょう。

```bash
go run ./lessons/day29-go/exercise -serve
```

## 4. 確認クイズ（2分）

**Q1.** TODO 1 の struct タグを付けないと、JSON のキーはどうなる？

<details><summary>答え</summary>

フィールド名そのまま（`"ID"`・`"Name"`・`"Price"`）になります。JSON の API ではキーを小文字やスネークケース（`"item_id"` など）にすることが多いので、タグで指定します。

</details>

**Q2.** 商品が見つからないときに、ステータス 200 で `{"error": ...}` を返すのはよくない？

<details><summary>答え</summary>

よくありません。API を使う側（フロントエンドなど）は、まずステータスコードで成功か失敗かを判断します。見つからないなら 404、入力がおかしいなら 400、サーバーの障害なら 500 のように、意味に合ったステータスを返すのが基本です。

</details>

**Q3.** `getItem` で、エラーを返したあとに `return` を書き忘れるとどうなる？

<details><summary>答え</summary>

関数の続きが実行され、404 の JSON のあとに別のレスポンスを書き込もうとしてしまいます（`superfluous response.WriteHeader call` という警告がログに出ます）。ハンドラでは「書き込んだらすぐ `return`」を徹底します。

</details>

## 日本企業での使われ方

- 実際の API サーバーでは、この形にデータベースへのアクセス、認証、ログ出力などが加わります。標準の `net/http` だけで書くチームもあれば、Echo・Gin・chi などのフレームワークを使うチームもあります。
- テストでは、今日のデモと同じ `httptest` を使って、本物の HTTP 通信で API の動作を確かめるのが一般的です。
- API の仕様は OpenAPI（Swagger）という形式の文書で管理し、フロントエンドのチームと共有することがよくあります。

## 今日のまとめ

- struct タグ `` `json:"id"` `` で JSON のキー名を決める
- `mux.HandleFunc("GET /items/{id}", f)` で登録し、`r.PathValue("id")` で取り出す
- 意味に合ったステータスコードを返し、書き込んだらすぐ `return`

**次回（Day 30）**：最終日。C++ で CSV ファイルを読み込み、成績を集計するツールを作ります。
