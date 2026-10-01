// Day 1 サンプル: JavaScript の変数と型
// 実行: node lessons/day01-js/sample.js

// --- 1. const と let ---
const company = "株式会社サンプル"; // 再代入しない値 → const (基本はこちら)
let year = 1;                       // 再代入する値   → let
year = year + 1;
// company = "別の会社";  ← 実行すると TypeError: Assignment to constant variable.
console.log(company, year);

// --- 2. 型は実行時に決まる (typeof で確認できる) ---
console.log(typeof 42);           // "number"
console.log(typeof 3.14);         // "number"  ← 整数と小数の区別がない
console.log(typeof "こんにちは"); // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object"  ← 有名な歴史的バグ。null は「値がない」の意味

// --- 3. テンプレートリテラル (Python の f-string に相当) ---
const user = "佐藤";
const age = 25;
console.log(`${user}さんは${age}歳です`);
console.log(`来年は${age + 1}歳`); // ${} の中には式も書ける

// --- 4. == ではなく === を使う ---
console.log("5" == 5);  // true  ← 型を勝手に変換してから比較してしまう
console.log("5" === 5); // false ← 型も含めて比較する (実務ではこちら一択)

// --- 5. number は全部「64bit 浮動小数点数」 ---
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(7 / 2);              // 3.5  ← 整数同士でも小数になる
console.log(Math.floor(7 / 2));  // 3    ← 切り捨てたいときは Math.floor
console.log(2980 * 1.1);         // 3278.0000000000005 ← 金額計算で事故のもと
console.log((2980 * 110) / 100); // 3278 ← 整数で掛けてから割ると安全
