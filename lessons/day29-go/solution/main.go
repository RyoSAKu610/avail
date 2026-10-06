// Day 29 解答例 (ミニプロジェクト): 商品 API サーバー
//
// 実行 (デモ。答え合わせ用): go run ./lessons/day29-go/solution
// 実行 (サーバーとして起動): go run ./lessons/day29-go/solution -serve
// その後、ブラウザで http://localhost:8080/items を開く (Ctrl+C で終了)
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
)

// TODO 1: タグがないと、キーはフィールド名そのまま ("ID" など) になる
type Item struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
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

// TODO 2
func listItems(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, items)
}

// TODO 3: 失敗の場合を先に処理して return する (アーリーリターン)
func getItem(w http.ResponseWriter, r *http.Request) {
	idText := r.PathValue("id")
	notFound := map[string]string{"error": "商品 " + idText + " は見つかりません"}

	id, err := strconv.Atoi(idText)
	if err != nil {
		writeJSON(w, http.StatusNotFound, notFound)
		return
	}
	for _, item := range items {
		if item.ID == id {
			writeJSON(w, http.StatusOK, item)
			return
		}
	}
	writeJSON(w, http.StatusNotFound, notFound)
}

func newMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /items", listItems)
	// TODO 4
	mux.HandleFunc("GET /items/{id}", getItem)
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
