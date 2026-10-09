// Day 18 演習: 銀行口座クラスを作ろう (Day 16・17 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day18-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 18
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iostream>
#include <string>

class BankAccount {
public:
    // TODO 1: メンバ初期化子リストで owner_ に owner を入れよう
    //   形: BankAccount(const std::string& owner) : owner_(owner) {}
    BankAccount(const std::string& owner) {}

    // TODO 2: 入金。残高に amount を足し、取引回数を 1 増やそう
    void deposit(int amount) {}

    // TODO 3: 出金。足りなければ false、足りれば引いて回数を増やし true
    bool withdraw(int amount) { return false; }

    // TODO 4: 3 つの getter を完成させよう。書き換えないメソッドなので末尾に const が付いている
    const std::string& owner() const { return owner_; }
    int balance() const { return 0; }
    int count() const { return 0; }

    // TODO 5: 下の 3 つのメンバ変数を private にしよう (private: の行を追加する)
    //   private にしたあと、main の中の「やってはいけない操作」がコンパイルエラーになることを確かめたら、
    //   その行を消そう
    std::string owner_ = "???";
    int balance_ = 0;
    int count_ = 0;
};

int main() {
    BankAccount account("山田 太郎");
    std::cout << "口座: " << account.owner() << "\n";

    account.balance_ = 1000000;  // やってはいけない操作 (TODO 5 で消す)
    account.balance_ = 0;

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
