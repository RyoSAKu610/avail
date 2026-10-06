// Day 10 演習: 売上データを集計しよう
// 実行:       node lessons/day10-js/exercise.js
// 答え合わせ: node check.mjs 10
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
// for ループを使わず、配列のメソッド (filter / map / reduce / sort) で書いてみよう。

const sales = [1200, 800, 3000, 450, 2200];

// TODO 1: 1000 円以上の売上だけを取り出そう (filter)
const large = [];

// TODO 2: すべての売上を税込 (10%、切り捨て) にしよう (map)
const withTax = [];

// TODO 3: 売上の合計を計算しよう (reduce)
const total = 0;

// TODO 4: 最大の売上を求めよう (Math.max とスプレッド構文 ...)
const max = 0;

// TODO 5: 小さい順に並べた「新しい配列」を作ろう
//   sales 自体は並べ替えないこと (最後の行で元の順番を表示して確認している)
const ascending = [];

console.log(`売上: ${sales.join(", ")}`);
console.log(`1000円以上: ${large.join(", ")}`);
console.log(`税込: ${withTax.join(", ")}`);
console.log(`合計: ${total}円`);
console.log(`最大: ${max}円`);
console.log(`昇順: ${ascending.join(", ")}`);
console.log(`元の順番: ${sales.join(", ")}`);
