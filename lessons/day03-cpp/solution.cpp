// Day 3 解答例: テストの成績を集計しよう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day03-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iomanip>
#include <iostream>

int main() {
    // TODO 1
    int score1 = 78;
    int score2 = 85;
    int score3 = 82;
    const int count = 3;

    // TODO 2
    int total = score1 + score2 + score3;

    // TODO 3: 片方を double にすれば、割り算全体が double で計算される
    double average = static_cast<double>(total) / count;

    // TODO 4: 比較の結果はそのまま bool
    const int passLine = 80;
    bool passed = average >= passLine;

    std::cout << "=== 成績集計 ===\n";
    std::cout << "受験者数: " << count << "人\n";
    std::cout << "合計点: " << total << "点\n";
    std::cout << std::fixed << std::setprecision(1);
    std::cout << "平均点: " << average << "点\n";
    std::cout << "合格ライン: " << passLine << "点\n";
    std::cout << std::boolalpha;
    std::cout << "合格: " << passed << "\n";
    return 0;
}
