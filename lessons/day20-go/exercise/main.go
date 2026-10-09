// Day 20 演習: 年齢の入力チェック (Day 19 と同じお題)
// 実行:       go run ./lessons/day20-go/exercise
// 答え合わせ: node check.mjs 20
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import (
	"errors"
	"fmt"
	"strconv"
)

// 入力チェックの失敗を表すエラー (完成済み)
var (
	ErrNotNumber  = errors.New("数値ではありません")
	ErrOutOfRange = errors.New("範囲外です (0〜150)")
)

// TODO 1: 文字列 text を年齢に変換して返そう。おかしな入力ならエラーを返す
// strconv.Atoi が失敗したら 0, ErrNotNumber を返す。
// 0 未満または 150 より大きければ 0, ErrOutOfRange を返す。
// 成功したら 年齢, nil を返す
func parseAge(text string) (int, error) {
	age, _ := strconv.Atoi(text) // _ でエラーを捨てている。これが一番やってはいけない書き方
	return age, nil
}

func main() {
	inputs := []string{"25", "abc", "-3", "200", "42"}
	ok, ng := 0, 0

	for _, text := range inputs {
		// TODO 2: err != nil なら「"abc" → エラー: 数値ではありません」と出力して ng を増やし、
		// continue で次の入力へ進もう。成功なら今の出力をして ok を増やす
		// ヒント: %q を使うと文字列を "" で囲んで表示できる。エラーは %v で表示する
		age, err := parseAge(text)
		_ = err // 今は err を使っていないので、コンパイルを通すために捨てている (TODO 2 で消す)
		fmt.Printf("%q → %d歳\n", text, age)
	}

	// TODO 3: 「範囲外」のエラーが何件あったかも数えて出力しよう
	// errors.Is(err, ErrOutOfRange) で判定できる (TODO 2 のループの中で数える)
	outOfRange := 0

	fmt.Printf("OK: %d件 / エラー: %d件 (うち範囲外: %d件)\n", ok, ng, outOfRange)
}
