// Day 16 演習: 銀行口座クラスを作ろう
// 実行:       node lessons/day16-js/exercise.js
// 答え合わせ: node check.mjs 16
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。

class BankAccount {
  // TODO 1: 残高 #balance と取引回数 #count を private フィールドとして用意し、
  //   constructor で owner (名義) を this.owner に、#balance と #count を 0 にしよう
  constructor(owner) {
    this.owner = "???";
  }

  // TODO 2: 入金。残高に amount を足し、取引回数を 1 増やす
  deposit(amount) {}

  // TODO 3: 出金。残高が足りなければ何もせず false を返す。
  //   足りれば残高から引き、取引回数を 1 増やして true を返す
  withdraw(amount) {
    return false;
  }

  // TODO 4: 残高と取引回数を読むための getter を書こう
  get balance() {
    return 0;
  }
  get count() {
    return 0;
  }
}

// ここから下は変更しなくて OK
const account = new BankAccount("山田 太郎");
console.log(`口座: ${account.owner}`);

account.deposit(5000);
console.log(`入金 5000 → 残高 ${account.balance}円`);

for (const amount of [2000, 9000]) {
  if (account.withdraw(amount)) {
    console.log(`出金 ${amount} → 残高 ${account.balance}円`);
  } else {
    console.log(`出金 ${amount} → 残高不足 (残高 ${account.balance}円)`);
  }
}
console.log(`取引回数: ${account.count}`);
