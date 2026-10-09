// Day 30 演習 (ミニプロジェクト): CSV の成績集計ツール
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day30-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 30
//
// scores.csv (同じフォルダにある) を読み込み、生徒ごと・科目ごとに集計します。
// これまでに学んだ「vector・string・optional・クラス・RAII」を組み合わせます。
#include <fstream>
#include <iomanip>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <vector>

struct Student {
    std::string name;
    std::vector<int> scores;  // 国語・数学・英語の順

    int total() const {
        int sum = 0;
        for (int s : scores) sum += s;
        return sum;
    }
};

// TODO 1: line を区切り文字 sep で分割した vector を返そう
//   std::istringstream と std::getline(ss, field, sep) を使う (サンプル参照)
//   例: split("a,b,c", ',') → {"a", "b", "c"}
std::vector<std::string> split(const std::string& line, char sep) {
    return {line};
}

// TODO 2: 1 行分の項目 (名前と 3 科目の点数) から Student を作ろう
//   - fields の数が 4 でなければ std::nullopt を返す
//   - 点数は std::stoi で数値にする。空文字などで例外が出たら std::nullopt を返す
//     (try / catch (const std::exception&) で囲む)
std::optional<Student> parseRow(const std::vector<std::string>& fields) {
    return std::nullopt;
}

// scores.csv を開く (完成済み)。ルートからでも、このフォルダからでも実行できるように 2 か所を探す
std::ifstream openScores() {
    std::ifstream in("scores.csv");
    if (!in) in.open("lessons/day30-cpp/scores.csv");
    return in;
}

int main() {
    std::ifstream in = openScores();
    if (!in) {
        std::cerr << "scores.csv が見つかりません\n";
        return 1;
    }
    std::cout << "読み込み: scores.csv\n";
    std::cout << std::fixed << std::setprecision(1);

    std::vector<Student> students;
    std::string line;
    int lineNo = 0;
    while (std::getline(in, line)) {
        lineNo++;
        if (lineNo == 1) continue;  // 1 行目は見出しなので飛ばす

        std::optional<Student> student = parseRow(split(line, ','));
        if (!student) {
            std::cout << "スキップ: " << lineNo << "行目 (" << line << ")\n";
            continue;
        }
        double average = static_cast<double>(student->total()) / student->scores.size();
        std::cout << student->name << ": 合計 " << student->total() << " / 平均 " << average << "\n";
        students.push_back(*student);
    }

    // TODO 3: 科目ごとの平均を出力しよう (国語・数学・英語の順)
    //   形式は「国語: 77.7」。students の scores[i] を合計して、人数で割る
    const std::vector<std::string> subjects = {"国語", "数学", "英語"};
    std::cout << "--- 科目ごとの平均 ---\n";

    // TODO 4: 合計点がいちばん高い生徒を「最高合計: 高橋 (273点)」の形で出力しよう
    //   students が空のときは何も出力しない
    return 0;
}
