// Day 13 サンプル: JavaScript のオブジェクト・Map・文字列
// 実行: node lessons/day13-js/sample.js

// --- 1. オブジェクト: キーと値の組 (Python の dict に近い) ---
const user = { name: "佐藤", age: 25 };
console.log(user.name, user["age"]); // 佐藤 25
user.city = "東京";                  // 後からキーを追加できる
console.log(user.email);            // undefined (存在しないキーはエラーにならない)
console.log(Object.keys(user));      // [ 'name', 'age', 'city' ]

// --- 2. 分割代入: オブジェクトや配列から変数を取り出す ---
const { name, age } = user;
console.log(name, age); // 佐藤 25
const [first, second] = ["A", "B", "C"];
console.log(first, second); // A B

// --- 3. Map: キーの数が変わる「辞書」には Map を使う ---
const stock = new Map();
stock.set("りんご", 3);
stock.set("みかん", 5);
console.log(stock.get("りんご"), stock.has("ぶどう"), stock.size); // 3 false 2
stock.set("りんご", stock.get("りんご") + 1); // 値を更新
for (const [fruit, count] of stock) {        // [キー, 値] を分割代入で受け取る
  console.log(`${fruit}: ${count}`);
}

// --- 4. 文字列の基本操作 ---
const text = "りんご,みかん,ぶどう";
console.log(text.split(","));            // [ 'りんご', 'みかん', 'ぶどう' ]
console.log(text.includes("みかん"));    // true
console.log(text.slice(0, 3));           // りんご
console.log("7".padStart(3, "0"));       // 007 (社員番号などのゼロ埋め)

// --- 5. 日本語と文字数 ---
console.log("山田太郎".length); // 4
console.log("🍎".length);       // 2 ← 絵文字などは 2 と数えられる (UTF-16 のため)
console.log([..."🍎"].length);  // 1 ← [...文字列] なら見た目どおりに数えられる
console.log(new TextEncoder().encode("山田太郎").length); // 12 (UTF-8 のバイト数)
