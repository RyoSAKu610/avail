// Day 2 サンプル: Go の変数と型
// 実行: go run ./lessons/day02-go/sample
package main

import "fmt"

func main() {
	// --- 1. 変数の宣言は := (関数の中ではほぼこれ) ---
	// 型は右辺から推論される (company は string、year は int)
	company := "株式会社サンプル"
	year := 1
	year = year + 1 // Go の変数はそのまま再代入できる (Rust の mut は不要)
	fmt.Println(company, year)

	// --- 2. var で型だけ書くと「ゼロ値」が入る ---
	var count int    // int のゼロ値は 0
	var label string // string のゼロ値は "" (空文字)
	var ok bool      // bool のゼロ値は false
	fmt.Println(count, label == "", ok)

	// --- 3. 定数は const ---
	const taxRate = 10 // 再代入しようとするとコンパイルエラー
	fmt.Println("消費税率:", taxRate)

	// --- 4. 型変換は必ず自分で書く ---
	hourly := 1200 // int
	hours := 7.5   // float64
	// pay := hourly * hours  ← コンパイルエラー: mismatched types int and float64
	pay := float64(hourly) * hours // 「型名(値)」で変換する
	fmt.Println("日給:", pay)

	// --- 5. Printf で書式を指定する ---
	// %s 文字列  %d 整数  %.1f 小数1桁  %v 何でも  %T 型名
	fmt.Printf("%sは%d年目\n", company, year)
	fmt.Printf("%.1f時間\n", hours)
	fmt.Printf("%v / %T\n", hours, hours)
	fmt.Println(7 / 2) // 3 ← int 同士の割り算は切り捨て (Rust と同じ)
}
