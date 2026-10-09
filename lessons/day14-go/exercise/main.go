// Day 14 演習: 注文の集計と文字数チェック (Day 13 と同じお題)
// 実行:       go run ./lessons/day14-go/exercise
// 答え合わせ: node check.mjs 14
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import (
	"fmt"
	"slices"
	"strings"
)

func main() {
	orders := "りんご みかん りんご ぶどう みかん りんご"

	// TODO 1: orders を空白で区切ってスライスにしよう
	// 今は "," で区切っているので、全体が 1 つの要素のまま。strings.Fields(orders) に直そう
	items := strings.Split(orders, ",")

	// TODO 2: 果物ごとの個数を map で数えよう
	// ないキーはゼロ値 0 が返るので、counts[item]++ だけで数えられる
	counts := map[string]int{}
	for _, item := range items {
		fmt.Println("数える:", item)
	}

	// TODO 3: map の range は順番がバラバラなので、キーを集めて並べ替えてから出力しよう
	// 1) keys に counts のキーを append する  2) slices.Sort(keys)  3) keys を range で出力
	keys := []string{}
	slices.Sort(keys)
	fmt.Println("(ここに果物ごとの個数が出る)")

	fmt.Printf("種類: %d\n", len(counts))

	// TODO 4: 名前の「文字数」と「バイト数」を求めよう
	// バイト数は len(name)。文字数は utf8.RuneCountInString(name)
	// (使うには import に "unicode/utf8" を追加する)
	name := "山田太郎"
	chars := 0
	bytes := 0
	fmt.Printf("名前: %s (%d文字 / %dバイト)\n", name, chars, bytes)
}
