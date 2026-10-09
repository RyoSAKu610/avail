// Day 5 演習: 飲み会の割り勘を計算しよう
// 実行:       go run ./lessons/day05-go/exercise
// 答え合わせ: node check.mjs 5
//
// 今は関数が 0 を返すだけなので、出力が期待どおりになりません。
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import "fmt"

// 合計金額を返す (完成済み)
func sum(prices ...int) int {
	total := 0
	for _, p := range prices {
		total += p
	}
	return total
}

// TODO 1: 合計 total を people 人で割ったときの「1人あたりの金額」と「端数」の 2 つを返そう
// ヒント: 割り算は /、余りは %。return a, b のように 2 つ返せる
func splitBill(total, people int) (int, int) {
	return 0, 0
}

// TODO 2: 税抜価格 price から「税込価格」と「消費税額」の 2 つを返そう (税率10%、切り捨て)
// ヒント: 税込 = price * 110 / 100 (int 同士なので自動で切り捨て)。消費税額 = 税込 - price
func withTax(price int) (int, int) {
	return 0, 0
}

func main() {
	total := sum(1200, 3480, 980)
	fmt.Printf("合計: %d円\n", total)

	// TODO 3: splitBill を 3 人で呼び出し、2 つの戻り値を perPerson と rest で受け取ろう
	perPerson, rest := 0, 0
	fmt.Printf("3人で割り勘: 1人 %d円、端数 %d円\n", perPerson, rest)

	taxed, tax := withTax(total)
	fmt.Printf("税込: %d円 (うち消費税 %d円)\n", taxed, tax)

	// TODO 4: withTax(500) の「税込価格」だけが欲しい。消費税額は _ で捨てて受け取ろう
	coffee := 0
	fmt.Printf("コーヒー: %d円\n", coffee)
}
