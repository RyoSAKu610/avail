// Day 23 解答例: 3 店舗の売上を同時に集計しよう
// 実行: go run ./lessons/day23-go/solution
package main

import (
	"fmt"
	"time"
)

func fetchSales(store string) int {
	time.Sleep(200 * time.Millisecond)
	sales := map[string]int{"渋谷店": 3200, "新宿店": 4500, "池袋店": 2800}
	return sales[store]
}

type result struct {
	index int
	sales int
}

func main() {
	stores := []string{"渋谷店", "新宿店", "池袋店"}
	totals := make([]int, len(stores))
	start := time.Now()

	// TODO 1: 3 つの goroutine が同時に動くので、全体で約 200ms
	ch := make(chan result)
	for i, store := range stores {
		go func() {
			ch <- result{i, fetchSales(store)}
		}()
	}

	// TODO 2: 送られた数だけ受け取る。受け取るまで main は待つ
	for range stores {
		r := <-ch
		totals[r.index] = r.sales
	}

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
