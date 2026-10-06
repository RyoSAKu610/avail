// Day 6 解答例: ポイントカードの関数を作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day06-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <iostream>
#include <string>

// TODO 1
int pointsFor(int price) {
    return price / 100;
}

// TODO 2: & を付けると、呼び出し元の変数そのものが変わる
void addPoints(int& points, int add) {
    points = points + add;
}

// TODO 3: コピーしない & 変更しない → const 参照
void printMember(const std::string& name, int points) {
    std::cout << name << " さん: " << points << "pt\n";
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
