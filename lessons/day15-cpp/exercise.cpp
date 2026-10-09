// Day 15 演習: 注文の集計と文字数チェック (Day 13・14 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day15-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 15
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iostream>
#include <map>
#include <sstream>
#include <string>

// TODO 3: UTF-8 の文字列の「文字数」を数えよう
//   UTF-8 では、2 バイト目以降のバイトは必ず 10xxxxxx (2進数) の形をしている。
//   つまり (c & 0xC0) != 0x80 のバイトだけ数えれば、文字の先頭の数 = 文字数になる。
//   s の各バイトを範囲 for で調べよう (unsigned char で受け取る)
int countChars(const std::string& s) {
    return 0;
}

int main() {
    std::istringstream orders("りんご みかん りんご ぶどう みかん りんご");

    // TODO 1: orders から単語を 1 つずつ取り出し、counts で個数を数えよう
    //   while (orders >> item) { ... } の形。std::map は [] で読むとないキーが 0 で作られるので、
    //   counts[item]++ だけで数えられる (ここでは便利な性質として使う)
    std::map<std::string, int> counts;
    std::string item;

    // TODO 2: counts を範囲 for で回して「名前: 個数」を出力しよう
    //   std::map はキーの順に並んでいるので、並べ替えは不要
    //   ヒント: for (const auto& [fruit, n] : counts)
    std::cout << "(ここに果物ごとの個数が出る)\n";

    std::cout << "種類: " << counts.size() << "\n";

    // TODO 4: 名前の文字数 (countChars) とバイト数 (size()) を表示しよう
    const std::string name = "山田太郎";
    std::cout << "名前: " << name << " (" << 0 << "文字 / " << 0 << "バイト)\n";
    return 0;
}
