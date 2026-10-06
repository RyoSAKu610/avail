// Day 29 演習 (ミニプロジェクト): 商品 API サーバー
//
// 実行 (デモ。答え合わせ用): go run ./lessons/day29-go/exercise
// 実行 (サーバーとして起動): go run ./lessons/day29-go/exercise -serve
// その後、ブラウザで http://localhost:8080/items を開く (Ctrl+C で終了)
// 答え合わせ: node check.mjs 29
//
// これまでに学んだ「struct・スライス・エラー処理」を組み合わせます。
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
)

// TODO 1: JSON のキーが "id"・"name"・"price" になるように struct タグを付けよう
// 例: ID int `json:"id"`
type Item struct {
	ID    int
	Name  string
	Price int
}

var items = []Item{
	{ID: 1, Name: "コーヒー", Price: 500},
	{ID: 2, Name: "ケーキ", Price: 650},
}

// v を JSON にしてレスポンスとして書き込む (完成済み)
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Println("JSON の書き込みに失敗:", err)
	}
}

// TODO 2: 商品の一覧を JSON で返そう (writeJSON に http.StatusOK と items を渡す)
func listItems(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "未実装", http.StatusNotImplemented)
}

// TODO 3: URL の {id} に一致する商品を JSON で返そう
// 1) r.PathValue("id") で文字列の id を取り出し、strconv.Atoi で数値にする
// (import に "strconv" を追加する)
// 2) 数値にできない、または見つからないときは、ステータス 404 (http.StatusNotFound) で
// map[string]string{"error": "商品 9 は見つかりません"} を返す
// (メッセージの 9 の部分は、URL の id をそのまま使う)
// 3) 見つかったら 200 でその商品を返す
func getItem(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "未実装", http.StatusNotImplemented)
}

func newMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /items", listItems)
	// TODO 4: "GET /items/{id}" のパターンに getItem を登録しよう
	return mux
}

// テスト用サーバーを立てて、実際に HTTP でリクエストを送ってみる (完成済み)
func demo() {
	server := httptest.NewServer(newMux())
	defer server.Close()

	for _, path := range []string{"/items", "/items/2", "/items/9"} {
		res, err := http.Get(server.URL + path)
		if err != nil {
			log.Fatal(err)
		}
		body, _ := io.ReadAll(res.Body)
		res.Body.Close()
		fmt.Printf("GET %s → %d\n", path, res.StatusCode)
		fmt.Println(strings.TrimSpace(string(body)))
		if path == "/items" {
			fmt.Println("Content-Type:", res.Header.Get("Content-Type"))
		}
	}
}

func main() {
	serve := flag.Bool("serve", false, "サーバーとして起動する")
	flag.Parse()
	if *serve {
		fmt.Println("http://localhost:8080/items で待ち受けます (Ctrl+C で終了)")
		log.Fatal(http.ListenAndServe(":8080", newMux()))
	}
	demo()
}
