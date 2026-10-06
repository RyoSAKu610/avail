// Day 30 サンプル: ファイルの読み書きと文字列の分割
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day30-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <cstdio>   // std::remove (ファイル削除)
#include <fstream>  // std::ifstream (読む), std::ofstream (書く)
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

int main() {
    const std::string path = "drill15-sample.txt";

    // --- 1. ファイルに書く: std::ofstream は std::cout と同じ << で書ける ---
    {
        std::ofstream out(path);
        if (!out) {  // 開けなかったら false になる
            std::cerr << "書き込み用に開けません: " << path << "\n";
            return 1;
        }
        out << "りんご,3\n";
        out << "みかん,5\n";
    }  // スコープを抜けると自動で閉じる (Day 27 の RAII)

    // --- 2. ファイルを 1 行ずつ読む: std::getline ---
    std::ifstream in(path);
    if (!in) {
        std::cerr << "読み込み用に開けません: " << path << "\n";
        return 1;
    }
    std::string line;
    while (std::getline(in, line)) {  // 読めるあいだ繰り返す
        // --- 3. 区切り文字で分割: getline の第 3 引数に区切り文字を渡す ---
        std::istringstream ss(line);
        std::string name, count;
        std::getline(ss, name, ',');
        std::getline(ss, count, ',');
        std::cout << name << " は " << std::stoi(count) << " 個\n";
    }
    in.close();
    std::remove(path.c_str());  // 後片付け (c_str() で C 言語の文字列に変換)

    // --- 4. エラーは std::cerr に出す (std::cout とは別の出力先) ---
    std::cerr << "これは標準エラー出力 (ログやエラー用)\n";
    return 0;
}
