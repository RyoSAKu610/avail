// Day 12 サンプル: C++ の std::vector と <algorithm>
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day12-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <algorithm>  // sort, max_element, count_if など
#include <iostream>
#include <numeric>    // accumulate
#include <vector>

void print(const std::vector<int>& v) {
    for (int x : v) std::cout << x << " ";
    std::cout << "\n";
}

int main() {
    // --- 1. 作る・追加する・長さ ---
    std::vector<int> nums = {3, 1, 2};
    nums.push_back(10);                       // 末尾に追加
    std::cout << nums.size() << "\n";         // 4
    std::cout << nums[0] << " " << nums.back() << "\n";  // 3 10

    // --- 2. [] は範囲チェックをしない。at() は範囲外で例外を投げる ---
    // nums[100];     ← 未定義動作 (何が起きるかわからない)
    // nums.at(100);  ← std::out_of_range 例外 (安全に止まる)

    // --- 3. ラムダ式: その場で作る小さな関数 ([] が目印) ---
    auto isBig = [](int n) { return n >= 3; };
    std::cout << isBig(5) << "\n";  // 1 (true)

    // --- 4. <algorithm> の関数は「範囲 (begin, end)」を受け取る ---
    long big = std::count_if(nums.begin(), nums.end(), isBig);
    std::cout << "3以上: " << big << "個\n";  // 2個

    int total = std::accumulate(nums.begin(), nums.end(), 0);  // 0 は初期値
    std::cout << "合計: " << total << "\n";                    // 16

    // max_element は「最大の要素の位置 (イテレータ)」を返すので * で値を取り出す
    int maxValue = *std::max_element(nums.begin(), nums.end());
    std::cout << "最大: " << maxValue << "\n";  // 10

    // --- 5. 新しい vector を作りながら変換・絞り込み ---
    std::vector<int> doubled;
    for (int n : nums) doubled.push_back(n * 2);
    print(doubled);  // 6 2 4 20

    // --- 6. vector は代入するとコピーされる (Go のスライスとは違う!) ---
    std::vector<int> sorted = nums;            // まるごとコピー
    std::sort(sorted.begin(), sorted.end());   // コピーだけ並べ替え
    print(sorted);  // 1 2 3 10
    print(nums);    // 3 1 2 10 (元はそのまま)
    return 0;
}
