// Day 21 サンプル: C++ の例外と std::optional
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day21-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <map>
#include <optional>
#include <stdexcept>  // std::invalid_argument, std::out_of_range など
#include <string>

// --- 1. throw で例外を投げる (JavaScript・Python と同じ考え方) ---
int divide(int a, int b) {
    if (b == 0) {
        throw std::invalid_argument("0 で割ることはできません");
    }
    return a / b;
}

// --- 2. std::optional: 「値があるかもしれないし、ないかもしれない」(Rust の Option) ---
std::optional<std::string> findUser(int id) {
    static const std::map<int, std::string> users = {{1, "佐藤"}, {2, "鈴木"}};
    auto it = users.find(id);
    if (it == users.end()) {
        return std::nullopt;  // 値なし (Rust の None)
    }
    return it->second;  // 値あり (Rust の Some)
}

int main() {
    // --- 3. try / catch。catch は種類ごとに書ける (上から順に一致を探す) ---
    try {
        std::cout << divide(10, 2) << "\n";  // 5
        std::cout << divide(1, 0) << "\n";   // ここで throw
    } catch (const std::invalid_argument& e) {  // const 参照で受け取るのが定石
        std::cout << "エラー: " << e.what() << "\n";  // what() でメッセージ
    } catch (const std::exception& e) {  // その他すべての標準例外
        std::cout << "その他のエラー: " << e.what() << "\n";
    }

    // --- 4. 標準ライブラリの例外 ---
    try {
        std::stoi("abc");  // 文字列 → int。変換できないと例外
    } catch (const std::invalid_argument& e) {
        std::cout << "stoi 失敗: " << e.what() << "\n";  // stoi
    }
    std::cout << std::stoi("12abc") << "\n";  // 12 ← 先頭だけ変換して成功してしまう!

    // --- 5. optional の使い方 ---
    for (int id : {1, 9}) {
        std::optional<std::string> name = findUser(id);
        if (name) {  // 値があれば true
            std::cout << *name << "\n";  // * で中身を取り出す
        } else {
            std::cout << "ID " << id << " は見つかりません\n";
        }
    }
    std::cout << findUser(9).value_or("(ゲスト)") << "\n";  // なければ代わりの値
    return 0;
}
