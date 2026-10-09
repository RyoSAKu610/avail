// Day 2 解答例: アルバイトの給与明細を作ろう
// 実行: go run ./lessons/day02-go/solution
package main

import "fmt"

func main() {
	// TODO 1: := で宣言 (型は右辺から推論される)
	name := "鈴木 花子"
	hourly := 1200     // int
	hoursPerDay := 7.5 // float64
	days := 20         // int

	// TODO 2: 定数は const
	const transportPerDay = 500

	// TODO 3: float64 にそろえて計算し、int(...) で切り捨てて整数に戻す
	basePay := int(float64(hourly) * hoursPerDay * float64(days))

	// TODO 4: 型のない定数 (transportPerDay) は int とそのまま掛けられる
	transport := transportPerDay * days
	total := basePay + transport

	fmt.Println("=== 給与明細 ===")
	fmt.Printf("氏名: %s\n", name)
	fmt.Printf("時給: %d円 / 勤務: %.1f時間 × %d日\n", hourly, hoursPerDay, days)
	fmt.Printf("基本給: %d円\n", basePay)
	fmt.Printf("交通費: %d円\n", transport)
	fmt.Printf("支給額: %d円\n", total)
	fmt.Printf("(basePay の型: %T)\n", basePay)
}
