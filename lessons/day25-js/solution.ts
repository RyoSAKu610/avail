// Day 25 解答例: 型付きのレシートを作ろう
// 実行: node lessons/day25-js/solution.ts

// TODO 1: 複数の関数は { } の中にカンマで並べる
import { withTax, yen } from "./tax.ts";

// TODO 2
type Item = {
  name: string;
  price: number;
  reduced: boolean;
};

const items: Item[] = [
  { name: "おにぎり", price: 150, reduced: true },
  { name: "お茶", price: 130, reduced: true },
  { name: "弁当箱", price: 1200, reduced: false },
];

// TODO 3: 三項演算子の結果は 8 | 10 と推論されるので、withTax の TaxRate に渡せる
function priceOf(item: Item): number {
  return withTax(item.price, item.reduced ? 8 : 10);
}

// TODO 4
function label(item: Item): string {
  return item.reduced ? `${item.name} (軽)` : item.name;
}

let total = 0;
for (const item of items) {
  console.log(`${label(item)}: ${yen(item.price)} → ${yen(priceOf(item))}`);
  total += priceOf(item);
}
console.log(`合計: ${yen(total)}`);
