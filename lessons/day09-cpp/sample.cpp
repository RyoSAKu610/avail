// Day 9 サンプル: C++ の条件分岐とループ
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day09-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <string>
#include <vector>

int main() {
    // --- 1. if / else if / else (JavaScript と同じ形) ---
    int temp = 28;
    if (temp >= 30) {
        std::cout << "真夏日\n";
    } else if (temp >= 25) {
        std::cout << "夏日\n";  // ← これが出る
    } else {
        std::cout << "過ごしやすい\n";
    }

    // --- 2. for (回数を数える) ---
    for (int i = 0; i < 3; i++) {
        std::cout << i << " ";
    }
    std::cout << "\n";

    // --- 3. 範囲 for: コンテナの要素を順に (C++11 から。Python の for x in xs) ---
    std::vector<std::string> fruits = {"りんご", "みかん"};
    for (const std::string& fruit : fruits) {  // const 参照でコピーを避ける
        std::cout << fruit << "\n";
    }

    // --- 4. while ---
    int money = 100;
    while (money < 1000) {
        money *= 2;
    }
    std::cout << money << "\n";  // 1600

    // --- 5. switch: 整数・文字・列挙型だけ使える (std::string は使えない!) ---
    int weekday = 6;  // 0=日, 1=月, ..., 6=土
    switch (weekday) {
        case 0:
        case 6:
            std::cout << "休日\n";
            break;  // break がないと下の default まで実行される
        default:
            std::cout << "平日\n";
    }

    // --- 6. 0 以外の整数やポインタは条件に書ける (true 扱い) ---
    int count = 3;
    if (count) {
        std::cout << "count は 0 ではない\n";
    }
    return 0;
}
