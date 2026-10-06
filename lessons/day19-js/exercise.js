// Day 19 演習: 年齢の入力チェック
// 実行:       node lessons/day19-js/exercise.js
// 答え合わせ: node check.mjs 19
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// 入力チェックの失敗を表すエラー (完成済み)
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// TODO 1: 文字列 text を年齢 (整数) に変換して返そう。おかしな入力なら ValidationError を throw する
//   - 整数でなければ "数値ではありません"   (ヒント: Number(text) と Number.isInteger)
//   - 0 未満または 150 より大きければ "範囲外です (0〜150)"
function parseAge(text) {
  return Number(text);
}

const inputs = ["25", "abc", "-3", "200", "42"];
let ok = 0;
let ng = 0;

for (const text of inputs) {
  // TODO 2: try / catch で囲み、
  //   成功したら「"25" → 25歳」と出力して ok を 1 増やす
  //   ValidationError なら「"abc" → エラー: 数値ではありません」と出力して ng を 1 増やす
  //   それ以外のエラーは throw err; で投げ直す
  const age = parseAge(text);
  console.log(`"${text}" → ${age}歳`);
}

console.log(`OK: ${ok}件 / エラー: ${ng}件`);
