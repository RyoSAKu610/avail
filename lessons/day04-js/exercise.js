// Day 4 演習: お会計の関数を作ろう
// 実行:       node lessons/day04-js/exercise.js
// 答え合わせ: node check.mjs 4
//
// 今は関数の中身が空なので、出力が期待どおりになりません。
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

// TODO 1: 税込価格を返す関数 withTax を完成させよう
//   - 引数 rate (税率 %) のデフォルト値を 10 にする
//   - 計算は Day 1 と同じく「price * (100 + rate) / 100」を Math.floor で切り捨て
function withTax(price, rate) {
  return 0;
}

// TODO 2: 送料を返すアロー関数 shippingFee を完成させよう
//   - 合計が 5000 円以上なら 0、それ未満なら 550 を返す
//   - ヒント: 条件 ? A : B (三項演算子) が使える。Python の「A if 条件 else B」と同じ
const shippingFee = (total) => 0;

// TODO 3: 金額を「1,980円」の形の文字列にするアロー関数 yen を完成させよう
const yen = (n) => "";

console.log(`商品: ${yen(1980)}`);
console.log(`税込 (10%): ${yen(withTax(1980))}`);
console.log(`税込 (軽減税率 8%): ${yen(withTax(1980, 8))}`);
console.log(`送料 (合計 3,000円): ${yen(shippingFee(3000))}`);
console.log(`送料 (合計 6,000円): ${yen(shippingFee(6000))}`);
