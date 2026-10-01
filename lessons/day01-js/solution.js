// Day 1 解答例: 名刺とお買い物メモを表示しよう
// 実行: node lessons/day01-js/solution.js

// TODO 1: 再代入しない値は const
const name = "山田 太郎";
const company = "株式会社サンプル";

// TODO 2: 再代入する値は let
let age = 23;
age = age + 1; // age += 1; や age++; でも OK

// TODO 3: 整数で掛けてから割り、Math.floor で切り捨て
const price = 2980;
const priceWithTax = Math.floor((price * 110) / 100);

// TODO 4: テンプレートリテラル + toLocaleString でカンマ区切り
console.log("=== 名刺 ===");
console.log(`氏名: ${name}`);
console.log(`会社: ${company}`);
console.log(`年齢: ${age}歳`);
console.log("--- 本日のお買い物 ---");
console.log(`税抜価格: ${price.toLocaleString("ja-JP")}円`);
console.log(`税込価格: ${priceWithTax.toLocaleString("ja-JP")}円`);
