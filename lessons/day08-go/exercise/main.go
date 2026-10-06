// Day 8 演習: FizzBuzz と営業日チェック
// 実行:       go run ./lessons/day08-go/exercise
// 答え合わせ: node check.mjs 8
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import (
	"fmt"
	"strconv"
	"strings"
)

// TODO 1: FizzBuzz を返そう。条件を書かない switch を使ってみよう
// 15 の倍数 → "FizzBuzz"、3 の倍数 → "Fizz"、5 の倍数 → "Buzz"、それ以外 → 数字の文字列
// ヒント: 割り切れるかは n%3 == 0。数字の文字列は strconv.Itoa(n)
func fizzBuzz(n int) string {
	return strconv.Itoa(n)
}

// TODO 2: 曜日から "休日" か "平日" を返そう
// "土" と "日" は休日。switch の case にカンマで 2 つの値を並べよう
func dayType(day string) string {
	return "?"
}

func main() {
	// TODO 3: 1 から 15 までの fizzBuzz の結果を results に追加しよう
	// 今は 1 だけ。for i := 1; i <= 15; i++ { ... } で囲もう
	results := []string{}
	results = append(results, fizzBuzz(1))
	fmt.Println(strings.Join(results, " "))

	// TODO 4: days の全要素について「月: 平日」の形で出力しよう
	// for _, day := range days { ... } を使う (添字はいらないので _)
	days := []string{"月", "土", "日"}
	fmt.Printf("%s: %s\n", days[0], dayType(days[0]))
}
