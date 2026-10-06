// Day 29 サンプル: JSON と net/http
// 実行: go run ./lessons/day29-go/sample
// (サーバーとして起動したら、ブラウザで http://localhost:8080/hello を開く。止めるのは Ctrl+C)
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// --- 1. struct タグで JSON のキー名を決める ---
type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email,omitempty"` // omitempty: 空なら出力しない
	pass  string // 小文字 (非公開) のフィールドは JSON に出ない
}

func main() {
	// --- 2. struct → JSON (json.Marshal) ---
	u := User{ID: 1, Name: "佐藤", pass: "secret"}
	b, _ := json.Marshal(u) // サンプルなのでエラーを省略。実務では必ずチェック
	fmt.Println(string(b))  // {"id":1,"name":"佐藤"}

	// --- 3. JSON → struct (json.Unmarshal) ---
	var u2 User
	if err := json.Unmarshal([]byte(`{"id":2,"name":"鈴木"}`), &u2); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", u2) // {ID:2 Name:鈴木 Email: pass:}

	// --- 4. HTTP サーバー: URL のパターンと、処理する関数 (ハンドラ) を登録する ---
	mux := http.NewServeMux()
	// "GET /hello/{name}" のようにメソッドとパスの変数も書ける (Go 1.22 から)
	mux.HandleFunc("GET /hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"message": "こんにちは、" + name + "さん"})
	})
	mux.HandleFunc("GET /hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "こんにちは!")
	})

	fmt.Println("http://localhost:8080/hello で待ち受けます (Ctrl+C で終了)")
	log.Fatal(http.ListenAndServe(":8080", mux)) // ここでずっと待ち続ける
}
