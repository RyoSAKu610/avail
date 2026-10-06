// Day 10 サンプル: JavaScript の配列
// 実行: node lessons/day10-js/sample.js

// --- 1. 作る・追加する・長さ ---
const nums = [3, 1, 2];
nums.push(10);                 // 末尾に追加 (Python の append)
console.log(nums, nums.length); // [ 3, 1, 2, 10 ] 4
console.log(nums[0], nums.at(-1)); // 3 10  (at(-1) で末尾。nums[-1] は undefined)

// --- 2. map: 全要素を変換した「新しい配列」を作る ---
const doubled = nums.map((n) => n * 2);
console.log(doubled); // [ 6, 2, 4, 20 ]

// --- 3. filter: 条件に合う要素だけの「新しい配列」 ---
const big = nums.filter((n) => n >= 3);
console.log(big); // [ 3, 10 ]

// --- 4. reduce: 全要素を 1 つの値にまとめる (合計など) ---
const total = nums.reduce((sum, n) => sum + n, 0); // 0 は初期値
console.log(total); // 16

// --- 5. find / includes / some ---
console.log(nums.find((n) => n > 2));  // 3 (最初に見つかった要素)
console.log(nums.includes(10));         // true
console.log(nums.some((n) => n > 5));   // true (1 つでも当てはまるか)

// --- 6. sort の落とし穴: 何も渡さないと「文字列として」並べる! ---
console.log([10, 9, 100].sort());                // [ 10, 100, 9 ]
console.log([10, 9, 100].sort((a, b) => a - b)); // [ 9, 10, 100 ]

// --- 7. sort は元の配列を書き換える。元を残すならコピーしてから ---
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b); // [...配列] でコピー
console.log(original, sorted); // [ 3, 1, 2 ] [ 1, 2, 3 ]

// --- 8. join で文字列に、スプレッド構文で展開 ---
console.log(nums.join(" / "));  // 3 / 1 / 2 / 10
console.log(Math.max(...nums)); // 10
