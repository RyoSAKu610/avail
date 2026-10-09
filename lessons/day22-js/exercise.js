// Day 22 演習: 注文 API からデータを取ってこよう
// 実行:       node lessons/day22-js/exercise.js
// 答え合わせ: node check.mjs 22
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// 注文 API の代わり (完成済み)。50ms 後に注文を返す。ない ID なら reject する
const ORDERS = {
  1: { name: "コーヒー", price: 500 },
  2: { name: "ケーキ", price: 650 },
  3: { name: "サンド", price: 500 },
};
function fetchOrder(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ORDERS[id]) resolve(ORDERS[id]);
      else reject(new Error(`注文 #${id} は存在しません`));
    }, 50);
  });
}

// TODO 1: main を async 関数にしよう (function の前に async を付ける)
function main() {
  console.log("注文 #1 を取得中...");

  // TODO 2: fetchOrder(1) の結果を await で待とう
  //   今は Promise そのものが入っているので、order.name が undefined になる
  const order = fetchOrder(1);
  console.log(`注文 #1: ${order.name} ${order.price}円`);

  // TODO 3: 注文 1, 2, 3 を Promise.all で同時に取得し、名前の一覧と合計を出力しよう
  //   ヒント: const list = await Promise.all([1, 2, 3].map((id) => fetchOrder(id)));
  const list = [];
  console.log(`3件まとめて取得: ${list.map((o) => o.name).join(", ")}`);
  console.log(`合計: ${list.reduce((sum, o) => sum + o.price, 0)}円`);

  // TODO 4: 存在しない注文 #9 を await で取得し、try / catch でエラーを受け取って
  //   「注文 #9: エラー (注文 #9 は存在しません)」と出力しよう
}

main();
