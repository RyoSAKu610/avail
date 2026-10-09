// Day 30 解答例 (ミニプロジェクト): CSV の成績集計ツール
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day30-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
#include <fstream>
#include <iomanip>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <vector>

struct Student {
    std::string name;
    std::vector<int> scores;

    int total() const {
        int sum = 0;
        for (int s : scores) sum += s;
        return sum;
    }
};

// TODO 1: getline の第 3 引数に区切り文字を渡すと、そこまでを 1 項目として読む
std::vector<std::string> split(const std::string& line, char sep) {
    std::vector<std::string> fields;
    std::istringstream ss(line);
    std::string field;
    while (std::getline(ss, field, sep)) {
        fields.push_back(field);
    }
    return fields;
}

// TODO 2: 例外を optional に変換する (Day 21 と同じ形)
std::optional<Student> parseRow(const std::vector<std::string>& fields) {
    if (fields.size() != 4) return std::nullopt;
    Student s{fields[0], {}};
    try {
        for (size_t i = 1; i < fields.size(); i++) {
            s.scores.push_back(std::stoi(fields[i]));
        }
    } catch (const std::exception&) {
        return std::nullopt;
    }
    return s;
}

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
        if (lineNo == 1) continue;

        std::optional<Student> student = parseRow(split(line, ','));
        if (!student) {
            std::cout << "スキップ: " << lineNo << "行目 (" << line << ")\n";
            continue;
        }
        double average = static_cast<double>(student->total()) / student->scores.size();
        std::cout << student->name << ": 合計 " << student->total() << " / 平均 " << average << "\n";
        students.push_back(*student);
    }

    // TODO 3
    const std::vector<std::string> subjects = {"国語", "数学", "英語"};
    std::cout << "--- 科目ごとの平均 ---\n";
    for (size_t i = 0; i < subjects.size(); i++) {
        int sum = 0;
        for (const Student& s : students) sum += s.scores[i];
        std::cout << subjects[i] << ": " << static_cast<double>(sum) / students.size() << "\n";
    }

    // TODO 4: 先頭を仮の最高にして、より大きい人がいたら入れ替える
    if (!students.empty()) {
        const Student* best = &students[0];
        for (const Student& s : students) {
            if (s.total() > best->total()) best = &s;
        }
        std::cout << "最高合計: " << best->name << " (" << best->total() << "点)\n";
    }
    return 0;
}
