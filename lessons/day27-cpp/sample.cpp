// Day 27 サンプル: RAII とスマートポインタ
// コンパイル: g++ -std=c++17 -Wall -Wextra lessons/day27-cpp/sample.cpp -o sample.out
// 実行:       ./sample.out
#include <iostream>
#include <memory>  // std::unique_ptr, std::shared_ptr
#include <string>
#include <utility>  // std::move
#include <vector>

// --- 1. デストラクタ: オブジェクトが消えるときに自動で呼ばれる関数 (~クラス名) ---
class Room {
public:
    explicit Room(const std::string& name) : name_(name) {
        std::cout << name_ << " を予約\n";
    }
    ~Room() {
        std::cout << name_ << " の予約を解除\n";  // 後片付けをここに書く
    }
    const std::string& name() const { return name_; }

private:
    std::string name_;
};

int main() {
    // --- 2. RAII: 「作ったときに確保、消えるときに解放」。スコープを抜けると自動で片付く ---
    {
        Room r("会議室A");
        std::cout << "会議中...\n";
    }  // ← ここで r のデストラクタが呼ばれる (Rust の Drop と同じ)
    std::cout << "---\n";

    // --- 3. unique_ptr: ヒープのオブジェクトを「1 人だけ」が持つ。delete は不要 ---
    std::unique_ptr<Room> p = std::make_unique<Room>("会議室B");
    std::cout << p->name() << " を使用中\n";  // -> でメンバにアクセス

    // コピーはできない (持ち主が 2 人になってしまうため)
    // std::unique_ptr<Room> q = p;  ← コンパイルエラー

    // std::move で持ち主を移す (Rust のムーブと同じ考え方)
    std::unique_ptr<Room> q = std::move(p);
    std::cout << "p は空? " << (p == nullptr ? "はい" : "いいえ") << "\n";  // はい

    // --- 4. shared_ptr: 複数で共有し、最後の 1 人がいなくなったら解放 (Rust の Rc) ---
    auto s1 = std::make_shared<Room>("会議室C");
    {
        auto s2 = s1;  // コピーできる。持ち主が 2 人に
        std::cout << "持ち主の数: " << s1.use_count() << "\n";  // 2
    }
    std::cout << "持ち主の数: " << s1.use_count() << "\n";  // 1

    // --- 5. vector に入れるときも move ---
    std::vector<std::unique_ptr<Room>> rooms;
    rooms.push_back(std::move(q));
    rooms.push_back(std::make_unique<Room>("会議室D"));
    std::cout << "--- main の終わり ---\n";
    return 0;
}  // ← ここで rooms の中身と s1 が自動的に解放される (変数は宣言と逆の順番で片付く: rooms → s1)
