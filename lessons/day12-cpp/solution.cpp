// Day 12 解答例: 売上データを集計しよう (Day 10・11 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day12-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

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

    // TODO 1・2: 1 回のループでまとめて処理する
    std::vector<int> large;
    std::vector<int> withTax;
    for (int s : sales) {
        if (s >= 1000) large.push_back(s);
        withTax.push_back(s * 110 / 100);
    }

    // TODO 3: 初期値 0 から順に足していく
    int total = std::accumulate(sales.begin(), sales.end(), 0);

    // TODO 4: max_element は位置 (イテレータ) を返すので * で値にする
    int maxSale = *std::max_element(sales.begin(), sales.end());

    // TODO 5: 代入でコピーしてから並べ替える
    std::vector<int> ascending = sales;
    std::sort(ascending.begin(), ascending.end());

    std::cout << "売上: " << join(sales) << "\n";
    std::cout << "1000円以上: " << join(large) << "\n";
    std::cout << "税込: " << join(withTax) << "\n";
    std::cout << "合計: " << total << "円\n";
    std::cout << "最大: " << maxSale << "円\n";
    std::cout << "昇順: " << join(ascending) << "\n";
    std::cout << "元の順番: " << join(sales) << "\n";
    return 0;
}
