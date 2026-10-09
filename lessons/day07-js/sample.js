// Day 7 サンプル: JavaScript の条件分岐とループ
// 実行: node lessons/day07-js/sample.js

// --- 1. if / else if / else (条件は ( ) で囲み、本体は { } ) ---
const temp = 28;
if (temp >= 30) {
  console.log("真夏日");
} else if (temp >= 25) {
  console.log("夏日"); // ← これが出る
} else {
  console.log("過ごしやすい");
}

// --- 2. for...of: 配列の要素を順に取り出す (Python の for x in list) ---
for (const fruit of ["りんご", "みかん"]) {
  console.log(fruit);
}

// --- 3. 数を数える for (C 言語風)。Python の range(3) に相当 ---
for (let i = 0; i < 3; i++) {
  console.log(`i = ${i}`);
}

// --- 4. while ---
let money = 100;
while (money < 1000) {
  money *= 2;
}
console.log(money); // 1600

// --- 5. switch: === で比較する。break を忘れると次の case も実行される ---
const day = "土";
switch (day) {
  case "土":
  case "日":
    console.log("休日");
    break;
  default:
    console.log("平日");
}

// --- 6. truthy / falsy: if の条件に数値や文字列を書ける ---
// false になる値 (falsy): false, 0, "", null, undefined, NaN
for (const v of [0, "", "0", [], null]) {
  console.log(JSON.stringify(v), v ? "truthy" : "falsy");
}
// "0" と [] は truthy! (Python では空リストは False なので要注意)

// --- 7. || と ?? で「値がなければ代わりの値」 ---
const input = "";
console.log(input || "(未入力)"); // "" は falsy なので (未入力)
console.log(input ?? "(未入力)"); // ?? は null と undefined のときだけ代わりの値 → ""
