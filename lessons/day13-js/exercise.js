// Day 13 演習: 注文の集計と文字数チェック
// 実行:       node lessons/day13-js/exercise.js
// 答え合わせ: node check.mjs 13
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

const orders = "りんご みかん りんご ぶどう みかん りんご";

// TODO 1: orders を空白 " " で区切って、配列 items にしよう (split)
const items = [];

// TODO 2: 果物ごとの個数を Map で数えよう
//   まだ数えていない果物は get すると undefined になる → (counts.get(item) ?? 0) + 1
const counts = new Map();

// TODO 3: キー (果物の名前) を並べ替えて、「名前: 個数」の形で出力しよう
//   [...counts.keys()] でキーの配列が作れる。文字列の sort() は引数なしで OK
//   (日本語のひらがなは、文字コード順 = あいうえお順 に並ぶ)
console.log("(ここに果物ごとの個数が出る)");

console.log(`種類: ${counts.size}`);

// TODO 4: 名前の「文字数」と「UTF-8 のバイト数」を求めよう
//   文字数は [...name].length、バイト数は new TextEncoder().encode(name).length
const name = "山田太郎";
const chars = 0;
const bytes = 0;
console.log(`名前: ${name} (${chars}文字 / ${bytes}バイト)`);
