// Day 15 サンプル: C++ の std::map と std::string
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day15-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <map>
#include <sstream>  // std::istringstream
#include <string>
#include <unordered_map>

int main() {
    // --- 1. std::map: キーの順番に自動で並ぶ辞書 ---
    std::map<std::string, int> stock = {{"りんご", 3}, {"みかん", 5}};
    stock["ぶどう"] = 2;  // 追加
    stock["りんご"]++;    // 更新
    for (const auto& [fruit, n] : stock) {  // 構造化束縛 (C++17): キーと値を取り出す
        std::cout << fruit << ": " << n << "\n";  // キーの順 (文字コード順) に並ぶ
    }

    // --- 2. 注意: [] で読むと、ないキーが「作られてしまう」 ---
    std::cout << stock["メロン"] << "\n";  // 0 (しかも "メロン" が追加される!)
    std::cout << stock.size() << "\n";     // 4

    // 調べるだけなら count / find を使う
    std::cout << stock.count("いちご") << "\n";  // 0 (追加されない)
    auto it = stock.find("みかん");
    if (it != stock.end()) {
        std::cout << "みかんは " << it->second << " 個\n";  // first がキー、second が値
    }

    // --- 3. unordered_map: 順番はバラバラだが、要素が多いと速い (Go の map に近い) ---
    std::unordered_map<std::string, int> price = {{"コーヒー", 500}};
    std::cout << price.at("コーヒー") << "\n";  // at はないキーで例外 (作らない)

    // --- 4. std::string の操作 ---
    std::string text = "りんご,みかん";
    std::cout << text.find("みかん") << "\n";  // 10 (バイト位置。見つからないと std::string::npos)
    std::cout << text + "!" << "\n";           // + で連結
    std::cout << std::string(10, '=') << "\n"; // ==========

    // --- 5. 空白区切りで単語を取り出す ---
    std::istringstream words("A B  C");
    std::string w;
    while (words >> w) {  // 取り出せる間くり返す
        std::cout << "[" << w << "]";
    }
    std::cout << "\n";  // [A][B][C]

    // --- 6. std::string も UTF-8 のバイト列。size() はバイト数 ---
    std::string name = "山田太郎";
    std::cout << name.size() << "\n";         // 12
    std::cout << name.substr(0, 3) << "\n";   // 山 (バイト単位で切り出す)
    return 0;
}
