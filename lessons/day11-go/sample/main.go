// Day 11 サンプル: Go のスライス
// 実行: go run ./lessons/day11-go/sample
package main

import (
	"fmt"
	"slices"
)

func main() {
	// --- 1. 配列 (長さ固定) とスライス (長さ可変)。普段使うのはスライス ---
	arr := [3]int{3, 1, 2} // 配列: 長さも型の一部。ほとんど使わない
	nums := []int{3, 1, 2} // スライス: [] の中に長さを書かない
	fmt.Println(arr, nums) // [3 1 2] [3 1 2]

	// --- 2. append は「新しいスライス」を返すので、必ず受け取り直す ---
	nums = append(nums, 10)
	fmt.Println(nums, len(nums)) // [3 1 2 10] 4

	// --- 3. range で添字と値 ---
	total := 0
	for _, n := range nums {
		total += n
	}
	fmt.Println("合計:", total) // 16

	// --- 4. map や filter のメソッドはない。for と append で書く ---
	doubled := []int{}
	for _, n := range nums {
		doubled = append(doubled, n*2)
	}
	fmt.Println(doubled) // [6 2 4 20]

	// --- 5. 切り出し s[開始:終了] (終了は含まない。Python と同じ) ---
	part := nums[1:3]
	fmt.Println(part) // [1 2]

	// 注意: 切り出したスライスは元と同じメモリを共有している!
	part[0] = 999
	fmt.Println(nums) // [3 999 2 10] ← 元も変わる

	// --- 6. slices パッケージ (Go 1.21 から標準) ---
	sorted := slices.Clone(nums) // コピーを作る
	slices.Sort(sorted)          // その場で並べ替える
	fmt.Println(sorted, nums)    // [2 3 10 999] [3 999 2 10]

	fmt.Println(slices.Max(nums), slices.Contains(nums, 10)) // 999 true
}
