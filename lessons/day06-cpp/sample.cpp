// Day 6 サンプル: C++ の関数と参照渡し
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day06-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <string>

// --- 1. 関数の定義: 戻り値の型が先頭に来る ---
int add(int a, int b) {
    return a + b;
}

// --- 2. 値渡し: 引数はコピーされるので、呼び出し元の変数は変わらない ---
void addOneByValue(int x) {
    x = x + 1;
}

// --- 3. 参照渡し (&): 呼び出し元の変数そのものを操作する ---
void addOneByRef(int& x) {
    x = x + 1;
}

// --- 4. const 参照: コピーせずに渡し、変更もさせない (大きな値を渡すときの定番) ---
void printName(const std::string& name) {
    // name = "別名";  ← コンパイルエラー: const なので変更できない
    std::cout << "名前: " << name << "\n";
}

// --- 5. デフォルト引数 (宣言の後ろの引数にだけ付けられる) ---
int withTax(int price, int rate = 10) {
    return price * (100 + rate) / 100;
}

// --- 6. オーバーロード: 引数の型が違えば同じ名前の関数を作れる ---
double half(double x) { return x / 2; }
int half(int x) { return x / 2; }

int main() {
    std::cout << add(2, 3) << "\n";  // 5

    int n = 10;
    addOneByValue(n);
    std::cout << n << "\n";  // 10 (変わらない)
    addOneByRef(n);
    std::cout << n << "\n";  // 11 (変わる)

    printName("佐藤");
    std::cout << withTax(1000) << " " << withTax(1000, 8) << "\n";  // 1100 1080
    std::cout << half(7) << " " << half(7.0) << "\n";               // 3 3.5
    return 0;
}
