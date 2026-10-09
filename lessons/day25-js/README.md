# Day 25 — JavaScript ⑨：モジュールと TypeScript 入門

> 所要時間 15分 ／ ラウンド9「その言語らしさ ②」 ／ 前提: Day 22〜24 を終えていること

## 今日のゴール

- `export` と `import` でファイルを分けられる
- TypeScript で変数・引数・戻り値に型を書ける
- `type` でオブジェクトの形を決め、ユニオン型（`"A" | "B"`）を使える

日本の求人では「JavaScript」とあわせて **TypeScript** が求められることがとても多いです。今日はその入口です。

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust との違い（3分）

| やりたいこと | Python | Rust | TypeScript |
| --- | --- | --- | --- |
| 公開する | （何もしない） | `pub fn` | `export function` |
| 取り込む | `from tax import with_tax` | `use crate::tax::with_tax;` | `import { withTax } from "./tax.ts";` |
| 変数の型 | `price: int = 1` | `let price: i32 = 1;` | `const price: number = 1;` |
| 関数の型 | `def f(x: int) -> str:` | `fn f(x: i32) -> String` | `function f(x: number): string` |
| データの形 | `TypedDict` / `dataclass` | `struct` | `type User = { name: string }` |
| どれか 1 つ | `Literal["A", "B"]` | `enum` | `"A" \| "B"` |
| 型のチェック | mypy（任意） | コンパイラ（必須） | tsc やエディタ（実行とは別） |

覚えるのは次の 3 点です。

1. **TypeScript は「JavaScript + 型」**。型を消すとそのまま JavaScript になります。Node.js 22.18 以降は `.ts` ファイルを直接実行できます（型を消して実行するだけで、型のチェックはしません）。
2. **型のチェックはエディタと `tsc` が行う**。VS Code で `.ts` ファイルを開くと、型の間違いに赤線が出ます。実務では CI で `tsc` を実行して確認します。
3. **ユニオン型で「取りうる値」を絞れる**。`type TaxRate = 8 | 10` のようにすると、`5` を渡したときにエディタが教えてくれます。

## 2. サンプルを実行して読む（5分）

```bash
node lessons/day25-js/sample.ts
```

[sample.ts](sample.ts) は、[tax.ts](tax.ts) で `export` した関数を `import` して使っています。

```ts
import { withTax, yen } from "./tax.ts";
import type { TaxRate } from "./tax.ts"; // 型だけを取り込むときは import type
```

型は実行時には消えるので、型だけを取り込むときは `import type` と書きます。

VS Code で `sample.ts` を開き、最後のコメントにある `withTax(100, 5);` のコメントを外してみてください。`5` に赤線が出ます（このフォルダの [tsconfig.json](tsconfig.json) が TypeScript の設定です）。

## 3. 演習：型付きのレシート（5分）

[exercise.ts](exercise.ts) の `TODO` を直し、次の出力にします。

```text
おにぎり (軽): 150円 → 162円
お茶 (軽): 130円 → 140円
弁当箱: 1,200円 → 1,320円
合計: 1,622円
```

```bash
node lessons/day25-js/exercise.ts
node check.mjs 25
```

VS Code で開くと、最初は `items` の `price` に赤線が出ています。`Item` 型に `price` がないからです。TODO 2 で型を完成させると消えます。Node.js は型をチェックしないので、赤線があっても実行はできてしまう点に注意しましょう。

## 4. 確認クイズ（2分）

**Q1.** `type User = { name: string; email?: string }` のとき、`{ name: "佐藤" }` は `User` 型として正しい？

<details><summary>答え</summary>

正しいです。`email?` の `?` は「なくてもよい」という意味です。`user.email` を読むと型は `string | undefined` になるので、使う前に `??` などで `undefined` の場合を考えます。

</details>

**Q2.** `function f(s: "A" | "B") {}` に `f("C")` と書くとどうなる？

<details><summary>答え</summary>

エディタや `tsc` が `Argument of type '"C"' is not assignable to parameter of type '"A" | "B"'` というエラーを出します。ただし Node.js でそのまま実行すると、型は無視されるのでエラーになりません。

</details>

**Q3.** `export` を付けていない関数を、別のファイルから `import` できる？

<details><summary>答え</summary>

できません。モジュールの中身は、`export` したものだけが外から見えます。Rust の `pub` と同じ考え方です。

</details>

## 日本企業での使われ方

- 新しく始まる Web のフロントエンド開発では、TypeScript を使うのがほぼ標準になっています。Node.js のバックエンドでも TypeScript が主流です。
- 型を書くことで、API の返すデータの形をチームで共有したり、修正の影響範囲をエディタで確認したりできます。大人数での開発ほど効果が大きいと評価されています。
- `any` 型（何でも入る型）を多用すると型のメリットが消えるため、レビューで指摘されることが多いです。

## 今日のまとめ

- `export` したものだけを `import` できる。型だけなら `import type`
- TypeScript は「名前: 型」で型を書く。`type` で形を決め、`|` でユニオン型
- 型のチェックはエディタと `tsc`。Node.js は型を消して実行するだけ

**次回（Day 26）**：Go の `interface` と、標準のテストの仕組み `go test` です。
