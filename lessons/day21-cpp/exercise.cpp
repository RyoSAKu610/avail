// Day 21 演習: 年齢の入力チェック (Day 19・20 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day21-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 21
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iostream>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

// TODO 1: 文字列 text を年齢に変換して返そう。おかしな入力なら例外を投げる
//   - 数値でなければ std::invalid_argument("数値ではありません") を throw
//     std::stoi(text, &pos) は変換できた文字数を pos に入れる。
//     例外が出たとき、または pos != text.size() (後ろに余計な文字がある) なら「数値でない」
//   - 0 未満または 150 より大きければ std::out_of_range("範囲外です (0〜150)") を throw
int parseAge(const std::string& text) {
    return 0;
}

// TODO 3: 例外の代わりに std::optional で結果を返す版を作ろう
//   parseAge を try で呼び、成功なら年齢を、例外なら std::nullopt を返す
std::optional<int> tryParseAge(const std::string& text) {
    return std::nullopt;
}

int main() {
    const std::vector<std::string> inputs = {"25", "abc", "-3", "200", "42"};
    int ok = 0;
    int ng = 0;

    for (const std::string& text : inputs) {
        // TODO 2: try / catch で囲もう。
        //   成功したら「"25" → 25歳」と出力して ok を増やす
        //   std::exception を const 参照で受け取り、「"abc" → エラー: 数値ではありません」と出力して ng を増やす
        //   (invalid_argument も out_of_range も std::exception の子クラス)
        int age = parseAge(text);
        std::cout << "\"" << text << "\" → " << age << "歳\n";
    }
    std::cout << "OK: " << ok << "件 / エラー: " << ng << "件\n";

    // TODO 3 ができたら、この 2 行の出力が「42」と「なし」になる
    std::cout << "tryParseAge(\"42\"): " << (tryParseAge("42") ? std::to_string(*tryParseAge("42")) : "なし") << "\n";
    std::cout << "tryParseAge(\"abc\"): " << (tryParseAge("abc") ? std::to_string(*tryParseAge("abc")) : "なし") << "\n";
    return 0;
}
