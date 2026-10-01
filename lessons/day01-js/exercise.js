// Day 1 演習: 名刺とお買い物メモを表示しよう
// 実行:       node lessons/day01-js/exercise.js
// 答え合わせ: node check.mjs 1
//
// 今は仮の値が入っているので、出力が期待どおりになりません。
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// TODO 1: 再代入しない値は const で宣言する
//   name に "山田 太郎"、company に "株式会社サンプル" を入れよう
const name = "???";
const company = "???";

// TODO 2: 再代入する値は let で宣言する
//   age を 23 で宣言し、その下の行で 1 増やそう (誕生日が来た!)
let age = 0;

// TODO 3: 税抜 2980 円の商品の税込価格 (消費税10%、1円未満切り捨て) を計算しよう
//   ヒント: 2980 * 1.1 は 3278.0000000000005 になる (サンプル参照)。
//          「× 110 ÷ 100」で計算してから Math.floor() で切り捨てると安全
const price = 2980;
const priceWithTax = 0;

// TODO 4: 金額を「2,980」のようにカンマ区切りで表示しよう
//   ヒント: 数値.toLocaleString("ja-JP") でカンマ区切りの文字列になる
//   余裕があれば、+ でつないでいる部分もテンプレートリテラル (`...${式}...`) に書き換えよう
console.log("=== 名刺 ===");
console.log("氏名: " + name);
console.log("会社: " + company);
console.log("年齢: " + age + "歳");
console.log("--- 本日のお買い物 ---");
console.log("税抜価格: " + price + "円");
console.log("税込価格: " + priceWithTax + "円");
