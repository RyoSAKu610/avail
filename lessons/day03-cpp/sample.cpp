// Day 3 サンプル: C++ の変数と型
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day03-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <string>

int main() {
    // --- 1. 変数は「型 名前 = 値;」 ---
    int year = 1;
    std::string company = "株式会社サンプル";
    year = year + 1;  // C++ の変数はデフォルトで変更できる (Rust と逆)
    std::cout << company << " " << year << "年目\n";

    // --- 2. const を付けると変更できなくなる (Rust の let に近い) ---
    const int taxRate = 10;
    // taxRate = 8;  ← コンパイルエラー: assignment of read-only variable
    std::cout << "消費税率: " << taxRate << "%\n";

    // --- 3. auto で型推論 ---
    auto count = 3;    // int
    auto price = 1.5;  // double
    std::cout << count * price << "\n";  // 4.5

    // --- 4. 整数同士の割り算は切り捨て (Rust・Go と同じ) ---
    int total = 7;
    int people = 2;
    std::cout << total / people << "\n";                       // 3
    std::cout << static_cast<double>(total) / people << "\n";  // 3.5

    // --- 5. {} で初期化すると、危ない変換をコンパイラが止めてくれる ---
    int a{42};
    // int b{3.7};  ← コンパイルエラー (narrowing): 小数点以下が消えるため
    int c = 3.7;  // = だと 3 になってしまう (コンパイラによっては警告すら出ない)
    std::cout << a << " " << c << "\n";

    // --- 6. bool はそのまま出力すると 1 / 0 になる ---
    bool passed = true;
    std::cout << passed << "\n";                      // 1
    std::cout << std::boolalpha << passed << "\n";    // true
    return 0;
}
