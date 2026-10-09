// Day 28 演習 (ミニプロジェクト): ToDo 管理 CLI
//
// 使い方 (TODO を解いたあと):
//   node lessons/day28-js/exercise.js add "牛乳を買う"
//   node lessons/day28-js/exercise.js list
//   node lessons/day28-js/exercise.js done 1
//   引数なしで実行すると、デモ (答え合わせ用) が流れる
// 答え合わせ: node check.mjs 28
//
// これまでに学んだ「配列・オブジェクト・例外・ファイル」を組み合わせます。
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ToDo 1 件は { id: 1, title: "牛乳を買う", done: false } という形

// TODO 1: file から ToDo の配列を読み込んで返そう
//   ファイルがなければ空の配列 [] を返す (fs.existsSync)
//   あれば fs.readFileSync(file, "utf8") で読み、JSON.parse で配列に戻す
function load(file) {
  return [];
}

// TODO 2: todos を JSON にして file に保存しよう (JSON.stringify(todos, null, 2))
function save(file, todos) {}

// TODO 3: 新しい ToDo を todos に追加して、その ToDo を返そう
//   id は「今ある最大の id + 1」(空なら 1)。done は false
//   ヒント: Math.max(0, ...todos.map((t) => t.id)) + 1
function add(todos, title) {
  return { id: 0, title, done: false };
}

// TODO 4: id が一致する ToDo の done を true にして、その ToDo を返そう
//   見つからなければ new Error(`#${id} は見つかりません`) を throw する
//   注意: コマンドラインから来る id は文字列 ("2") なので Number(id) で数値にして比べる
function complete(todos, id) {
  return { id, title: "?", done: false };
}

// 一覧を文字列の配列にする (完成済み)
function format(todos) {
  const lines = todos.map((t) => `${t.done ? "[x]" : "[ ]"} #${t.id} ${t.title}`);
  lines.push(`残り: ${todos.filter((t) => !t.done).length}件`);
  return lines;
}

// コマンドを 1 つ実行する (完成済み)
function run(file, command, arg) {
  const todos = load(file);
  try {
    switch (command) {
      case "add": {
        const todo = add(todos, arg);
        save(file, todos);
        console.log(`追加しました: #${todo.id} ${todo.title}`);
        break;
      }
      case "done": {
        const todo = complete(todos, arg);
        save(file, todos);
        console.log(`完了にしました: #${todo.id} ${todo.title}`);
        break;
      }
      case "list":
        for (const line of format(todos)) console.log(line);
        break;
      default:
        console.log("使い方: add <タイトル> | done <番号> | list");
    }
  } catch (err) {
    console.log(`エラー: ${err.message}`);
    process.exitCode = 1;
  }
}

// 引数なしならデモ、引数ありなら本番 (完成済み)
const [command, arg] = process.argv.slice(2);
if (command) {
  run(path.join(os.homedir(), ".drill15-todos.json"), command, arg);
} else {
  const demoFile = path.join(os.tmpdir(), `drill15-demo-${process.pid}.json`);
  console.log("=== デモ: 新しい ToDo リスト ===");
  for (const [c, a] of [["add", "牛乳を買う"], ["add", "日報を書く"], ["add", "経費精算"], ["done", "2"], ["done", "9"], ["list"]]) {
    console.log(`> ${c}${a ? " " + a : ""}`);
    run(demoFile, c, a);
  }
  console.log(`保存ファイルを読み直しても ${load(demoFile).length} 件`);
  fs.rmSync(demoFile, { force: true });
  process.exitCode = 0;
}
