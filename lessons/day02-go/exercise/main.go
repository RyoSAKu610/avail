// Day 2 演習: アルバイトの給与明細を作ろう
// 実行:       go run ./lessons/day02-go/exercise
// 答え合わせ: node check.mjs 2
//
// 今は仮の値が入っているので、出力が期待どおりになりません。
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import "fmt"

func main() {
	// TODO 1: := で次の4つを宣言しよう (今は仮の値が入っている)
	//   name: "鈴木 花子"  hourly: 1200  hoursPerDay: 7.5  days: 20
	name := "???"
	hourly := 0
	hoursPerDay := 0.0
	days := 0

	// TODO 2: 1日あたりの交通費 500 円を const で定義しよう
	const transportPerDay = 0

	// TODO 3: 基本給 = 時給 × 1日の勤務時間 × 日数 (円未満は切り捨て)
	//   int と float64 はそのまま掛け算できない (コンパイルエラーになる)。
	//   float64(x) で変換して計算し、最後に int(...) で整数に戻そう
	basePay := 0

	// TODO 4: 交通費 (1日あたり × 日数) と 支給額 (基本給 + 交通費) を計算しよう
	transport := 0
	total := 0

	fmt.Println("=== 給与明細 ===")
	fmt.Printf("氏名: %s\n", name)
	fmt.Printf("時給: %d円 / 勤務: %.1f時間 × %d日\n", hourly, hoursPerDay, days)
	fmt.Printf("基本給: %d円\n", basePay)
	fmt.Printf("交通費: %d円\n", transport)
	fmt.Printf("支給額: %d円\n", total)
	fmt.Printf("(basePay の型: %T)\n", basePay)
}
