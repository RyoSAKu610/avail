// lessons/ と curriculum.json から、ブラウザで読める教材ビューア site/index.html を生成する。
// あわせて README.md の「30日の時間割」の表も curriculum.json から作り直す。
//
// 使い方 (site/ で):
//   npm install
//   npm run build                         site/index.html と README.md を更新
//   node build.mjs --fragment out.html    <head> などを除いた断片も出力 (Artifact 公開用)
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import go from "highlight.js/lib/languages/go";
import javascript from "highlight.js/lib/languages/javascript";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import { Marked } from "marked";

const SITE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SITE, "..");

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("typescript", typescript);
hljs.registerAliases(["ts"], { languageName: "typescript" });
hljs.registerAliases(["csv"], { languageName: "plaintext" });
hljs.registerAliases(["js"], { languageName: "javascript" });
hljs.registerAliases(["text", "txt"], { languageName: "plaintext" });

const LANG_NAMES = { js: "JavaScript", go: "Go", cpp: "C++" };

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function highlight(code, lang) {
  const language = hljs.getLanguage(lang ?? "") ? lang : "plaintext";
  return hljs.highlight(code, { language }).value;
}

const marked = new Marked({
  renderer: {
    heading({ tokens, depth, text }) {
      const inner = this.parser.parseInline(tokens);
      // 「## 1. 〇〇」の見出しは、タイマーの区間 (phase-1〜4) と対応させる
      const phase = depth === 2 && text.match(/^(\d)\.\s/);
      const id = phase ? ` id="phase-${phase[1]}"` : "";
      return `<h${depth}${id}>${inner}</h${depth}>\n`;
    },
    code({ text, lang }) {
      return `<pre class="code"><code class="hljs">${highlight(text, lang)}</code></pre>\n`;
    },
    link({ href, tokens }) {
      const inner = this.parser.parseInline(tokens);
      if (/^https?:/.test(href)) return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${inner}</a>`;
      // レッスン内のファイルへのリンクは、右側のコードパネルで開く
      return `<a href="#" class="file-link" data-file="${escapeHtml(href)}">${inner}</a>`;
    },
  },
});

// 表は横スクロールできる箱で包む (スマホで本文がはみ出さないように)
const wrapTables = (html) => html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");

function lessonFiles(lesson) {
  const { day, lang, dir } = lesson;
  const rel = `lessons/${dir}`;
  const ext = lang === "js" && existsSync(join(ROOT, rel, "sample.ts")) ? "ts" : lang;
  const source = (kind) => (lang === "go" ? `${kind}/main.go` : `${kind}.${ext}`);
  const run = (kind) => {
    if (lang === "js") return `node ${rel}/${kind}.${ext}`;
    if (lang === "go") return `go run ./${rel}/${kind}`;
    return `g++ -std=c++17 -Wall -Wextra ${rel}/${kind}.cpp -o ${kind}.out && ./${kind}.out`;
  };
  const files = [
    { id: "sample", label: "サンプル", path: source("sample"), run: run("sample") },
    { id: "exercise", label: "演習", path: source("exercise"), run: run("exercise") },
    { id: "expected", label: "期待する出力", path: "expected.txt", run: `node check.mjs ${day}` },
    { id: "solution", label: "解答例", path: source("solution"), run: run("solution") },
  ];
  // sample / exercise / solution 以外に置いたファイル (モジュールや CSV など) も表示する
  const standard = new Set(["README.md", "expected.txt", ...files.map((f) => f.path.split("/")[0])]);
  for (const name of readdirSync(join(ROOT, rel)).sort()) {
    if (standard.has(name) || statSync(join(ROOT, rel, name)).isDirectory()) continue;
    files.push({ id: `extra-${name}`, label: "補助ファイル", path: name, run: "" });
  }
  return files.map((f) => {
    const raw = readFileSync(join(ROOT, rel, f.path), "utf8");
    const fileLang = f.path.split(".").pop();
    const hlLang = f.id === "expected" ? "plaintext" : f.id.startsWith("extra-") ? fileLang : ext;
    return { ...f, raw, html: highlight(raw, hlLang) };
  });
}

function loadLessons() {
  const lessons = {};
  for (const dir of readdirSync(join(ROOT, "lessons")).sort()) {
    const m = dir.match(/^day(\d+)-(js|go|cpp)$/);
    if (!m) continue;
    const lesson = { day: Number(m[1]), lang: m[2], dir };
    const md = readFileSync(join(ROOT, "lessons", dir, "README.md"), "utf8");
    lesson.title = md.match(/^# (.+)$/m)?.[1] ?? `Day ${lesson.day}`;
    lesson.html = wrapTables(marked.parse(md));
    lesson.files = lessonFiles(lesson);
    lessons[lesson.day] = lesson;
  }
  return lessons;
}

function buildData() {
  const curriculum = JSON.parse(readFileSync(join(ROOT, "curriculum.json"), "utf8"));
  const lessons = loadLessons();
  for (const round of curriculum.rounds) {
    for (const d of round.days) d.ready = Boolean(lessons[d.day]);
  }
  return { ...curriculum, langNames: LANG_NAMES, lessons };
}

function renderRoadmap({ rounds, lessons }) {
  const cell = (d) => {
    const label = d.ready ? `**[Day ${d.day}](lessons/${lessons[d.day].dir}/README.md)**` : `Day ${d.day}`;
    return `${label} ${d.topic.replace(/</g, "&lt;").replace(/>/g, "&gt;")}`;
  };
  const rows = rounds.map((r, i) => {
    const byLang = Object.fromEntries(r.days.map((d) => [d.lang, d]));
    return `| ${i + 1} | ${r.theme} | ${cell(byLang.js)} | ${cell(byLang.go)} | ${cell(byLang.cpp)} |`;
  });
  return ["| ラウンド | テーマ | JavaScript | Go | C++ |", "| --- | --- | --- | --- | --- |", ...rows].join("\n");
}

function updateReadme(data) {
  const path = join(ROOT, "README.md");
  if (!existsSync(path)) return;
  const readme = readFileSync(path, "utf8");
  const start = "<!-- roadmap:start (site/build.mjs が curriculum.json から生成) -->";
  const end = "<!-- roadmap:end -->";
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end}`);
  if (!pattern.test(readme)) return;
  writeFileSync(path, readme.replace(pattern, `${start}\n${renderRoadmap(data)}\n${end}`));
}

const data = buildData();
// </script> などで JSON が途切れないよう < をエスケープする
const json = JSON.stringify(data).replace(/</g, "\\u003c");
const template = readFileSync(join(SITE, "template.html"), "utf8");
const [head, body] = template.replace("__DRILL_DATA__", () => json).split("<!-- body -->");

writeFileSync(
  join(SITE, "index.html"),
  `<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head.trim()}\n</head>\n<body>\n${body.trim()}\n</body>\n</html>\n`,
);
updateReadme(data);

const fragmentFlag = process.argv.indexOf("--fragment");
if (fragmentFlag !== -1) writeFileSync(process.argv[fragmentFlag + 1], `${head.trim()}\n${body.trim()}\n`);

console.log(`site/index.html を生成しました (レッスン ${Object.keys(data.lessons).length} 日分)`);
