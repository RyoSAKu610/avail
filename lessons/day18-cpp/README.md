# Day 18 — C++ ⑥：class とコンストラクタ

> 所要時間 15分 ／ ラウンド6「型を作る」 ／ 前提: Day 16・Day 17 を終えていること

## 今日のゴール

- `public` と `private` を分けて `class` を定義できる
- コンストラクタのメンバ初期化子リスト（`: owner_(owner)`）を書ける
- メソッド末尾の `const` の意味を説明できる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. JavaScript・Go との違いを表で確認 |
| 3〜8分 | 2. サンプルをコンパイル・実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. JavaScript・Go との違い（3分）

| やりたいこと | JavaScript | Go | C++ |
| --- | --- | --- | --- |
| 型を定義 | `class Foo { }` | `type Foo struct { }` | `class Foo { };`（**最後の `;` を忘れない**） |
| 非公開 | `#x` | 小文字で始める | `private:` の下に書く |
| 初期化 | `constructor(x) { this.x = x; }` | `NewFoo(x)` 関数 | `Foo(int x) : x_(x) {}` |
| 作る | `new Foo(1)` | `NewFoo(1)` | `Foo f(1);`（`new` 不要） |
| 読むだけのメソッド | （区別なし） | 値レシーバ | `int get() const` |
| 継承 | `extends` | 埋め込み | `class B : public A` |
| 代入 `b = a` | 同じものを指す | コピー | コピー |

覚えるのは次の 3 点です。

1. **メンバ変数は `private:`、使ってほしいメソッドは `public:`**。`struct` も同じことができますが、何も書かないと `public` になる点だけが違います。
2. **メンバの初期化は初期化子リストで**。`BankAccount(const std::string& owner) : owner_(owner) {}` のように、コンストラクタ本体の前に書きます。
3. **書き換えないメソッドには末尾に `const`**。`const` なオブジェクトからは `const` メソッドしか呼べません。Rust の `&self` と `&mut self` の区別を、C++ では自分で付けます。

## 2. サンプルをコンパイル・実行して読む（5分）

```bash
g++ -std=c++17 -Wall -Wextra lessons/day18-cpp/sample.cpp -o sample.out
./sample.out
```

[sample.cpp](sample.cpp) のコンストラクタを見てください。

```cpp
Employee(const std::string& name, int salary) : name_(name), salary_(salary) {}
```

`Employee e("佐藤", 220000);` と書くと、JavaScript のような `new` なしでオブジェクトが作られます。C++ で `new` を使うのは、ヒープに置きたいときだけです（Day 24・27 で扱います）。

## 3. 演習：銀行口座クラス（5分）

Day 16・17 と同じお題です。[exercise.cpp](exercise.cpp) の `TODO` を直し、次の出力にします。

```text
口座: 山田 太郎
入金 5000 → 残高 5000円
出金 2000 → 残高 3000円
出金 9000 → 残高不足 (残高 3000円)
取引回数: 2
```

```bash
g++ -std=c++17 -Wall -Wextra lessons/day18-cpp/exercise.cpp -o exercise.out
./exercise.out
node check.mjs 18
```

TODO 5 で `private:` を追加すると、`main` の `account.balance_ = 1000000;` が `'int BankAccount::balance_' is private within this context` というエラーになります。外から勝手に残高を書き換えられなくなったということです。確認したらその 2 行を消しましょう。

## 4. 確認クイズ（2分）

**Q1.** 次のコードはコンパイルできる？

```cpp
class Counter {
public:
    int get() { return n_; }
private:
    int n_ = 0;
};
int main() { const Counter c; return c.get(); }
```

<details><summary>答え</summary>

できません。`c` は `const` なのに、`get()` に `const` が付いていないからです。`int get() const { return n_; }` にするとコンパイルできます。

</details>

**Q2.** `class` と `struct` の違いは？

<details><summary>答え</summary>

何も書かないときのアクセス権だけです（`class` は `private`、`struct` は `public`）。慣習として、データをまとめるだけなら `struct`、データを隠してメソッドで操作させるなら `class` を使います。

</details>

**Q3.** `class Foo { int x; }` のあとに `int main()` を書くとエラーになった。原因は？

<details><summary>答え</summary>

`class` の定義の最後に `;` がないからです。C++ の `class`・`struct` の定義は `};` で終わります。Rust や Go にはない書き方なので、慣れるまでよく忘れます。

</details>

## 日本企業での使われ方

- メンバ変数の名前の付け方（`name_`、`m_name`、`mName` など）は会社やプロジェクトのコーディング規約で決まっていることが多いです。最初に規約を確認しましょう。
- ゲーム開発（Unreal Engine など）では、エンジンが用意した基底クラスを継承して自分のクラスを作るのが基本です。継承の読み書きは必須のスキルです。

## 今日のまとめ

- `class 名前 { public: ... private: ... };`。最後の `;` を忘れない
- コンストラクタは `: メンバ(値)` の初期化子リストで初期化する
- 書き換えないメソッドには末尾に `const`

**次回（Day 19）**：ラウンド7「エラー処理」。JavaScript の `try`・`catch`・`throw` です。
