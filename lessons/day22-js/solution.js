// Day 22 解答例: 注文 API からデータを取ってこよう
// 実行: node lessons/day22-js/solution.js

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

// TODO 1: await を使う関数には async を付ける
async function main() {
  console.log("注文 #1 を取得中...");

  // TODO 2
  const order = await fetchOrder(1);
  console.log(`注文 #1: ${order.name} ${order.price}円`);

  // TODO 3: 3 つの通信を同時に始め、全部そろうのを待つ (順番は配列の順に保たれる)
  const list = await Promise.all([1, 2, 3].map((id) => fetchOrder(id)));
  console.log(`3件まとめて取得: ${list.map((o) => o.name).join(", ")}`);
  console.log(`合計: ${list.reduce((sum, o) => sum + o.price, 0)}円`);

  // TODO 4: reject は await した場所で例外として投げられる
  try {
    await fetchOrder(9);
  } catch (err) {
    console.log(`注文 #9: エラー (${err.message})`);
  }
}

main();
