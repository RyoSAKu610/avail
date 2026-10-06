// Day 12 演習: 売上データを集計しよう (Day 10・11 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day12-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 12
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

// vector を "1, 2, 3" の形の文字列にする (完成済み)
std::string join(const std::vector<int>& v) {
    std::string s;
    for (size_t i = 0; i < v.size(); i++) {
        if (i > 0) s += ", ";
        s += std::to_string(v[i]);
    }
    return s;
}

int main() {
    const std::vector<int> sales = {1200, 800, 3000, 450, 2200};

    // TODO 1: 1000 円以上の売上だけを large に集めよう (範囲 for と push_back)
    std::vector<int> large;

    // TODO 2: すべての売上を税込 (×110÷100) にして withTax に集めよう
    std::vector<int> withTax;

    // TODO 3: 合計を std::accumulate で計算しよう
    int total = 0;

    // TODO 4: 最大値を std::max_element で求めよう (戻り値に * を付けて値を取り出す)
    int maxSale = 0;

    // TODO 5: sales をコピーした ascending を std::sort で昇順に並べよう
    //   sales は const なので、そのまま sort しようとするとコンパイルエラーになる
    std::vector<int> ascending;

    std::cout << "売上: " << join(sales) << "\n";
    std::cout << "1000円以上: " << join(large) << "\n";
    std::cout << "税込: " << join(withTax) << "\n";
    std::cout << "合計: " << total << "円\n";
    std::cout << "最大: " << maxSale << "円\n";
    std::cout << "昇順: " << join(ascending) << "\n";
    std::cout << "元の順番: " << join(sales) << "\n";
    return 0;
}
