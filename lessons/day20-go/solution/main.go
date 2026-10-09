// Day 20 解答例: 年齢の入力チェック (Day 19 と同じお題)
// 実行: go run ./lessons/day20-go/solution
package main

import (
	"errors"
	"fmt"
	"strconv"
)

var (
	ErrNotNumber  = errors.New("数値ではありません")
	ErrOutOfRange = errors.New("範囲外です (0〜150)")
)

// TODO 1: エラーは最後の戻り値で返す。失敗したら早めに return
func parseAge(text string) (int, error) {
	age, err := strconv.Atoi(text)
	if err != nil {
		return 0, ErrNotNumber
	}
	if age < 0 || age > 150 {
		return 0, ErrOutOfRange
	}
	return age, nil
}

func main() {
	inputs := []string{"25", "abc", "-3", "200", "42"}
	ok, ng := 0, 0
	outOfRange := 0

	for _, text := range inputs {
		// TODO 2: エラーなら処理して continue。成功の処理は if の外に書く (アーリーリターン)
		age, err := parseAge(text)
		if err != nil {
			fmt.Printf("%q → エラー: %v\n", text, err)
			ng++
			// TODO 3
			if errors.Is(err, ErrOutOfRange) {
				outOfRange++
			}
			continue
		}
		fmt.Printf("%q → %d歳\n", text, age)
		ok++
	}

	fmt.Printf("OK: %d件 / エラー: %d件 (うち範囲外: %d件)\n", ok, ng, outOfRange)
}
