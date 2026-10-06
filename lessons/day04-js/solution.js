// Day 4 解答例: お会計の関数を作ろう
// 実行: node lessons/day04-js/solution.js

// TODO 1: デフォルト引数は「引数名 = 値」
function withTax(price, rate = 10) {
  return Math.floor((price * (100 + rate)) / 100);
}

// TODO 2: 1行で書けるアロー関数は return を省略できる
const shippingFee = (total) => (total >= 5000 ? 0 : 550);

// TODO 3
const yen = (n) => `${n.toLocaleString("ja-JP")}円`;

console.log(`商品: ${yen(1980)}`);
console.log(`税込 (10%): ${yen(withTax(1980))}`);
console.log(`税込 (軽減税率 8%): ${yen(withTax(1980, 8))}`);
console.log(`送料 (合計 3,000円): ${yen(shippingFee(3000))}`);
console.log(`送料 (合計 6,000円): ${yen(shippingFee(6000))}`);
