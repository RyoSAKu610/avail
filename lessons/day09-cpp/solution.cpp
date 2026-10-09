// Day 9 解答例: 九九の表と曜日チェック
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day09-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

// TODO 1: return すると関数を抜けるので break はいらない
std::string dayName(int weekday) {
    switch (weekday) {
        case 0: return "日";
        case 1: return "月";
        case 2: return "火";
        case 3: return "水";
        case 4: return "木";
        case 5: return "金";
        case 6: return "土";
        default: return "?";
    }
}

// TODO 2: case を縦に並べると「0 または 6」になる。代入したら break を忘れずに
std::string dayType(int weekday) {
    std::string result = "平日";
    switch (weekday) {
        case 0:
        case 6:
            result = "休日";
            break;
        default:
            break;
    }
    return result;
}

int main() {
    // TODO 3: 二重ループ
    for (int dan = 1; dan <= 3; dan++) {
        std::cout << dan << "の段:";
        for (int n = 1; n <= 9; n++) {
            std::cout << std::setw(3) << dan * n;
        }
        std::cout << "\n";
    }

    // TODO 4: 範囲 for。int は小さいのでコピー (値) で受け取ってよい
    std::vector<int> weekdays = {1, 6, 0};
    for (int w : weekdays) {
        std::cout << dayName(w) << "曜日: " << dayType(w) << "\n";
    }
    return 0;
}
