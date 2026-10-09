// Day 11 解答例: 売上データを集計しよう (Day 10 と同じお題)
// 実行: go run ./lessons/day11-go/solution
package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func joinInts(nums []int) string {
	parts := []string{}
	for _, n := range nums {
		parts = append(parts, strconv.Itoa(n))
	}
	return strings.Join(parts, ", ")
}

func main() {
	sales := []int{1200, 800, 3000, 450, 2200}

	// TODO 1〜3: Go には filter / map がないので、1 回のループでまとめて処理できる
	large := []int{}
	withTax := []int{}
	total := 0
	for _, s := range sales {
		if s >= 1000 {
			large = append(large, s)
		}
		withTax = append(withTax, s*110/100)
		total += s
	}

	// TODO 4: Clone してから Sort すれば、sales の順番は変わらない
	maxSale := slices.Max(sales)
	ascending := slices.Clone(sales)
	slices.Sort(ascending)

	fmt.Printf("売上: %s\n", joinInts(sales))
	fmt.Printf("1000円以上: %s\n", joinInts(large))
	fmt.Printf("税込: %s\n", joinInts(withTax))
	fmt.Printf("合計: %d円\n", total)
	fmt.Printf("最大: %d円\n", maxSale)
	fmt.Printf("昇順: %s\n", joinInts(ascending))
	fmt.Printf("元の順番: %s\n", joinInts(sales))
}
