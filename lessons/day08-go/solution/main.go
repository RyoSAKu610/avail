// Day 8 解答例: FizzBuzz と営業日チェック
// 実行: go run ./lessons/day08-go/solution
package main

import (
	"fmt"
	"strconv"
	"strings"
)

// TODO 1: 条件を書かない switch は、上から順に最初に true になった case を実行する
func fizzBuzz(n int) string {
	switch {
	case n%15 == 0:
		return "FizzBuzz"
	case n%3 == 0:
		return "Fizz"
	case n%5 == 0:
		return "Buzz"
	default:
		return strconv.Itoa(n)
	}
}

// TODO 2
func dayType(day string) string {
	switch day {
	case "土", "日":
		return "休日"
	default:
		return "平日"
	}
}

func main() {
	// TODO 3
	results := []string{}
	for i := 1; i <= 15; i++ {
		results = append(results, fizzBuzz(i))
	}
	fmt.Println(strings.Join(results, " "))

	// TODO 4
	days := []string{"月", "土", "日"}
	for _, day := range days {
		fmt.Printf("%s: %s\n", day, dayType(day))
	}
}
