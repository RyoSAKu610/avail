// Day 17 演習: 銀行口座を struct で作ろう (Day 16 と同じお題)
// 実行:       go run ./lessons/day17-go/exercise
// 答え合わせ: node check.mjs 17
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
package main

import "fmt"

// TODO 1: 残高 balance と取引回数 count を int のフィールドとして追加しよう
// (小文字で始めると、別のパッケージからは直接書き換えられない)
type BankAccount struct {
	Owner string
}

// TODO 2: NewBankAccount で Owner を設定しよう (balance と count はゼロ値 0 のままで OK)
func NewBankAccount(owner string) *BankAccount {
	return &BankAccount{Owner: "???"}
}

// TODO 3: 入金。残高に amount を足し、取引回数を 1 増やそう
// 注意: 今のレシーバ (a BankAccount) は値レシーバなので、書き換えてもコピーが変わるだけ。
// (a *BankAccount) に直そう
func (a BankAccount) Deposit(amount int) {
}

// TODO 4: 出金。残高が足りなければ false を返す。足りれば引いて回数を増やし true を返す
func (a BankAccount) Withdraw(amount int) bool {
	return false
}

// TODO 5: 残高と取引回数を返すメソッドを完成させよう (読むだけなので値レシーバで OK)
func (a BankAccount) Balance() int {
	return 0
}

func (a BankAccount) Count() int {
	return 0
}

// ここから下は変更しなくて OK
func main() {
	account := NewBankAccount("山田 太郎")
	fmt.Printf("口座: %s\n", account.Owner)

	account.Deposit(5000)
	fmt.Printf("入金 5000 → 残高 %d円\n", account.Balance())

	for _, amount := range []int{2000, 9000} {
		if account.Withdraw(amount) {
			fmt.Printf("出金 %d → 残高 %d円\n", amount, account.Balance())
		} else {
			fmt.Printf("出金 %d → 残高不足 (残高 %d円)\n", amount, account.Balance())
		}
	}
	fmt.Printf("取引回数: %d\n", account.Count())
}
