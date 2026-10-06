// Day 23 サンプル: goroutine と channel
// 実行: go run ./lessons/day23-go/sample
package main

import (
	"fmt"
	"sync"
	"time"
)

func work(name string, ms int) string {
	time.Sleep(time.Duration(ms) * time.Millisecond) // 時間のかかる処理の代わり
	return name + " 完了"
}

func main() {
	// --- 1. go を付けて呼ぶと、別の goroutine (軽量なスレッド) で同時に動く ---
	go fmt.Println("これは別の goroutine で動く (main が先に終わると表示されないこともある)")
	time.Sleep(10 * time.Millisecond)

	// --- 2. channel: goroutine の間で値を受け渡す「管」 ---
	ch := make(chan string)
	go func() {
		ch <- work("A", 100) // channel に送る
	}()
	result := <-ch // channel から受け取る (届くまで待つ)
	fmt.Println(result)

	// --- 3. 複数の goroutine を同時に動かし、結果を channel で集める ---
	start := time.Now()
	results := make(chan string)
	for _, name := range []string{"X", "Y", "Z"} {
		go func() {
			results <- work(name, 100) // Go 1.22 以降、ループ変数は回ごとに別物なので安全
		}()
	}
	for range 3 { // 3 回受け取る (range 整数 は Go 1.22 から)
		fmt.Println(<-results) // 終わった順に届くので、順番は毎回変わりうる
	}
	fmt.Println("3 つで約", time.Since(start).Round(100*time.Millisecond)) // 約 100ms

	// --- 4. sync.WaitGroup: 「全部終わるまで待つ」だけなら WaitGroup ---
	var wg sync.WaitGroup
	var mu sync.Mutex // 共有の変数を同時に書き換えないための鍵
	total := 0
	for i := 1; i <= 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			total += i // Lock しないと、同時に書き換えて結果が壊れることがある
			mu.Unlock()
		}()
	}
	wg.Wait()
	fmt.Println("合計:", total) // 5050
}
