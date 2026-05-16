import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";
import { resolveRenderOptions } from "../config.js";
import { renderHtml } from "../render/renderHtml.js";
import { renderPng } from "../render/renderPng.js";
import { renderSvg } from "../render/renderSvg.js";
import type { RawCliOptions, RenderOptions, RenderResult } from "../types.js";

type RenderMetadata = {
  exitCode?: number;
  source?: string;
};

export async function renderStdin(
  rawOptions: RawCliOptions
): Promise<RenderResult> {
  const input = await readStdin();
  return renderText(input, rawOptions, { source: "stdin" });
}

export async function renderText(
  input: string,
  rawOptions: RawCliOptions,
  metadata: RenderMetadata = {}
): Promise<RenderResult> {
  const options = resolveRenderOptions(rawOptions);
  await ensureOutputDirectory(options.output);
  const result = await renderToFile(input, options);
  const payload = {
    ...result,
    ...metadata
  };

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    printResult(payload);
  }

  return payload;
}

async function readStdin(): Promise<string> {
  process.stdin.setEncoding("utf8");

  let input = "";

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  return input;
}

async function renderToFile(
  input: string,
  options: RenderOptions
): Promise<RenderResult> {
  if (options.format === "png") {
    return renderPng(input, options);
  }

  const content =
    options.format === "svg" ? renderSvg(input, options) : renderHtml(input, options);
  await writeFile(options.output, content, "utf8");
  const file = await stat(options.output);

  return {
    output: options.output,
    format: options.format,
    theme: options.themeName,
    bytes: file.size
  };
}

async function ensureOutputDirectory(output: string): Promise<void> {
  const directory = path.dirname(path.resolve(output));
  await mkdir(directory, { recursive: true });
}

function printResult(result: RenderResult & RenderMetadata): void {
  console.log(`${chalk.green("✓")} Rendered ${chalk.bold(result.output)}`);
  console.log(`Theme: ${result.theme}`);
  console.log(`Format: ${result.format}`);

  if (result.width && result.height) {
    console.log(`Size: ${result.width}x${result.height}`);
  }

  if (typeof result.exitCode === "number") {
    console.log(`Exit code: ${result.exitCode}`);
  }
}
