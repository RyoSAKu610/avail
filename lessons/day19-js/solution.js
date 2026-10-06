// Day 19 解答例: 年齢の入力チェック
// 実行: node lessons/day19-js/solution.js

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// TODO 1: おかしな入力は throw して、呼び出し元に知らせる
function parseAge(text) {
  const age = Number(text);
  if (!Number.isInteger(age)) {
    throw new ValidationError("数値ではありません");
  }
  if (age < 0 || age > 150) {
    throw new ValidationError("範囲外です (0〜150)");
  }
  return age;
}

const inputs = ["25", "abc", "-3", "200", "42"];
let ok = 0;
let ng = 0;

for (const text of inputs) {
  // TODO 2: 想定しているエラーだけを処理し、それ以外は投げ直す
  try {
    const age = parseAge(text);
    console.log(`"${text}" → ${age}歳`);
    ok++;
  } catch (err) {
    if (!(err instanceof ValidationError)) throw err;
    console.log(`"${text}" → エラー: ${err.message}`);
    ng++;
  }
}

console.log(`OK: ${ok}件 / エラー: ${ng}件`);
