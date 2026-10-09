// Day 14 サンプル: Go の map と文字列
// 実行: go run ./lessons/day14-go/sample
package main

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

func main() {
	// --- 1. map[キーの型]値の型 ---
	stock := map[string]int{"りんご": 3, "みかん": 5}
	stock["ぶどう"] = 2          // 追加
	stock["りんご"]++            // 更新
	fmt.Println(stock["りんご"]) // 4

	// --- 2. ないキーはゼロ値が返る。あるかどうかは「comma ok」で調べる ---
	fmt.Println(stock["メロン"]) // 0 (エラーにならない)
	if n, ok := stock["メロン"]; !ok {
		fmt.Println("メロンはない", n)
	}

	// --- 3. delete と len ---
	delete(stock, "ぶどう")
	fmt.Println(len(stock)) // 2

	// --- 4. range の順番は毎回バラバラ! (わざとランダムになっている) ---
	for fruit, n := range stock {
		fmt.Println(fruit, n) // 実行するたびに順番が変わることがある
	}

	// --- 5. strings パッケージ ---
	text := "りんご,みかん,ぶどう"
	fmt.Println(strings.Split(text, ","))      // [りんご みかん ぶどう]
	fmt.Println(strings.Contains(text, "みかん")) // true
	fmt.Println(strings.Fields("  A  B C "))   // [A B C] (空白で区切る)
	fmt.Println(strings.Repeat("=", 10))       // ==========

	// --- 6. 文字列は UTF-8 のバイト列。len はバイト数 ---
	name := "山田太郎"
	fmt.Println(len(name))                    // 12 (バイト数)
	fmt.Println(utf8.RuneCountInString(name)) // 4  (文字数)
	fmt.Println(name[0:3])                    // 山 (バイトで切り出す。0:2 だと文字化け)

	// --- 7. rune = 1 文字 (Unicode のコードポイント)。range は 1 文字ずつ回る ---
	for i, r := range "日本" {
		fmt.Println(i, string(r)) // 0 日 / 3 本 (i はバイト位置)
	}
	runes := []rune(name)
	fmt.Println(string(runes[2:])) // 太郎 (rune のスライスなら文字単位で切れる)
}
