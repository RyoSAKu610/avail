// Day 25 サンプル: モジュールと TypeScript
// 実行: node lessons/day25-js/sample.ts   (Node.js 22.18 以降は .ts をそのまま実行できる)

// --- 1. import: 別のファイルの export を取り込む ---
import { withTax, yen } from "./tax.ts";
import type { TaxRate } from "./tax.ts"; // 型だけを取り込むときは import type

// --- 2. 変数や引数に型を書ける (Rust と同じく「名前: 型」) ---
const price: number = 1980;
const shop: string = "サンプル商店";
console.log(shop, yen(withTax(price)));

// --- 3. type でオブジェクトの形を決める (Rust の struct のような役割) ---
type User = {
  id: number;
  name: string;
  email?: string; // ? は「なくてもよい」(値は string か undefined)
};
const user: User = { id: 1, name: "佐藤" };
console.log(user.name, user.email ?? "(メールなし)");

// --- 4. ユニオン型: いくつかの型 (値) のどれか (Rust の enum に近い) ---
type Status = "未対応" | "対応中" | "完了";
function nextStatus(s: Status): Status {
  switch (s) {
    case "未対応":
      return "対応中";
    case "対応中":
      return "完了";
    case "完了":
      return "完了";
  }
}
console.log(nextStatus("未対応")); // 対応中

// --- 5. 配列とジェネリクス ---
const rates: TaxRate[] = [8, 10];
const firstOf = <T>(list: T[]): T | undefined => list[0];
console.log(firstOf(rates)); // 8

// --- 6. 型の間違いはエディタ (VS Code) が赤線で教えてくれる ---
// withTax(100, 5);       ← 5 は TaxRate ではないのでエラー
// user.age;              ← User に age はないのでエラー
// ただし node は型を「消して」実行するだけで、型のチェックはしない。
// チェックは VS Code や tsc (TypeScript コンパイラ) が行う
