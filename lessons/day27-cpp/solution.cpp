// Day 27 解答例: ファイルを自動で閉じるクラスを作ろう
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day27-cpp/solution.cpp -o solution.out
// 実行:       ./solution.out
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

    // TODO 1: スコープを抜けるときに自動で呼ばれる
    ~LogFile() {
        std::cout << "[" << name_ << "] を閉じました\n";
    }

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
    }

    // TODO 2: delete を書かなくても、unique_ptr が消えるときに解放される
    auto b = std::make_unique<LogFile>("b.log");

    // TODO 3: unique_ptr はコピーできないので move で持ち主を移す
    std::vector<std::unique_ptr<LogFile>> files;
    files.push_back(std::move(b));
    std::cout << "所有者を移動: 元のポインタは空 = " << std::boolalpha << (b == nullptr) << "\n";
    std::cout << "保管中のファイル: " << files.size() << "個\n";

    std::cout << "--- main の終わり ---\n";
    return 0;
}  // files が消えるときに、中の LogFile も解放される
