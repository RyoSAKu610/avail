// Day 3 演習: テストの成績を集計しよう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day03-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 3
//
// 今は仮の値が入っているので、出力が期待どおりになりません。
// (最初は「unused variable」の警告も出ますが、TODO を解くと消えます)
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iomanip>  // std::setprecision を使うために必要
#include <iostream>

int main() {
    // TODO 1: 3人の点数 78, 85, 82 を int で宣言しよう
    int score1 = 0;
    int score2 = 0;
    int score3 = 0;
    const int count = 3;

    // TODO 2: 合計点を計算しよう
    int total = 0;

    // TODO 3: 平均点を double で計算しよう
    //   注意: total / count は「int ÷ int」なので小数点以下が切り捨てられる!
    //   static_cast<double>(total) で片方を double にしてから割ろう
    double average = 0.0;

    // TODO 4: 合格ライン 80 を const int で宣言し、
    //   平均点が合格ライン以上なら true になる bool 変数 passed を作ろう
    //   ヒント: average >= passLine の結果はそのまま bool になる
    const int passLine = 0;
    bool passed = false;

    std::cout << "=== 成績集計 ===\n";
    std::cout << "受験者数: " << count << "人\n";
    std::cout << "合計点: " << total << "点\n";
    std::cout << std::fixed << std::setprecision(1);  // 小数点以下1桁で表示
    std::cout << "平均点: " << average << "点\n";
    std::cout << "合格ライン: " << passLine << "点\n";
    std::cout << std::boolalpha;  // bool を 1/0 ではなく true/false で表示
    std::cout << "合格: " << passed << "\n";
    return 0;
}
