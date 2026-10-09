// Day 20 サンプル: Go のエラー処理
// 実行: go run ./lessons/day20-go/sample
package main

import (
	"errors"
	"fmt"
	"strconv"
)

// --- 1. エラーは「値」。最後の戻り値に error を返すのが決まり ---
func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("0 で割ることはできません")
	}
	return a / b, nil // nil = エラーなし
}

// --- 2. 比較用のエラーを変数として用意しておく (センチネルエラー) ---
var ErrNotFound = errors.New("見つかりません")

func findUser(id int) (string, error) {
	users := map[int]string{1: "佐藤", 2: "鈴木"}
	name, ok := users[id]
	if !ok {
		// %w で包むと、元のエラーを保ったまま説明を足せる
		return "", fmt.Errorf("ID %d: %w", id, ErrNotFound)
	}
	return name, nil
}

func main() {
	// --- 3. 呼んだらすぐに if err != nil。Go で一番よく書く 3 行 ---
	q, err := divide(10, 0)
	if err != nil {
		fmt.Println("エラー:", err)
	} else {
		fmt.Println(q)
	}

	// --- 4. errors.Is: 包まれていても、元のエラーかどうかを判定できる ---
	for _, id := range []int{1, 9} {
		name, err := findUser(id)
		if errors.Is(err, ErrNotFound) {
			fmt.Println("見つからない →", err) // ID 9: 見つかりません
			continue
		}
		fmt.Println(name)
	}

	// --- 5. 標準ライブラリも同じ形 ---
	if _, err := strconv.Atoi("abc"); err != nil {
		fmt.Println(err) // strconv.Atoi: parsing "abc": invalid syntax
	}

	// --- 6. panic は「プログラムのバグ」用。普通のエラーには使わない ---
	defer fmt.Println("defer: 関数を抜けるときに必ず実行される") // 後片付けに使う
	fmt.Println("main の最後")
}
