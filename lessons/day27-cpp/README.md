# Day 27 — C++ ⑨：RAII とスマートポインタ

> 所要時間 15分 ／ ラウンド9「その言語らしさ ②」 ／ 前提: Day 25・Day 26 を終えていること

## 今日のゴール

- デストラクタ `~クラス名()` を書き、スコープを抜けたときの後片付けを自動化できる
- `std::unique_ptr` と `std::make_unique` で、`delete` を書かずにヒープを扱える
- `std::move` で持ち主を移す意味を説明できる

Day 24 で見た `new` / `delete` の危険を、C++ では **RAII** という考え方で解決します。Rust の所有権と非常に近い考え方です。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Rust・Go との違いを表で確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Rust・Go との違い（3分）

| やりたいこと | Rust | Go | C++ |
| --- | --- | --- | --- |
| 消えるときの後片付け | `impl Drop` | `defer`（関数単位） | デストラクタ `~T()` |
| ヒープに 1 人で持つ | `Box<T>` | （GC 任せ） | `std::unique_ptr<T>` |
| 作る | `Box::new(x)` | `&T{}` | `std::make_unique<T>(x)` |
| 共有して持つ | `Rc<T>` / `Arc<T>` | （GC 任せ） | `std::shared_ptr<T>` |
| 持ち主を移す | 代入するだけ（ムーブ） | （考えない） | `std::move(p)` |
| 移したあとの元 | 使うとコンパイルエラー | — | **空（nullptr）になる。使えてしまう** |

覚えるのは次の 3 点です。

1. **RAII：コンストラクタで確保し、デストラクタで解放する**。スコープを抜ければ必ずデストラクタが呼ばれるので、解放忘れがなくなります。ファイル、ロック、ネットワーク接続など、メモリ以外の後片付けにも使います。
2. **ヒープは `std::make_unique` で作る**。`unique_ptr` が消えるときに自動で `delete` されます。現代の C++ では、`new` / `delete` を直接書くことはほとんどありません。
3. **`unique_ptr` はコピーできず、`std::move` で移す**。Rust ではムーブ後の変数を使うとコンパイルエラーですが、C++ では空のポインタとして使えてしまうので注意します。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day27-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) の出力で、「予約を解除」がいつ表示されるかを追ってください。

```cpp
{
    Room r("会議室A");
    std::cout << "会議中...\n";
}  // ← ここで r のデストラクタが呼ばれる (Rust の Drop と同じ)
```

`{ }` のブロックを抜けた瞬間にデストラクタが呼ばれます。Go の `defer` は「関数を抜けるとき」ですが、C++ と Rust は「ブロックを抜けるとき」です。

## 3. 演習：ファイルを自動で閉じるクラス（5分）

[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
--- ブロックに入る ---
[a.log] を開きました
[a.log] に書き込み: こんにちは
--- ブロックを出る ---
[a.log] を閉じました
[b.log] を開きました
所有者を移動: 元のポインタは空 = true
保管中のファイル: 1個
--- main の終わり ---
[b.log] を閉じました
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day27-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 27
```

直す前は「閉じました」が 1 回も表示されません。TODO 1 で `a.log` が閉じるようになり、TODO 2・3 で `b.log` も閉じるようになります。最後の行は、`main` の `return 0;` よりあとに表示される点に注目しましょう。

## 4. 確認クイズ（2分）

**Q1.** 次のコードのどこが危ない？

```cpp
void save() {
    LogFile* f = new LogFile("x.log");
    if (error) return;
    delete f;
}
```

<details><summary>答え</summary>

`error` のときに `delete` されずに関数を抜けるので、メモリリークになります（ファイルも閉じられません）。途中で例外が投げられた場合も同じです。`auto f = std::make_unique<LogFile>("x.log");` にすれば、どの道筋で抜けても自動で片付きます。

</details>

**Q2.** `std::unique_ptr<LogFile> a = std::make_unique<LogFile>("a"); auto b = a;` はコンパイルできる？

<details><summary>答え</summary>

できません。`unique_ptr` はコピーできないからです。持ち主を移すなら `auto b = std::move(a);` と書きます。そのあと `a` は空（`nullptr`）になります。

</details>

**Q3.** `unique_ptr` と `shared_ptr` はどちらを基本に使う？

<details><summary>答え</summary>

`unique_ptr` です。持ち主がはっきりしていて、余計な処理（参照の数を数える）もありません。本当に複数の場所で共有する必要があるときだけ `shared_ptr` を使います。Rust で `Box` が基本で、必要なときだけ `Rc` を使うのと同じです。

</details>

## 日本企業での使われ方

- 「モダン C++」を採用しているプロジェクトでは、`new` / `delete` を直接書くとレビューで指摘されるのが一般的です。スマートポインタと RAII を使いこなせることは、C++ エンジニアの評価の大きなポイントです。
- 一方で、古いコードベースには生のポインタと `delete` が多く残っています。既存のコードを少しずつスマートポインタに置き換えていく作業も、現場でよくある仕事です。
- Rust の所有権を理解していれば、`unique_ptr` と `std::move` の考え方はすぐに身につきます。Rust の経験は C++ の現場でも強みになります。

## 今日のまとめ

- RAII：デストラクタで後片付け。ブロックを抜けると自動で呼ばれる
- ヒープは `std::make_unique`。`delete` は書かない
- `unique_ptr` はコピー不可、`std::move` で持ち主を移す。移したあとの元は空

**次回（Day 28）**：ラウンド10「ミニプロジェクト」。JavaScript で ToDo 管理のコマンドラインツールを作ります。
