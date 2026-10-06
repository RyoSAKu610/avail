// Day 7 解答例: テストの成績表を作ろう
// 実行: node lessons/day07-js/solution.js

const students = [
  ["佐藤", 92],
  ["鈴木", 74],
  ["", 65],
  ["高橋", 48],
];

// TODO 1: 上から順に判定するので、条件は大きい方から書く
function grade(score) {
  if (score >= 80) {
    return "優";
  } else if (score >= 70) {
    return "良";
  } else if (score >= 60) {
    return "可";
  }
  return "不可";
}

let passed = 0;

// TODO 2: for...of で全員を処理する
for (const student of students) {
  // TODO 3: 空文字は falsy なので、|| の右側が使われる
  const name = student[0] || "(名前なし)";
  const score = student[1];
  console.log(`${name}: ${score}点 → ${grade(score)}`);

  // TODO 4
  if (score >= 60) {
    passed++;
  }
}

console.log(`合格者: ${passed}人`);
