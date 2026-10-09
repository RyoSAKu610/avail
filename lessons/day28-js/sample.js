// Day 28 サンプル: ファイルの読み書きとコマンドライン引数
// 実行: node lessons/day28-js/sample.js hello 123

import fs from "node:fs";     // ファイル操作 (Node.js 標準)
import os from "node:os";     // OS の情報 (一時フォルダの場所など)
import path from "node:path"; // パスの組み立て (Windows と Mac/Linux の違いを吸収)

// --- 1. コマンドライン引数: process.argv (Python の sys.argv) ---
// [0] は node の場所、[1] はこのファイルの場所。3 番目からが自分で渡した引数
const args = process.argv.slice(2);
console.log("引数:", args); // [ 'hello', '123' ] (何も渡さなければ [])

// --- 2. パスを組み立てる ---
const file = path.join(os.tmpdir(), "drill15-sample.json");
console.log("保存先:", path.basename(file)); // drill15-sample.json

// --- 3. JSON で保存する: オブジェクト → 文字列 → ファイル ---
const data = { name: "佐藤", tasks: ["メール返信", "会議"] };
fs.writeFileSync(file, JSON.stringify(data, null, 2)); // 2 はインデント幅 (人が読みやすく)

// --- 4. JSON を読み込む: ファイル → 文字列 → オブジェクト ---
const text = fs.readFileSync(file, "utf8");
const loaded = JSON.parse(text);
console.log(loaded.name, loaded.tasks.length); // 佐藤 2

// --- 5. ファイルがあるか調べる / 消す ---
console.log(fs.existsSync(file)); // true
fs.unlinkSync(file);
console.log(fs.existsSync(file)); // false

// --- 6. 終了コード: エラーで終わったことを呼び出し元 (シェルや CI) に伝える ---
// process.exitCode = 1;
