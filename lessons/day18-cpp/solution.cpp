// Day 18 解答例: 銀行口座クラスを作ろう (Day 16・17 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day18-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iostream>
#include <string>

class BankAccount {
public:
    // TODO 1: balance_ と count_ はメンバのデフォルト値 0 が使われる
    BankAccount(const std::string& owner) : owner_(owner) {}

    // TODO 2
    void deposit(int amount) {
        balance_ += amount;
        count_++;
    }

    // TODO 3
    bool withdraw(int amount) {
        if (amount > balance_) return false;
        balance_ -= amount;
        count_++;
        return true;
    }

    // TODO 4
    const std::string& owner() const { return owner_; }
    int balance() const { return balance_; }
    int count() const { return count_; }

    // TODO 5: private にすると、外からは getter 経由でしか読めない
private:
    std::string owner_;
    int balance_ = 0;
    int count_ = 0;
};

int main() {
    BankAccount account("山田 太郎");
    std::cout << "口座: " << account.owner() << "\n";

    account.deposit(5000);
    std::cout << "入金 5000 → 残高 " << account.balance() << "円\n";

    for (int amount : {2000, 9000}) {
        if (account.withdraw(amount)) {
            std::cout << "出金 " << amount << " → 残高 " << account.balance() << "円\n";
        } else {
            std::cout << "出金 " << amount << " → 残高不足 (残高 " << account.balance() << "円)\n";
        }
    }
    std::cout << "取引回数: " << account.count() << "\n";
    return 0;
}
