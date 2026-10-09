// Day 22 サンプル: Promise と async / await
// 実行: node lessons/day22-js/sample.js

// --- 1. 時間のかかる処理は「あとで結果が届く約束 (Promise)」を返す ---
// ms ミリ秒後に value を返す Promise (ネットワーク通信の代わり)
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

// --- 2. JavaScript は待たずに次の行へ進む ---
console.log("1. 開始");
delay(100).then(() => console.log("3. 100ms 後に届いた")); // then: 届いたら実行
console.log("2. 先にこちらが出る");

// --- 3. async 関数の中では await で「届くまで待つ」書き方ができる ---
async function main() {
  await delay(200); // 上の then が先に終わるのを待つ (説明用)
  console.log("4. await で待った");

  const value = await delay(50, "データ");
  console.log("5.", value);

  // --- 4. 失敗 (reject) は try / catch で受け取れる ---
  const fail = () => new Promise((_, reject) => setTimeout(() => reject(new Error("通信エラー")), 50));
  try {
    await fail();
  } catch (err) {
    console.log("6. catch:", err.message);
  }

  // --- 5. Promise.all: 複数を同時に始めて、全部そろうのを待つ ---
  const start = Date.now();
  const results = await Promise.all([delay(100, "A"), delay(100, "B"), delay(100, "C")]);
  const elapsed = Date.now() - start;
  console.log("7.", results, elapsed < 200 ? "(同時に走ったので約 100ms)" : "(遅い)");

  // --- 6. 本物の通信は fetch (Node.js 18 以降とブラウザで使える) ---
  // const res = await fetch("https://example.com/api/users");
  // const users = await res.json();
}

main();
