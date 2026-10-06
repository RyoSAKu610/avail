// Day 10 解答例: 売上データを集計しよう
// 実行: node lessons/day10-js/solution.js

const sales = [1200, 800, 3000, 450, 2200];

// TODO 1
const large = sales.filter((s) => s >= 1000);

// TODO 2
const withTax = sales.map((s) => Math.floor((s * 110) / 100));

// TODO 3: 第2引数の 0 が sum の初期値
const total = sales.reduce((sum, s) => sum + s, 0);

// TODO 4
const max = Math.max(...sales);

// TODO 5: [...sales] でコピーしてから、数値として比較する関数を渡して sort
const ascending = [...sales].sort((a, b) => a - b);

console.log(`売上: ${sales.join(", ")}`);
console.log(`1000円以上: ${large.join(", ")}`);
console.log(`税込: ${withTax.join(", ")}`);
console.log(`合計: ${total}円`);
console.log(`最大: ${max}円`);
console.log(`昇順: ${ascending.join(", ")}`);
console.log(`元の順番: ${sales.join(", ")}`);
