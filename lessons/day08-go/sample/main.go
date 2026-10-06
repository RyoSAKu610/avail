// Day 8 サンプル: Go の条件分岐とループ
// 実行: go run ./lessons/day08-go/sample
package main

import (
	"fmt"
	"strconv"
)

func main() {
	// --- 1. if: 条件に ( ) は不要、{ } は必須 ---
	temp := 28
	if temp >= 30 {
		fmt.Println("真夏日")
	} else if temp >= 25 {
		fmt.Println("夏日") // ← これが出る
	} else {
		fmt.Println("過ごしやすい")
	}

	// --- 2. if の初期化文: 「; 」の前で変数を作り、その if の中だけで使う ---
	if n, err := strconv.Atoi("42"); err == nil {
		fmt.Println("数値に変換できた:", n)
	}
	// ここでは n も err も使えない (スコープが if の中だけ)

	// --- 3. ループは for だけ。3 つの書き方がある ---
	for i := 0; i < 3; i++ { // C 言語風 (Python の range(3))
		fmt.Print(i, " ")
	}
	fmt.Println()

	money := 100
	for money < 1000 { // 条件だけ書くと while と同じ
		money *= 2
	}
	fmt.Println(money) // 1600

	for i, fruit := range []string{"りんご", "みかん"} { // range で添字と値
		fmt.Println(i, fruit)
	}

	// --- 4. switch: break は不要 (一致した case だけ実行される) ---
	day := "土"
	switch day {
	case "土", "日": // カンマで複数の値をまとめられる
		fmt.Println("休日")
	default:
		fmt.Println("平日")
	}

	// --- 5. 条件を書かない switch は、if-else の連続の代わりに使える ---
	score := 74
	switch {
	case score >= 80:
		fmt.Println("優")
	case score >= 70:
		fmt.Println("良") // ← これが出る
	default:
		fmt.Println("可以下")
	}

	// --- 6. 条件は bool だけ。0 や "" をそのまま条件にはできない ---
	// if score { }  ← コンパイルエラー: non-boolean condition in if statement
}
