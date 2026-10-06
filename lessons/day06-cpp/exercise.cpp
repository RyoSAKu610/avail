// Day 6 演習: ポイントカードの関数を作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day06-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 6
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iostream>
#include <string>

// TODO 1: 購入金額 price から付与ポイントを返す関数を完成させよう
//   100円につき1ポイント (端数は切り捨て)。int 同士の割り算で OK
int pointsFor(int price) {
    return 0;
}

// TODO 2: 会員のポイント points に add を足す関数。
//   今は「値渡し」なので、呼び出し元の変数が変わらない。参照渡し (&) に直そう
//   (関数の中身はすでに書いてあります)
void addPoints(int points, int add) {
    points = points + add;
}

// TODO 3: 会員情報を表示する関数。name は大きな文字列かもしれないので、
//   コピーしないように const 参照 (const std::string&) で受け取るように直そう
//   出力の形式: 「山田 太郎 さん: 120pt」
void printMember(std::string name, int points) {
    std::cout << name << "\n";
}

int main() {
    const std::string name = "山田 太郎";
    int points = 100;
    printMember(name, points);

    int earned = pointsFor(2980);
    std::cout << "2,980円のお買い物で " << earned << "pt 獲得\n";
    addPoints(points, earned);
    printMember(name, points);

    addPoints(points, pointsFor(15000));
    printMember(name, points);
    return 0;
}
