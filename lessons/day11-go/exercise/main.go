// Day 11 演習: 売上データを集計しよう (Day 10 と同じお題)
// 実行:       go run ./lessons/day11-go/exercise
// 答え合わせ: node check.mjs 11
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import (
	"fmt"
	"strconv"
	"strings"
)

// int のスライスを "1, 2, 3" の形の文字列にする (完成済み)
func joinInts(nums []int) string {
	parts := []string{}
	for _, n := range nums {
		parts = append(parts, strconv.Itoa(n))
	}
	return strings.Join(parts, ", ")
}

func main() {
	sales := []int{1200, 800, 3000, 450, 2200}

	// TODO 1: 1000 円以上の売上だけを large に集めよう (for range と if と append)
	large := []int{}

	// TODO 2: すべての売上を税込 (×110÷100) にして withTax に集めよう
	withTax := []int{}

	// TODO 3: 合計を計算しよう
	total := 0

	// TODO 4: 最大値と、昇順に並べた「コピー」を作ろう
	// slices パッケージを使う。使うには上の import に "slices" を追加する必要がある
	// (追加しただけで使わないと、コンパイルエラーになるので注意)
	// ヒント: slices.Max(s)、slices.Clone(s)、slices.Sort(s)
	maxSale := 0
	ascending := []int{}

	fmt.Printf("売上: %s\n", joinInts(sales))
	fmt.Printf("1000円以上: %s\n", joinInts(large))
	fmt.Printf("税込: %s\n", joinInts(withTax))
	fmt.Printf("合計: %d円\n", total)
	fmt.Printf("最大: %d円\n", maxSale)
	fmt.Printf("昇順: %s\n", joinInts(ascending))
	fmt.Printf("元の順番: %s\n", joinInts(sales))
}
