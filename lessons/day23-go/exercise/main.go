// Day 23 演習: 3 店舗の売上を同時に集計しよう
// 実行:       go run ./lessons/day23-go/exercise
// 答え合わせ: node check.mjs 23
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import (
	"fmt"
	"time"
)

// 店舗の売上を取得する (完成済み)。1 回 200ms かかる
func fetchSales(store string) int {
	time.Sleep(200 * time.Millisecond)
	sales := map[string]int{"渋谷店": 3200, "新宿店": 4500, "池袋店": 2800}
	return sales[store]
}

// channel で受け渡す結果。何番目の店舗かを index で覚えておく
type result struct {
	index int
	sales int
}

func main() {
	stores := []string{"渋谷店", "新宿店", "池袋店"}
	totals := make([]int, len(stores))
	start := time.Now()

	// TODO 1: 今は 1 店舗ずつ順番に取得しているので 600ms かかる。
	// 店舗ごとに goroutine を起動し、結果を ch に送るように書き換えよう
	// ヒント: go func() { ch <- result{i, fetchSales(store)} }()
	ch := make(chan result)
	for i, store := range stores {
		totals[i] = fetchSales(store)
	}

	// TODO 2: ch から len(stores) 回受け取り、r.index の位置に r.sales を入れよう
	// (終わった順に届くので、index を使って元の順番に並べ直す)
	_ = ch

	sum := 0
	for i, store := range stores {
		fmt.Printf("%s: %d円\n", store, totals[i])
		sum += totals[i]
	}
	fmt.Printf("全店合計: %d円\n", sum)

	if time.Since(start) < 450*time.Millisecond {
		fmt.Println("所要時間: 約 200ms (同時に取得できている)")
	} else {
		fmt.Println("所要時間: 約 600ms (1 店舗ずつ取得している)")
	}
}
