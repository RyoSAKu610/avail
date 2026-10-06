// Day 18 サンプル: C++ の class
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day18-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <string>

// --- 1. class: public と private でアクセスを分ける ---
class Employee {
public:
    // コンストラクタ: クラスと同じ名前。: の後ろに「メンバ初期化子リスト」を書く
    Employee(const std::string& name, int salary) : name_(name), salary_(salary) {}

    void raise(int percent) {
        salary_ = salary_ * (100 + percent) / 100;
    }

    // 末尾の const: 「このメソッドはメンバを書き換えない」という約束 (Rust の &self)
    int salary() const { return salary_; }
    const std::string& name() const { return name_; }

private:
    // 外から直接触れないメンバ変数。名前の末尾に _ を付けるのはよくある慣習
    std::string name_;
    int salary_;
};

// --- 2. 継承: public で親クラスを指定する ---
class Manager : public Employee {
public:
    Manager(const std::string& name, int salary, const std::string& team)
        : Employee(name, salary), team_(team) {}  // 親のコンストラクタを呼ぶ

    std::string describe() const { return name() + " (" + team_ + "チーム)"; }

private:
    std::string team_;
};

// --- 3. struct: デフォルトが public なだけで、class とほぼ同じ ---
struct Point {
    int x = 0;  // メンバのデフォルト値
    int y = 0;
};

int main() {
    Employee e("佐藤", 220000);  // new なしで作れる (スタックに置かれる)
    e.raise(5);
    std::cout << e.name() << " " << e.salary() << "\n";  // 佐藤 231000
    // e.salary_ = 0;  ← コンパイルエラー: private

    Manager m("鈴木", 400000, "開発");
    std::cout << m.describe() << " " << m.salary() << "\n";  // 鈴木 (開発チーム) 400000

    // --- 4. オブジェクトの代入はコピー (Go の struct と同じ) ---
    Point a{1, 2};
    Point b = a;
    b.x = 99;
    std::cout << a.x << " " << b.x << "\n";  // 1 99

    const Employee boss("高橋", 500000);
    std::cout << boss.salary() << "\n";  // const オブジェクトからは const メソッドだけ呼べる
    // boss.raise(1);  ← コンパイルエラー
    return 0;
}
