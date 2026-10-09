// Day 5 解答例: 飲み会の割り勘を計算しよう
// 実行: go run ./lessons/day05-go/solution
package main

import "fmt"

func sum(prices ...int) int {
	total := 0
	for _, p := range prices {
		total += p
	}
	return total
}

// TODO 1: 戻り値はカンマで区切って 2 つ返す
func splitBill(total, people int) (int, int) {
	return total / people, total % people
}

// TODO 2
func withTax(price int) (int, int) {
	taxed := price * 110 / 100
	return taxed, taxed - price
}

func main() {
	total := sum(1200, 3480, 980)
	fmt.Printf("合計: %d円\n", total)

	// TODO 3: 2 つの戻り値を := で同時に受け取る
	perPerson, rest := splitBill(total, 3)
	fmt.Printf("3人で割り勘: 1人 %d円、端数 %d円\n", perPerson, rest)

	taxed, tax := withTax(total)
	fmt.Printf("税込: %d円 (うち消費税 %d円)\n", taxed, tax)

	// TODO 4: いらない戻り値は _ で捨てる
	coffee, _ := withTax(500)
	fmt.Printf("コーヒー: %d円\n", coffee)
}
