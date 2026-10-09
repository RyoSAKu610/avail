// Day 16 サンプル: JavaScript の class
// 実行: node lessons/day16-js/sample.js

// --- 1. class の基本 ---
class Employee {
  // # で始まるフィールドは外から見えない (private)
  #salary;

  // constructor: new したときに呼ばれる (Python の __init__)
  constructor(name, salary) {
    this.name = name; // this は「このオブジェクト自身」(Python の self)
    this.#salary = salary;
  }

  // メソッド
  raise(percent) {
    this.#salary = Math.floor((this.#salary * (100 + percent)) / 100);
  }

  // getter: メソッドだが、プロパティのように () なしで読める
  get salary() {
    return this.#salary;
  }

  // static: インスタンスではなくクラスに付く関数 (Rust の関連関数 Employee::new に近い)
  static newGraduate(name) {
    return new Employee(name, 220000);
  }
}

const e = Employee.newGraduate("佐藤");
e.raise(5);
console.log(e.name, e.salary); // 佐藤 231000
// console.log(e.#salary);  ← SyntaxError: クラスの外からは読めない

// --- 2. 継承 (extends) と super ---
class Manager extends Employee {
  constructor(name, salary, team) {
    super(name, salary); // 親クラスの constructor を呼ぶ
    this.team = team;
  }
  describe() {
    return `${this.name} (${this.team}チーム)`;
  }
}
const m = new Manager("鈴木", 400000, "開発");
console.log(m.describe(), m.salary); // 鈴木 (開発チーム) 400000

// --- 3. オブジェクトは「参照」で渡される ---
const a = { count: 1 };
const b = a;         // 同じオブジェクトを指す (コピーではない)
b.count = 99;
console.log(a.count); // 99

// --- 4. スプレッド構文で浅いコピーを作る ---
const c = { ...a, count: 2 }; // a の中身をコピーし、count だけ上書き
console.log(a.count, c.count); // 99 2
