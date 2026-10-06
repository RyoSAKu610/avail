// Day 21 解答例: 年齢の入力チェック (Day 19・20 と同じお題)
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day21-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iostream>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

// TODO 1
int parseAge(const std::string& text) {
    int age = 0;
    size_t pos = 0;
    try {
        age = std::stoi(text, &pos);
    } catch (const std::exception&) {
        throw std::invalid_argument("数値ではありません");
    }
    if (pos != text.size()) {
        throw std::invalid_argument("数値ではありません");  // "12abc" のような入力
    }
    if (age < 0 || age > 150) {
        throw std::out_of_range("範囲外です (0〜150)");
    }
    return age;
}

// TODO 3: 例外を optional に変換する
std::optional<int> tryParseAge(const std::string& text) {
    try {
        return parseAge(text);
    } catch (const std::exception&) {
        return std::nullopt;
    }
}

int main() {
    const std::vector<std::string> inputs = {"25", "abc", "-3", "200", "42"};
    int ok = 0;
    int ng = 0;

    for (const std::string& text : inputs) {
        // TODO 2: 親クラス std::exception で受ければ、どちらの例外も捕まえられる
        try {
            int age = parseAge(text);
            std::cout << "\"" << text << "\" → " << age << "歳\n";
            ok++;
        } catch (const std::exception& e) {
            std::cout << "\"" << text << "\" → エラー: " << e.what() << "\n";
            ng++;
        }
    }
    std::cout << "OK: " << ok << "件 / エラー: " << ng << "件\n";

    std::cout << "tryParseAge(\"42\"): " << (tryParseAge("42") ? std::to_string(*tryParseAge("42")) : "なし") << "\n";
    std::cout << "tryParseAge(\"abc\"): " << (tryParseAge("abc") ? std::to_string(*tryParseAge("abc")) : "なし") << "\n";
    return 0;
}
