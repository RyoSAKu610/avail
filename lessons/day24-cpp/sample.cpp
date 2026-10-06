// Day 24 サンプル: ポインタと参照、スタックとヒープ
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day24-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <vector>

int main() {
    // --- 1. ポインタ: 変数の「住所 (アドレス)」を入れる変数 ---
    int x = 10;
    int* p = &x;  // &x で x のアドレスを取り出す。int* は「int を指すポインタ」型
    std::cout << "x のアドレス: " << p << "\n";  // 0x7ffd... のような値 (実行ごとに変わる)
    std::cout << *p << "\n";  // 10  (* で指している先の値を読む = 間接参照)
    *p = 20;                  // 指している先 (つまり x) を書き換える
    std::cout << x << "\n";   // 20

    // --- 2. 参照: 「別名」。必ず何かを指し、あとから付け替えられない ---
    int& r = x;   // r は x の別名
    r = 30;
    std::cout << x << "\n";  // 30

    // --- 3. ポインタは「何も指さない」ことができる (nullptr) ---
    int* q = nullptr;
    if (q == nullptr) {
        std::cout << "q は何も指していない\n";
    }
    // *q = 1;  ← nullptr を間接参照すると、多くの環境でクラッシュ (Segmentation fault)

    // --- 4. スタック: 関数の中の普通の変数。関数を抜けると自動で消える ---
    int onStack = 1;
    std::vector<int> v = {1, 2, 3};  // vector 自体はスタック、中身はヒープに置かれる
    std::cout << onStack + v.size() << "\n";  // 4

    // --- 5. ヒープ: new で確保。自分で delete するまで残る ---
    int* onHeap = new int(42);
    std::cout << *onHeap << "\n";  // 42
    delete onHeap;      // 返さないと「メモリリーク」
    onHeap = nullptr;   // delete 後のポインタを使うと未定義動作 (ダングリングポインタ)

    // new / delete を手で書くのは間違えやすいので、Day 27 のスマートポインタを使うのが現代の書き方

    // --- 6. 配列の要素へのポインタ ---
    int* first = &v[0];
    std::cout << *first << " " << *(first + 1) << "\n";  // 1 2 (ポインタ演算)
    return 0;
}
