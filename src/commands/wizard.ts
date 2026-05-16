import { readFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { spawn } from "node:child_process";
import chalk from "chalk";
import { DEFAULT_THEME_NAME, listThemeNames } from "../themes.js";
import type { RawCliOptions } from "../types.js";
import { demoText } from "./demo.js";
import { renderText } from "./stdin.js";

type Source =
  | { kind: "command"; command: string }
  | { kind: "file"; file: string }
  | { kind: "paste"; text: string }
  | { kind: "demo" };


export async function runWizard(baseOptions: RawCliOptions = {}): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    console.log(chalk.bold("\nterminal-shot wizard"));
    console.log(chalk.dim("Press Ctrl+C to cancel.\n"));

    const source = await pickSource(rl);
    const text = await loadSource(source);
    const theme = await pickTheme(rl);
    const title = await ask(rl, "Window title", "");
    const output = await ask(rl, "Output file", "terminal-shot.png");

    const options: RawCliOptions = {
      ...baseOptions,
      theme,
      output,
      ...(title ? { title } : {})
    };

    console.log("");
    await renderText(text, options, { source: describeSource(source) });
  } finally {
    rl.close();
  }
}

async function pickSource(
  rl: ReturnType<typeof createInterface>
): Promise<Source> {
  console.log("What do you want to capture?");
  console.log(`  ${chalk.bold("1")}  Run a shell command`);
  console.log(`  ${chalk.bold("2")}  Render a text file`);
  console.log(`  ${chalk.bold("3")}  Paste text`);
  console.log(`  ${chalk.bold("4")}  Built-in demo`);

  const choice = (await ask(rl, "Choice", "1")).trim();

  if (choice === "2") {
    const file = await ask(rl, "File path", "");
    if (!file) throw new Error("A file path is required.");
    return { kind: "file", file };
  }

  if (choice === "3") {
    console.log(chalk.dim("Paste text. Finish with a blank line."));
    const text = await readMultiline(rl);
    return { kind: "paste", text };
  }

  if (choice === "4") {
    return { kind: "demo" };
  }

  const command = await ask(rl, "Command", "");
  if (!command) throw new Error("A command is required.");
  return { kind: "command", command };
}

async function pickTheme(
  rl: ReturnType<typeof createInterface>
): Promise<string> {
  const themes = listThemeNames();
  console.log(`\nThemes: ${chalk.dim(themes.join(", "))}`);
  const answer = (await ask(rl, "Theme", DEFAULT_THEME_NAME)).trim();
  const chosen = answer || DEFAULT_THEME_NAME;

  if (!themes.includes(chosen)) {
    throw new Error(`Unknown theme "${chosen}".`);
  }

  return chosen;
}

async function loadSource(source: Source): Promise<string> {
  if (source.kind === "command") {
    return runShellCommand(source.command);
  }

  if (source.kind === "file") {
    return readFile(source.file, "utf8");
  }

  if (source.kind === "paste") {
    return source.text;
  }

  return demoText;
}

function describeSource(source: Source): string {
  if (source.kind === "command") return source.command;
  if (source.kind === "file") return source.file;
  if (source.kind === "paste") return "paste";
  return "demo";
}

async function ask(
  rl: ReturnType<typeof createInterface>,
  label: string,
  fallback: string
): Promise<string> {
  const hint = fallback ? chalk.dim(` (${fallback})`) : "";
  const answer = await rl.question(`${label}${hint}: `);
  return answer.trim() || fallback;
}

async function readMultiline(
  rl: ReturnType<typeof createInterface>
): Promise<string> {
  const lines: string[] = [];

  for (;;) {
    const line = await rl.question("");
    if (line === "") break;
    lines.push(line);
  }

  return lines.join("\n");
}

function runShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      shell: true,
      env: { ...process.env, FORCE_COLOR: "1" },
      stdio: ["ignore", "pipe", "pipe"]
    });
    const chunks: string[] = [];

    child.stdout?.on("data", (chunk: Buffer) => {
      chunks.push(chunk.toString("utf8"));
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      chunks.push(chunk.toString("utf8"));
    });
    child.on("error", reject);
    child.on("close", () => resolve(chunks.join("")));
  });
}
