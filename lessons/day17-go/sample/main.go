// Day 17 サンプル: Go の struct とメソッド
// 実行: go run ./lessons/day17-go/sample
package main

import "fmt"

// --- 1. struct: フィールドの集まり (Rust の struct とほぼ同じ) ---
// 名前が大文字で始まると外部パッケージから見える (公開)、小文字なら見えない (非公開)
type Employee struct {
	Name   string
	salary int
}

// --- 2. コンストラクタの代わりに「New〇〇」という関数を作るのが慣習 ---
func NewEmployee(name string, salary int) *Employee {
	return &Employee{Name: name, salary: salary} // & でポインタを返す
}

// --- 3. メソッド: func と名前の間に「レシーバ」を書く ---
// 値レシーバ (e Employee): コピーを受け取る → 読むだけのメソッド向き
func (e Employee) Salary() int {
	return e.salary
}

// ポインタレシーバ (e *Employee): 元のデータを受け取る → 書き換えるメソッドはこちら
func (e *Employee) Raise(percent int) {
	e.salary = e.salary * (100 + percent) / 100
}

// 値レシーバで書き換えても、コピーが変わるだけ (よくあるバグ)
func (e Employee) RaiseBroken(percent int) {
	e.salary = e.salary * (100 + percent) / 100
}

// --- 4. 埋め込み: 別の struct を名前なしで含めると、そのメソッドも使える (継承の代わり) ---
type Manager struct {
	Employee
	Team string
}

func main() {
	e := NewEmployee("佐藤", 220000)
	e.Raise(5)
	fmt.Println(e.Name, e.Salary()) // 佐藤 231000

	e.RaiseBroken(50)
	fmt.Println(e.Salary()) // 231000 (変わらない!)

	// struct の値を直接作る
	m := Manager{Employee: Employee{Name: "鈴木", salary: 400000}, Team: "開発"}
	fmt.Println(m.Name, m.Team, m.Salary()) // 鈴木 開発 400000

	// --- 5. struct の代入はコピー (JavaScript のオブジェクトとは違う) ---
	a := Employee{Name: "A", salary: 1}
	b := a
	b.Name = "B"
	fmt.Println(a.Name, b.Name) // A B

	// %+v でフィールド名つきで表示できる (デバッグに便利)
	fmt.Printf("%+v\n", a) // {Name:A salary:1}
}
