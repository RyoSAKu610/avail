// Day 24 演習: ポインタを使う関数を作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day24-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 24
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iostream>
#include <vector>

// TODO 1: ポインタ a と b が指している 2 つの値を入れ替えよう
//   ヒント: int tmp = *a; のように * で値を読み書きする
void swapValues(int* a, int* b) {}

// TODO 2: v の中で最大の要素を「指すポインタ」を返そう。v が空なら nullptr を返す
//   ヒント: 範囲 for で const int& x として受け取れば、&x でその要素のアドレスが取れる
const int* findMax(const std::vector<int>& v) {
    return nullptr;
}

// TODO 3: price が指す金額を percent % 引きにしよう (×(100 - percent)÷100)
//   price が nullptr のときは何もしない (チェックせずに *price すると落ちる)
void applyDiscount(int* price, int percent) {}

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
