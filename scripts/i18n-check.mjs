// Checks that every locale in messages/ has the same keys and the same {variables}.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const MESSAGES_DIR = "messages";
const BASE_LOCALE = "pt-BR.json";
const VARIABLE = /\{(?<name>\w+)[,}]/gu;

function flatten(messages, prefix = "") {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === "object"
      ? flatten(value, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value]]
  );
}

function load(file) {
  const content = readFileSync(join(MESSAGES_DIR, file), "utf8");
  return new Map(flatten(JSON.parse(content)));
}

function variablesOf(text) {
  const names = [...text.matchAll(VARIABLE)].map((match) => match.groups.name);
  return [...new Set(names)].sort().join(",");
}

const base = load(BASE_LOCALE);
const problems = [];

for (const file of readdirSync(MESSAGES_DIR)) {
  if (file === BASE_LOCALE) {
    continue;
  }

  const other = load(file);

  for (const [key, text] of base) {
    if (!other.has(key)) {
      problems.push(`${file}: missing ${key}`);
    } else if (variablesOf(text) !== variablesOf(other.get(key))) {
      problems.push(`${file}: variables differ in ${key}`);
    }
  }

  for (const key of other.keys()) {
    if (!base.has(key)) {
      problems.push(`${file}: extra ${key}`);
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`i18n ok: ${base.size} keys`);
