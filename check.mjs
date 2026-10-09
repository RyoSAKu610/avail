#!/usr/bin/env node
// 答え合わせスクリプト (Windows / macOS / Linux 共通)
//
// 使い方:
//   node check.mjs 1               Day 1 の演習 (exercise) を答え合わせ
//   node check.mjs 1 --solution    Day 1 の解答例 (solution) で動作確認
//   node check.mjs                 全日の進み具合を一覧表示
//
// 教材メンテナンス用 (CI でも使用):
//   node check.mjs --all --solution   全日の解答例が expected.txt と一致するか
//   node check.mjs --all --smoke      全日の演習がエラーなく実行できるか
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const LANG_NAMES = { js: "JavaScript", go: "Go", cpp: "C++" };
// JavaScript の日は .js、TypeScript を扱う日は .ts のファイルを使う
const jsFile = (dir, target) => (existsSync(join(dir, `${target}.ts`)) ? `${target}.ts` : `${target}.js`);
const SOURCE_PATHS = {
  js: (target, dir) => jsFile(dir, target),
  go: (target) => `${target}/main.go`,
  cpp: (target) => `${target}.cpp`,
};

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const green = paint("32");
const red = paint("31");
const yellow = paint("33");
const dim = paint("2");
const bold = paint("1");

function findLessons() {
  return readdirSync(join(ROOT, "lessons"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name.match(/^day(\d+)-(js|go|cpp)$/))
    .filter(Boolean)
    .map((m) => ({ day: Number(m[1]), lang: m[2], dir: join(ROOT, "lessons", m[0]) }))
    .sort((a, b) => a.day - b.day);
}

function exec(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", timeout: 120_000 });
  if (r.error?.code === "ENOENT") {
    return { status: -1, stdout: "", stderr: `「${cmd}」コマンドが見つかりません。SETUP.md を見てインストールしてください。` };
  }
  if (r.error) return { status: -1, stdout: "", stderr: String(r.error) };
  return { status: r.status, stdout: r.stdout, stderr: r.stderr };
}

// target は "exercise" か "solution"
function runLesson({ lang, dir }, target) {
  if (lang === "js") return exec("node", [jsFile(dir, target)], dir);
  if (lang === "go") return exec("go", ["run", `./${target}`], dir);

  // C++: 一時フォルダにコンパイルしてから実行する
  const tmp = mkdtempSync(join(tmpdir(), "check-"));
  const bin = join(tmp, process.platform === "win32" ? "main.exe" : "main.out");
  try {
    const build = exec("g++", ["-std=c++17", "-Wall", "-Wextra", `${target}.cpp`, "-o", bin], dir);
    if (build.status !== 0) return build;
    return { ...exec(bin, [], dir), warnings: build.stderr };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

const toLines = (text) => text.replace(/\r\n/g, "\n").trimEnd().split("\n").map((line) => line.trimEnd());

function compare(lesson, result) {
  const expected = toLines(readFileSync(join(lesson.dir, "expected.txt"), "utf8"));
  const actual = toLines(result.stdout);
  const diffs = [];
  for (let i = 0; i < Math.max(expected.length, actual.length); i++) {
    if (expected[i] !== actual[i]) diffs.push({ line: i + 1, expected: expected[i], actual: actual[i] });
  }
  return { expected, diffs, matched: expected.filter((line, i) => line === actual[i]).length };
}

function checkOne(lesson, target) {
  const label = `Day ${lesson.day} (${LANG_NAMES[lesson.lang]})`;
  const file = relative(ROOT, join(lesson.dir, SOURCE_PATHS[lesson.lang](target, lesson.dir)));
  console.log(bold(`${label} ${target === "solution" ? "解答例" : "演習"}: ${file}`));

  const result = runLesson(lesson, target);
  if (result.warnings) console.log(yellow("コンパイラの警告:\n") + dim(result.warnings.trimEnd()));
  if (result.status !== 0) {
    console.log(red("✗ コンパイルまたは実行でエラーが出ました。メッセージを読んで直してみましょう。"));
    console.log(result.stderr.trimEnd());
    return false;
  }

  const { expected, diffs } = compare(lesson, result);
  if (diffs.length === 0) {
    console.log(green(`✓ 正解です! (${expected.length}行すべて一致)`));
    if (target === "exercise") {
      const solution = relative(ROOT, join(lesson.dir, SOURCE_PATHS[lesson.lang]("solution", lesson.dir)));
      console.log(dim(`  解答例と書き方を見比べてみましょう: ${solution}`));
    }
    return true;
  }

  console.log(red(`✗ 出力が期待と ${diffs.length} 行ちがいます (期待: ${relative(ROOT, join(lesson.dir, "expected.txt"))})`));
  for (const d of diffs.slice(0, 8)) {
    console.log(`  ${d.line}行目`);
    console.log(`    期待: ${d.expected ?? dim("(この行はないはず)")}`);
    console.log(`    実際: ${d.actual ?? dim("(この行が出力されていない)")}`);
  }
  if (diffs.length > 8) console.log(dim(`  ...ほか ${diffs.length - 8} 行`));
  return false;
}

function showProgress(lessons) {
  console.log(bold("進み具合 (各日の演習を実行して確認しています)\n"));
  let done = 0;
  for (const lesson of lessons) {
    const result = runLesson(lesson, "exercise");
    const head = `Day ${String(lesson.day).padStart(2)}  ${LANG_NAMES[lesson.lang].padEnd(10)}`;
    if (result.status !== 0) {
      console.log(`${head} ${red("エラー")}  ${dim(`node check.mjs ${lesson.day} で詳細を確認`)}`);
      continue;
    }
    const { expected, diffs, matched } = compare(lesson, result);
    if (diffs.length === 0) {
      done++;
      console.log(`${head} ${green("✓ 完了")}`);
    } else {
      console.log(`${head} ${yellow("… 途中")}  ${dim(`${matched}/${expected.length} 行一致`)}`);
    }
  }
  console.log(`\n完了: ${done} / ${lessons.length} 日`);
}

const args = process.argv.slice(2);
const target = args.includes("--solution") ? "solution" : "exercise";
const dayArg = args.find((a) => /^(day)?\d+$/i.test(a));
const lessons = findLessons();

if (args.includes("--all")) {
  let ok = true;
  for (const lesson of lessons) {
    if (args.includes("--smoke")) {
      const result = runLesson(lesson, "exercise");
      const pass = result.status === 0;
      console.log(`${pass ? green("✓") : red("✗")} Day ${lesson.day} (${LANG_NAMES[lesson.lang]}) 演習が実行できる`);
      if (!pass) console.log(result.stderr.trimEnd());
      ok &&= pass;
    } else {
      ok = checkOne(lesson, target) && ok;
      console.log();
    }
  }
  process.exit(ok ? 0 : 1);
} else if (dayArg) {
  const day = Number(dayArg.replace(/^day/i, ""));
  const lesson = lessons.find((l) => l.day === day);
  if (!lesson) {
    console.log(red(`Day ${day} の教材はまだありません。`) + ` 用意されているのは Day ${lessons.map((l) => l.day).join(", ")} です。`);
    process.exit(1);
  }
  process.exit(checkOne(lesson, target) ? 0 : 1);
} else {
  showProgress(lessons);
}
