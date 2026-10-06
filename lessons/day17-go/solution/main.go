// Day 17 解答例: 銀行口座を struct で作ろう (Day 16 と同じお題)
// 実行: go run ./lessons/day17-go/solution
package main

import "fmt"

// TODO 1
type BankAccount struct {
	Owner   string
	balance int
	count   int
}

// TODO 2: 指定しなかったフィールドはゼロ値になる
func NewBankAccount(owner string) *BankAccount {
	return &BankAccount{Owner: owner}
}

// TODO 3: 書き換えるメソッドはポインタレシーバ
func (a *BankAccount) Deposit(amount int) {
	a.balance += amount
	a.count++
}

// TODO 4
func (a *BankAccount) Withdraw(amount int) bool {
	if amount > a.balance {
		return false
	}
	a.balance -= amount
	a.count++
	return true
}

// TODO 5
func (a BankAccount) Balance() int {
	return a.balance
}

func (a BankAccount) Count() int {
	return a.count
}

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
