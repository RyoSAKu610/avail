// Day 24 解答例: ポインタを使う関数を作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day24-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iostream>
#include <vector>

// TODO 1: * で指している先の値を読み書きする
void swapValues(int* a, int* b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

// TODO 2: 「見つからない」を nullptr で表す
const int* findMax(const std::vector<int>& v) {
    const int* best = nullptr;
    for (const int& x : v) {
        if (best == nullptr || x > *best) {
            best = &x;
        }
    }
    return best;
}

// TODO 3: 使う前に nullptr チェック
void applyDiscount(int* price, int percent) {
    if (price == nullptr) return;
    *price = *price * (100 - percent) / 100;
}

void printMax(const char* label, const std::vector<int>& scores) {
    const int* best = findMax(scores);
    if (best != nullptr) {
        std::cout << label << ": 最高点 " << *best << "\n";
    } else {
        std::cout << label << ": 最高点なし\n";
    }
}

int main() {
    int a = 10;
    int b = 20;
    std::cout << "交換前: a=" << a << ", b=" << b << "\n";
    swapValues(&a, &b);
    std::cout << "交換後: a=" << a << ", b=" << b << "\n";

    printMax("A組", {78, 92, 85});
    printMax("B組", {});

    int price = 1980;
    applyDiscount(&price, 10);
    std::cout << "割引後の価格: " << price << "円\n";
    applyDiscount(nullptr, 10);
    std::cout << "nullptr を渡しても落ちない\n";
    return 0;
}
