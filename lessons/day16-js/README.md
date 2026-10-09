# Day 16 — JavaScript ⑥：class とオブジェクト

> 所要時間 15分 ／ ラウンド6「型を作る」 ／ 前提: Day 13〜15 を終えていること

## 今日のゴール

- `class`・`constructor`・メソッド・getter を書ける
- `#` で始まる private フィールドで、外から書き換えられないデータを作れる
- オブジェクトが「参照」で渡されることと、スプレッド構文でのコピーを説明できる

ラウンド 6 は、3 言語とも同じ「銀行口座」を作ります。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust との違い（3分）

| やりたいこと | Python | Rust | JavaScript |
| --- | --- | --- | --- |
| 型を定義 | `class Foo:` | `struct Foo { }` + `impl Foo { }` | `class Foo { }` |
| 初期化 | `def __init__(self, x):` | `fn new(x) -> Self` | `constructor(x) { }` |
| 自分自身 | `self`（引数に書く） | `self`（引数に書く） | `this`（書かない） |
| 外から隠す | `_x`（慣習） | 何も付けなければ非公開 | `#x` |
| 作る | `Foo(1)` | `Foo::new(1)` | `new Foo(1)` |
| 継承 | `class B(A):` | なし（トレイト） | `class B extends A { }` |

覚えるのは次の 3 点です。

1. **`this` は引数に書かない**。Python の `self` と同じ役割ですが、メソッドの引数には現れません。
2. **`#` を付けたフィールドは本当に外から触れない**。Python の `_x` のような慣習ではなく、言語の仕組みとして守られます。
3. **オブジェクトは参照で渡される**。`b = a` はコピーではなく、同じオブジェクトを指します。コピーが欲しいときは `{ ...a }` を使います。

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day16-js/sample.js
```

[sample.js](sample.js) の getter を見てください。

```js
get salary() {
  return this.#salary;
}
```

`e.salary` のように `()` なしで読めますが、`e.salary = 0` としても値は変わりません（setter がないため）。「読めるけど書けない」プロパティを作る定番の方法です。

## 3. 演習：銀行口座クラス（5分）

[exercise.js](exercise.js) の `TODO` を直し、次の出力にします。

```text
口座: 山田 太郎
入金 5000 → 残高 5000円
出金 2000 → 残高 3000円
出金 9000 → 残高不足 (残高 3000円)
取引回数: 2
```

```bash
node lessons/day16-js/exercise.js
node check.mjs 16
```

private フィールドは、`#balance;` のように class の先頭で宣言してから使います。宣言せずに `this.#balance = 0` と書くと `SyntaxError` になります。

## 4. 確認クイズ（2分）

**Q1.** 次のコードの出力は？

```js
const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);
```

<details><summary>答え</summary>

`2` です。`a` と `b` は同じオブジェクトを指しています。`const b = { ...a };` ならコピーなので `1` のままです。

</details>

**Q2.** `class Foo { constructor() { this.x = 1; } }` を `Foo()` のように `new` なしで呼ぶと？

<details><summary>答え</summary>

`TypeError: Class constructor Foo cannot be invoked without 'new'` になります。class からオブジェクトを作るときは必ず `new` を付けます。

</details>

**Q3.** `{ ...a }` は「深いコピー」？

<details><summary>答え</summary>

いいえ、「浅いコピー」です。1 段目のプロパティだけがコピーされ、中に入っているオブジェクトや配列は元と共有されます。深いコピーが必要なときは `structuredClone(a)` を使います。

</details>

## 日本企業での使われ方

- 最近のフロントエンド（React など）は class よりも関数とオブジェクトで書くことが多いですが、Node.js のバックエンドや既存のコードでは class もよく使われます。両方読めることが大切です。
- 「状態を外から勝手に書き換えさせない」設計（カプセル化）は、言語を問わずコードレビューで重視されます。

## 今日のまとめ

- `class` に `constructor`・メソッド・getter を書く。自分自身は `this`
- `#フィールド` で外から触れないデータを作れる
- オブジェクトは参照で渡される。コピーは `{ ...obj }`（浅いコピー）

**次回（Day 17）**：同じ銀行口座を Go の `struct` とメソッドで作ります。
