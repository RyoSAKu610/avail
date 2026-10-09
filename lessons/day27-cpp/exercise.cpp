// Day 27 演習: ファイルを自動で閉じるクラスを作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day27-cpp/exercise.cpp -o exercise.out
// 実行:       ./exercise.out
// 答え合わせ: node check.mjs 27
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
// (本物のファイルは作らず、開く・閉じるを表示するだけ)
#include <iostream>
#include <memory>
#include <string>
#include <utility>
#include <vector>

class LogFile {
public:
    explicit LogFile(const std::string& name) : name_(name) {
        std::cout << "[" << name_ << "] を開きました\n";
    }

    // TODO 1: デストラクタ ~LogFile() を書き、「[a.log] を閉じました」と表示しよう

    void write(const std::string& text) {
        std::cout << "[" << name_ << "] に書き込み: " << text << "\n";
    }

private:
    std::string name_;
};

int main() {
    std::cout << "--- ブロックに入る ---\n";
    {
        LogFile a("a.log");
        a.write("こんにちは");
        std::cout << "--- ブロックを出る ---\n";
    }  // TODO 1 ができると、ここで「[a.log] を閉じました」と表示される

    // TODO 2: new を使うのをやめて、std::make_unique<LogFile>("b.log") で作ろう
    //   変数の型は std::unique_ptr<LogFile> (または auto)
    LogFile* b = new LogFile("b.log");

    // TODO 3: files の型を std::vector<std::unique_ptr<LogFile>> にし、
    //   push_back(std::move(b)) で持ち主を files に移そう
    //   移したあと、b は nullptr になる
    std::vector<LogFile*> files;
    files.push_back(b);
    std::cout << "所有者を移動: 元のポインタは空 = " << std::boolalpha << (b == nullptr) << "\n";
    std::cout << "保管中のファイル: " << files.size() << "個\n";

    std::cout << "--- main の終わり ---\n";
    return 0;
    // TODO 2・3 ができると、main を抜けるときに「[b.log] を閉じました」と表示される
    // (今は new したまま delete していないので、閉じられない = メモリリーク)
}
