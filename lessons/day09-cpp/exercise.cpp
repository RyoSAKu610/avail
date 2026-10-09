// Day 9 演習: 九九の表と曜日チェック
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day09-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 9
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
#include <iomanip>  // std::setw (表示幅をそろえる)
#include <iostream>
#include <string>
#include <vector>

// TODO 1: 曜日番号 (0=日, 1=月, ..., 6=土) から曜日名を返そう
//   switch を使い、0〜6 のそれぞれに case を書く (return するなら break は不要)
//   どれにも当てはまらないときは "?" を返す
std::string dayName(int weekday) {
    return "?";
}

// TODO 2: 0 (日) と 6 (土) なら "休日"、それ以外は "平日" を返そう
//   switch で case 0: と case 6: を縦に並べ、変数 result に代入して break する書き方にしよう
std::string dayType(int weekday) {
    std::string result = "平日";
    return result;
}

int main() {
    // TODO 3: 九九の 1〜3 の段を表示しよう
    //   for の中に for を書く (二重ループ)。外側が段 (1〜3)、内側がかける数 (1〜9)
    //   各数値は std::setw(3) で幅 3 にそろえる
    std::cout << "1の段:";
    std::cout << std::setw(3) << 1 * 1;
    std::cout << "\n";

    // TODO 4: weekdays の全要素について「月曜日: 平日」の形で出力しよう (範囲 for を使う)
    std::vector<int> weekdays = {1, 6, 0};
    std::cout << dayName(weekdays[0]) << "曜日: " << dayType(weekdays[0]) << "\n";
    return 0;
}
