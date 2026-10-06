// Day 15 解答例: 注文の集計と文字数チェック (Day 13・14 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day15-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iostream>
#include <map>
#include <sstream>
#include <string>

// TODO 3: 文字の先頭バイト (10xxxxxx 以外) だけを数える
int countChars(const std::string& s) {
    int count = 0;
    for (unsigned char c : s) {
        if ((c & 0xC0) != 0x80) count++;
    }
    return count;
}

int main() {
    std::istringstream orders("りんご みかん りんご ぶどう みかん りんご");

    // TODO 1
    std::map<std::string, int> counts;
    std::string item;
    while (orders >> item) {
        counts[item]++;
    }

    // TODO 2: std::map はキーの順に並ぶ
    for (const auto& [fruit, n] : counts) {
        std::cout << fruit << ": " << n << "\n";
    }

    std::cout << "種類: " << counts.size() << "\n";

    // TODO 4
    const std::string name = "山田太郎";
    std::cout << "名前: " << name << " (" << countChars(name) << "文字 / " << name.size() << "バイト)\n";
    return 0;
}
