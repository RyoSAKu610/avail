// Day 25 演習: 型付きのレシートを作ろう
// 実行:       node lessons/day25-js/exercise.ts
// 答え合わせ: node check.mjs 25
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// TODO 1: tax.ts から withTax も import しよう (今は yen だけ)
import { yen } from "./tax.ts";

// TODO 2: 商品の型 Item を定義しよう
//   name は string、price は number、reduced (軽減税率の対象か) は boolean
type Item = {
  name: string;
};

const items: Item[] = [
  { name: "おにぎり", price: 150, reduced: true },
  { name: "お茶", price: 130, reduced: true },
  { name: "弁当箱", price: 1200, reduced: false },
];

// TODO 3: 商品 1 つの税込価格を返す関数を書こう
//   reduced が true なら税率 8、false なら 10 で withTax を呼ぶ
//   引数と戻り値に型を書くこと: function priceOf(item: Item): number
function priceOf(item: Item): number {
  return 0;
}

// TODO 4: 軽減税率の商品には名前の後ろに " (軽)" を付けよう
function label(item: Item): string {
  return item.name;
}

let total = 0;
for (const item of items) {
  console.log(`${label(item)}: ${yen(item.price)} → ${yen(priceOf(item))}`);
  total += priceOf(item);
}
console.log(`合計: ${yen(total)}`);
