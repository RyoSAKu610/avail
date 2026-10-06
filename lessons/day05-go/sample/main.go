// Day 5 サンプル: Go の関数
// 実行: go run ./lessons/day05-go/sample
package main

import (
	"fmt"
	"strconv"
)

// --- 1. 関数の定義: 引数の型は名前の後ろ、戻り値の型は ( ) の後ろ ---
func add(a int, b int) int {
	return a + b
}

// 同じ型が続くときは、まとめて書ける
func multiply(a, b int) int {
	return a * b
}

// --- 2. 戻り値を 2 つ以上返せる ---
func divmod(a, b int) (int, int) {
	return a / b, a % b
}

// --- 3. 可変長引数: ...int は「int をいくつでも」(関数の中ではスライスになる) ---
func sum(nums ...int) int {
	total := 0
	for _, n := range nums { // ループは Day 8 で詳しく学ぶ
		total += n
	}
	return total
}

func main() {
	fmt.Println(add(2, 3), multiply(3, 4)) // 5 12

	q, r := divmod(17, 5) // 2 つの戻り値を受け取る
	fmt.Println(q, r)     // 3 2

	_, onlyR := divmod(17, 5) // いらない戻り値は _ で捨てる (使わない変数はエラーなので)
	fmt.Println(onlyR)        // 2

	fmt.Println(sum(1, 2, 3), sum()) // 6 0

	// --- 4. 標準ライブラリも「値, エラー」の 2 つを返す関数が多い ---
	n, err := strconv.Atoi("123") // 文字列 → int
	fmt.Println(n, err)           // 123 <nil>  (nil は「エラーなし」)

	// --- 5. 関数も値として変数に入れられる ---
	op := multiply
	fmt.Println(op(6, 7)) // 42
}
