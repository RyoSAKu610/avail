// Day 28 解答例 (ミニプロジェクト): ToDo 管理 CLI
//
// 使い方:
//   node lessons/day28-js/solution.js add "牛乳を買う"
//   node lessons/day28-js/solution.js list
//   node lessons/day28-js/solution.js done 1
//   引数なしで実行すると、デモ (答え合わせ用) が流れる
//
// これまでに学んだ「配列・オブジェクト・例外・ファイル」を組み合わせます。
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ToDo 1 件は { id: 1, title: "牛乳を買う", done: false } という形

// TODO 1: ファイルがなければ空の配列から始める
function load(file) {
  if (!fs.existsSync(file)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// TODO 2: 人が読めるようにインデント付きで保存
function save(file, todos) {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2));
}

// TODO 3: 空の配列でも Math.max(0) = 0 なので id は 1 から始まる
function add(todos, title) {
  const todo = { id: Math.max(0, ...todos.map((t) => t.id)) + 1, title, done: false };
  todos.push(todo);
  return todo;
}

// TODO 4: 引数の id は文字列なので Number() で数値にしてから === で比べる
function complete(todos, id) {
  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) {
    throw new Error(`#${id} は見つかりません`);
  }
  todo.done = true;
  return todo;
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
