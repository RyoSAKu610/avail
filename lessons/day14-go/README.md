# Day 14 — Go ⑤：map・strings・rune と日本語

> 所要時間 15分 ／ ラウンド5「辞書と文字列（日本語の扱い）」 ／ 前提: Day 13 を終えていること

## 今日のゴール

- `map[string]int` を作り、追加・更新・削除・存在チェックができる
- `map` の `range` は順番が決まっていないことを知り、並べて出力できる
- `len` がバイト数を返すこと、文字数は `rune` で数えることを説明できる

## 15分の進め方

| 時間 | やること |
| --- | --- |
| 0〜3分 | 1. Python・Rust・JavaScript との違いを表で確認 |
| 3〜8分 | 2. サンプルを実行して読む |
| 8〜13分 | 3. 演習を解いて答え合わせ |
| 13〜15分 | 4. 確認クイズ |

## 1. Python・Rust・JavaScript との違い（3分）

| やりたいこと | Python | Rust | JavaScript | Go |
| --- | --- | --- | --- | --- |
| 辞書を作る | `{"a": 1}` | `HashMap::new()` | `new Map()` | `map[string]int{"a": 1}` |
| ないキーを読む | `KeyError` | `None` | `undefined` | **ゼロ値**（`0` など） |
| あるか調べる | `"a" in d` | `m.contains_key("a")` | `m.has("a")` | `v, ok := m["a"]` |
| 削除 | `del d["a"]` | `m.remove("a")` | `m.delete("a")` | `delete(m, "a")` |
| ループの順番 | 追加順 | 不定 | 追加順 | **毎回ランダム** |
| `len("日本")` | 2 | 6（`s.len()`） | 2（`.length`） | **6** |
| 1 文字の型 | `str` | `char` | `string` | `rune` |

覚えるのは次の 3 点です。

1. **ないキーはゼロ値が返る**。`counts[item]++` だけで数えられて便利ですが、「本当に 0 なのか、キーがないのか」は `v, ok := m[k]` で区別します。
2. **`map` の順番はランダム**。テストや画面表示で順番をそろえたいときは、キーを集めて並べ替えます。
3. **Go の文字列は UTF-8 のバイト列**。`len` はバイト数（Rust の `len()` と同じ）、文字数は `utf8.RuneCountInString` で数えます。

## 2. サンプルを実行して読む（5分）

```bash
go run ./lessons/day14-go/sample
```

[sample/main.go](sample/main.go) の最後、文字列の部分を見てください。

```go
name := "山田太郎"
fmt.Println(len(name))                    // 12 (バイト数)
fmt.Println(utf8.RuneCountInString(name)) // 4  (文字数)
fmt.Println(name[0:3])                    // 山 (バイトで切り出す。0:2 だと文字化け)
```

漢字やひらがなは UTF-8 で 1 文字 3 バイトなので、`name[0:2]` のようにバイトの途中で切ると文字化けします。文字単位で切りたいときは `[]rune(name)` に変換します。

サンプルを何度か実行すると、`range stock` の出力順が変わることがあります。

## 3. 演習：注文の集計と文字数チェック（5分）

Day 13 と同じお題です。[exercise/main.go](exercise/main.go) の `TODO` を直し、次の出力にします。

```text
ぶどう: 1
みかん: 2
りんご: 3
種類: 3
名前: 山田太郎 (4文字 / 12バイト)
```

```bash
go run ./lessons/day14-go/exercise
node check.mjs 14
```

TODO 2 では、`fmt.Println("数える:", item)` の行を `counts[item]++` に置き換えます。

## 4. 確認クイズ（2分）

**Q1.** `m := map[string]int{}` のとき、`m["x"] += 5` のあとの `m["x"]` は？

<details><summary>答え</summary>

`5` です。ないキーはゼロ値 `0` として読まれ、そこに 5 が足されます。

</details>

**Q2.** `var m map[string]int` と宣言しただけの `m` に `m["a"] = 1` とすると？

<details><summary>答え</summary>

実行時に `panic: assignment to entry in nil map` になります。`var` で宣言しただけの `map` は `nil` で、読むことはできても書き込めません。`m := map[string]int{}` か `make(map[string]int)` で作ってから使います。

</details>

**Q3.** `for i, r := range "日本"` の `i` が `0, 3` と進むのはなぜ？

<details><summary>答え</summary>

`range` は文字列を 1 文字（`rune`）ずつ取り出しますが、`i` はその文字が始まる**バイト位置**だからです。「日」が 3 バイトなので、次の「本」は 3 バイト目から始まります。

</details>

## 日本企業での使われ方

- 日本語を扱う API で、`len` で文字数制限をチェックしてしまい「全角だと 3 分の 1 しか入力できない」というバグはよくあります。文字数制限には `utf8.RuneCountInString` を使います。
- 出力やテスト結果の順番が実行ごとに変わると、CI が不安定になります。`map` を出力するときにキーを並べ替えるのは、実務での基本的な作法です。

## 今日のまとめ

- ないキーはゼロ値。存在チェックは `v, ok := m[k]`
- `map` の `range` の順番はランダム。並べたいならキーを `slices.Sort`
- `len` はバイト数。文字数は `utf8.RuneCountInString`、文字単位で扱うなら `[]rune`

**次回（Day 15）**：C++ の `std::map` と `std::string`。C++ でも日本語は UTF-8 のバイト列です。
