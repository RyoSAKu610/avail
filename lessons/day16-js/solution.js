// Day 16 解答例: 銀行口座クラスを作ろう
// 実行: node lessons/day16-js/solution.js

class BankAccount {
  // TODO 1: private フィールドは class の先頭で宣言する
  #balance;
  #count;

  constructor(owner) {
    this.owner = owner;
    this.#balance = 0;
    this.#count = 0;
  }

  // TODO 2
  deposit(amount) {
    this.#balance += amount;
    this.#count++;
  }

  // TODO 3: 足りないときは早めに return する
  withdraw(amount) {
    if (amount > this.#balance) {
      return false;
    }
    this.#balance -= amount;
    this.#count++;
    return true;
  }

  // TODO 4: getter なら外から読めるが、書き換えはできない
  get balance() {
    return this.#balance;
  }
  get count() {
    return this.#count;
  }
}

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
