// Day 19 サンプル: JavaScript のエラー処理
// 実行: node lessons/day19-js/sample.js

// --- 1. throw でエラーを投げ、try / catch で受け止める (Python の raise / try-except) ---
function divide(a, b) {
  if (b === 0) {
    throw new Error("0 で割ることはできません");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(1, 0));  // ここで throw される
  console.log("ここは実行されない");
} catch (err) {
  console.log("エラー:", err.message);
} finally {
  console.log("finally は必ず実行される"); // 後片付けに使う
}

// --- 2. 自分でエラーの種類を作る (Error を継承) ---
class NotFoundError extends Error {
  constructor(id) {
    super(`ID ${id} が見つかりません`);
    this.name = "NotFoundError";
  }
}

function findUser(id) {
  const users = { 1: "佐藤", 2: "鈴木" };
  if (!(id in users)) throw new NotFoundError(id);
  return users[id];
}

// --- 3. instanceof でエラーの種類を見分ける ---
for (const id of [1, 9]) {
  try {
    console.log(findUser(id));
  } catch (err) {
    if (err instanceof NotFoundError) {
      console.log("見つからない:", err.message);
    } else {
      throw err; // 想定外のエラーは投げ直す (握りつぶさない)
    }
  }
}

// --- 4. エラーにならない「失敗」もある ---
console.log(Number("abc"));        // NaN (エラーにはならない!)
console.log(Number.isNaN(Number("abc"))); // true
console.log(JSON.parse('{"a": 1}').a);    // 1
try {
  JSON.parse("{壊れたJSON");
} catch (err) {
  console.log(err.name); // SyntaxError (JSON.parse は throw する)
}
