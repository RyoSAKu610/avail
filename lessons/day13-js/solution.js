// Day 13 解答例: 注文の集計と文字数チェック
// 実行: node lessons/day13-js/solution.js

const orders = "りんご みかん りんご ぶどう みかん りんご";

// TODO 1
const items = orders.split(" ");

// TODO 2: ?? 0 で「まだない果物」を 0 個として扱う
const counts = new Map();
for (const item of items) {
  counts.set(item, (counts.get(item) ?? 0) + 1);
}

// TODO 3
for (const fruit of [...counts.keys()].sort()) {
  console.log(`${fruit}: ${counts.get(fruit)}`);
}

console.log(`種類: ${counts.size}`);

// TODO 4
const name = "山田太郎";
const chars = [...name].length;
const bytes = new TextEncoder().encode(name).length;
console.log(`名前: ${name} (${chars}文字 / ${bytes}バイト)`);
