# 15分ドリル JS・Go・C++

Python・Rust・HTML・CSS を学んだ人が、**日本企業でよく使われる JavaScript・Go・C++** を **1日15分 × 30日** で身につけるための教材です。

- JavaScript → Go → C++ の順に、1日1言語ずつ回ります。
- 同じテーマ（変数、関数、ループ…）を 3 日続けて 3 つの言語で書くので、言語ごとの考え方の違いがはっきり見えます。
- 毎回 **Python・Rust との比較表**から始まります。知っている言語を足がかりにして覚えられます。
- 演習は `node check.mjs <日>` で自動的に答え合わせできます。

> **現在はデモ版です。** Day 1〜3（3言語ぶんの「変数と型」）を公開しています。Day 4 以降は下の時間割のとおり作る予定です。

## 1日15分の流れ

| 時間 | やること |
| --- | --- |
| 0〜3分 | **比較**：Python・Rust との違いを表で確認 |
| 3〜8分 | **サンプル**：サンプルコードを実行して読む |
| 8〜13分 | **演習**：TODO を埋めて、`node check.mjs <日>` で答え合わせ |
| 13〜15分 | **クイズ**：3問のクイズで振り返り |

## 始め方

1. [SETUP.md](SETUP.md) を見て Node.js・Go・g++ を入れる（初日だけ。15分とは別に 20〜30 分ほど見てください）
2. その日のフォルダの `README.md` を開いて、上から順に進める
3. 演習を解いたら答え合わせ

```bash
node check.mjs        # 進み具合の一覧
node check.mjs 1      # Day 1 の演習を答え合わせ
```

### ブラウザで読む（おすすめ）

[site/index.html](site/index.html) をブラウザで開くと、時間割・**15分タイマー**・コードを並べて表示する画面で学習できます。タイマーは「比較 → サンプル → 演習 → クイズ」の区切りを音で知らせます。完了した日はブラウザに記録されます。

## 30日の時間割

<!-- roadmap:start (site/build.mjs が curriculum.json から生成) -->
| ラウンド | テーマ | JavaScript | Go | C++ |
| --- | --- | --- | --- | --- |
| 1 | 動かす・変数・型 | **[Day 1](lessons/day01-js/README.md)** node で実行、const と let、number 型、=== | **[Day 2](lessons/day02-go/README.md)** go run、:= と var、ゼロ値、型変換 | **[Day 3](lessons/day03-cpp/README.md)** g++ でコンパイル、const と auto、整数の割り算 |
| 2 | 関数 | **[Day 4](lessons/day04-js/README.md)** 関数宣言とアロー関数、デフォルト引数 | **[Day 5](lessons/day05-go/README.md)** 複数の戻り値、可変長引数 | **[Day 6](lessons/day06-cpp/README.md)** 値渡しと参照渡し、const 参照 |
| 3 | 条件分岐とループ | **[Day 7](lessons/day07-js/README.md)** if・for...of・switch、truthy と falsy | **[Day 8](lessons/day08-go/README.md)** ループは for だけ、switch、if の初期化文 | **[Day 9](lessons/day09-cpp/README.md)** for・範囲 for・while、switch |
| 4 | 配列とリスト | Day 10 配列と map・filter・reduce | Day 11 スライスと append、range | Day 12 std::vector と &lt;algorithm&gt; |
| 5 | 辞書と文字列（日本語の扱い） | Day 13 オブジェクトと Map、分割代入、文字列と日本語 | Day 14 map、strings パッケージ、rune と日本語 | Day 15 std::map と std::string、UTF-8 の注意点 |
| 6 | 型を作る | Day 16 class、スプレッド構文 | Day 17 struct とメソッド、ポインタレシーバ | Day 18 class、コンストラクタ、public と private |
| 7 | エラー処理 | Day 19 try・catch・throw と Error | Day 20 error 値と if err != nil、errors.Is | Day 21 例外と std::optional |
| 8 | その言語らしさ ① | Day 22 Promise と async / await、fetch | Day 23 goroutine と channel | Day 24 ポインタと参照、スタックとヒープ |
| 9 | その言語らしさ ② | Day 25 import / export と TypeScript 入門 | Day 26 interface と go test | Day 27 RAII とスマートポインタ |
| 10 | ミニプロジェクト | Day 28 ToDo 管理 CLI（JSON ファイルに保存） | Day 29 JSON を返す API サーバー（net/http） | Day 30 CSV の成績集計ツール（ファイル入出力） |
<!-- roadmap:end -->

## なぜこの3言語？

| 言語 | 日本企業での主な使われ方 | 求人で一緒に挙がりやすいもの |
| --- | --- | --- |
| JavaScript | Web 系企業や SIer のフロントエンド、社内システムの画面 | TypeScript、React、Vue.js、Node.js |
| Go | Web 系企業のバックエンド、インフラ・SRE | Docker、Kubernetes、gRPC、AWS・Google Cloud |
| C++ | 自動車・家電の組込み、ゲーム開発、金融、画像処理 | C 言語、Unreal Engine、Linux、MISRA などのコーディング規約 |

## フォルダ構成

```text
.
├── README.md            この説明
├── SETUP.md             環境構築 (Node.js / Go / g++)
├── check.mjs            答え合わせスクリプト
├── curriculum.json      30日の時間割 (README の表とサイトはここから生成)
├── go.mod               Go のモジュール定義 (Go の演習を動かすために必要)
├── lessons/
│   ├── day01-js/        README.md, sample.js, exercise.js, solution.js, expected.txt
│   ├── day02-go/        README.md, sample/, exercise/, solution/, expected.txt
│   └── day03-cpp/       README.md, sample.cpp, exercise.cpp, solution.cpp, expected.txt
├── site/                ブラウザ用ビューア (index.html は build.mjs で生成)
└── archive/avail-node/  以前このリポジトリにあったファイル一式 (アーカイブ)
```

各日のフォルダには次のファイルがあります。

| ファイル | 役割 |
| --- | --- |
| `README.md` | その日の教材（比較表・解説・演習の説明・クイズ） |
| `sample` | 解説用のサンプル。実行して出力と見比べる |
| `exercise` | 演習。`TODO` を埋める |
| `expected.txt` | 演習の正しい出力 |
| `solution` | 解答例。答え合わせが通ってから見る |

## 教材を作る人向け

```bash
cd site && npm install && npm run build   # site/index.html と README の時間割を更新
node check.mjs --all --solution           # すべての解答例が expected.txt と一致するか
node check.mjs --all --smoke              # すべての演習がエラーなく動くか
```

新しい日を追加するときは、`lessons/dayNN-<js|go|cpp>/` を作って上の表と同じファイルを置き、`site` でビルドし直します。

## アーカイブについて

このリポジトリに以前あった Avail Node（ブロックチェーンのノード実装）のファイルは、すべて [archive/avail-node/](archive/avail-node/) に移動しました。`git log --follow` で移動前の履歴もたどれます。
