// Day 26 サンプル: Go の interface
// 実行: go run ./lessons/day26-go/sample
package main

import (
	"fmt"
	"math"
)

// --- 1. interface: 「このメソッドを持っているもの」という約束 ---
type Shape interface {
	Area() float64
	Name() string
}

type Rect struct{ W, H float64 }
type Circle struct{ R float64 }

// --- 2. implements のような宣言は書かない。メソッドがそろっていれば自動で満たす ---
func (r Rect) Area() float64 { return r.W * r.H }
func (r Rect) Name() string  { return "長方形" }

func (c Circle) Area() float64 { return math.Pi * c.R * c.R }
func (c Circle) Name() string  { return "円" }

// --- 3. interface を引数にすると、満たす型なら何でも受け取れる ---
func describe(s Shape) string {
	return fmt.Sprintf("%s: 面積 %.1f", s.Name(), s.Area())
}

// --- 4. 標準ライブラリの有名な interface: fmt.Stringer (String() string を持つ型) ---
type Yen int

func (y Yen) String() string { return fmt.Sprintf("%d円", int(y)) }

func main() {
	shapes := []Shape{Rect{W: 3, H: 4}, Circle{R: 1}}
	for _, s := range shapes {
		fmt.Println(describe(s))
	}

	// String() を持っていると、Println が自動で使ってくれる
	fmt.Println(Yen(1980)) // 1980円

	// --- 5. 型アサーション: interface の中身の型を取り出す ---
	var s Shape = Circle{R: 2}
	if c, ok := s.(Circle); ok {
		fmt.Println("半径", c.R) // 半径 2
	}
}
