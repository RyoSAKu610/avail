// Day 7 演習: テストの成績表を作ろう
// 実行:       node lessons/day07-js/exercise.js
// 答え合わせ: node check.mjs 7
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// 生徒ごとに [名前, 点数] の組。名前が空の生徒もいる
const students = [
  ["佐藤", 92],
  ["鈴木", 74],
  ["", 65],
  ["高橋", 48],
];

// TODO 1: 点数から評価を返そう
//   80点以上 → "優"、70点以上 → "良"、60点以上 → "可"、それ未満 → "不可"
function grade(score) {
  return "?";
}

let passed = 0;

// TODO 2: students の全員について 1 行ずつ出力しよう (今は 1 人目しか出ていない)
//   for...of を使い、student[0] で名前、student[1] で点数を取り出す
const student = students[0];
{
  // TODO 3: 名前が空文字なら "(名前なし)" と表示しよう
  //   ヒント: 空文字は falsy なので || が使える
  const name = student[0];
  const score = student[1];
  console.log(`${name}: ${score}点 → ${grade(score)}`);

  // TODO 4: 60点以上なら passed を 1 増やそう
}

console.log(`合格者: ${passed}人`);
