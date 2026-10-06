// Day 4 サンプル: JavaScript の関数
// 実行: node lessons/day04-js/sample.js

// --- 1. 関数宣言 (Python の def、Rust の fn に相当) ---
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

// --- 2. アロー関数 (短く書ける。実務ではこちらもよく使う) ---
const multiply = (a, b) => a * b;      // 1行なら { } と return を省略できる
const square = (x) => {
  const result = x * x;                // 複数行なら { } と return が必要
  return result;
};
console.log(multiply(3, 4), square(5)); // 12 25

// --- 3. デフォルト引数 (Python と同じ書き方) ---
const greet = (name, suffix = "さん") => `${name}${suffix}`;
console.log(greet("佐藤"));             // 佐藤さん
console.log(greet("鈴木", "様"));       // 鈴木様

// --- 4. return を書かないと undefined が返る ---
function noReturn() {
  const x = 1;
}
console.log(noReturn()); // undefined (Rust のような「最後の式が戻り値」はない)

// --- 5. 引数の数がちがってもエラーにならない ---
console.log(add(1));       // NaN  (b が undefined になり 1 + undefined)
console.log(add(1, 2, 3)); // 3    (余った引数は無視される)

// --- 6. 関数は値なので、変数に入れたり引数に渡したりできる ---
const applyTwice = (fn, x) => fn(fn(x));
console.log(applyTwice(square, 3)); // 81
