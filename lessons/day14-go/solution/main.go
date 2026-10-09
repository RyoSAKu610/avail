// Day 14 解答例: 注文の集計と文字数チェック (Day 13 と同じお題)
// 実行: go run ./lessons/day14-go/solution
package main

import (
	"fmt"
	"slices"
	"strings"
	"unicode/utf8"
)

func main() {
	orders := "りんご みかん りんご ぶどう みかん りんご"

	// TODO 1
	items := strings.Fields(orders)

	// TODO 2: ないキーは 0 から始まるので ++ するだけ
	counts := map[string]int{}
	for _, item := range items {
		counts[item]++
	}

	// TODO 3: キーを集めて並べ替える (Go の map は順番を持たない)
	keys := []string{}
	for fruit := range counts {
		keys = append(keys, fruit)
	}
	slices.Sort(keys)
	for _, fruit := range keys {
		fmt.Printf("%s: %d\n", fruit, counts[fruit])
	}

	fmt.Printf("種類: %d\n", len(counts))

	// TODO 4
	name := "山田太郎"
	chars := utf8.RuneCountInString(name)
	bytes := len(name)
	fmt.Printf("名前: %s (%d文字 / %dバイト)\n", name, chars, bytes)
}
