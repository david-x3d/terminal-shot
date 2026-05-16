import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { DEFAULT_THEME_NAME, getTheme } from "./themes.js";
import type { OutputFormat, RawCliOptions, RenderOptions } from "./types.js";

const configSchema = z
  .object({
    output: z.string().optional(),
    format: z.enum(["png", "svg", "html"]).optional(),
    theme: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    font: z.string().optional(),
    fontSize: z.number().positive().optional(),
    lineHeight: z.number().positive().optional(),
    padding: z.number().nonnegative().optional(),
    radius: z.number().nonnegative().optional(),
    shadow: z.boolean().optional(),
    window: z.boolean().optional(),
    prompt: z.string().optional(),
    cwd: z.string().optional(),
    width: z.number().positive().optional(),
    maxHeight: z.number().positive().optional(),
    scale: z.number().positive().optional(),
    background: z.string().optional(),
    transparent: z.boolean().optional(),
    header: z.boolean().optional(),
    watermark: z.string().optional()
  })
  .strict();

type TerminalShotConfig = z.infer<typeof configSchema>;

const defaultConfigName = "terminal-shot.config.json";

export function resolveRenderOptions(
  rawOptions: RawCliOptions,
  defaults: Partial<RawCliOptions> = {}
): RenderOptions {
  const config = loadConfig(rawOptions.config);
  const output =
    rawOptions.output ?? config.output ?? defaults.output ?? "terminal-shot.png";
  const format = parseFormat(
    rawOptions.format ?? config.format ?? defaults.format ?? inferFormat(output)
  );
  const themeName =
    rawOptions.theme ?? config.theme ?? defaults.theme ?? DEFAULT_THEME_NAME;
  const theme = getTheme(themeName);

  return {
    output,
    format,
    themeName,
    theme,
    title: rawOptions.title ?? config.title ?? defaults.title,
    subtitle: rawOptions.subtitle ?? config.subtitle ?? defaults.subtitle,
    fontFamily:
      rawOptions.font ??
      config.font ??
      defaults.font ??
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontSize: rawOptions.fontSize ?? config.fontSize ?? defaults.fontSize ?? 15,
    lineHeight:
      rawOptions.lineHeight ?? config.lineHeight ?? defaults.lineHeight ?? 1.55,
    padding: rawOptions.padding ?? config.padding ?? defaults.padding ?? 32,
    radius: rawOptions.radius ?? config.radius ?? defaults.radius ?? 18,
    shadow: rawOptions.shadow ?? config.shadow ?? defaults.shadow ?? true,
    window: rawOptions.window ?? config.window ?? defaults.window ?? true,
    header: rawOptions.header ?? config.header ?? defaults.header ?? true,
    prompt: rawOptions.prompt ?? config.prompt ?? defaults.prompt,
    cwd: rawOptions.cwd ?? config.cwd ?? defaults.cwd,
    width: rawOptions.width ?? config.width ?? defaults.width ?? 900,
    maxHeight: rawOptions.maxHeight ?? config.maxHeight ?? defaults.maxHeight,
    scale: rawOptions.scale ?? config.scale ?? defaults.scale ?? 2,
    background:
      rawOptions.background ?? config.background ?? defaults.background,
    transparent:
      rawOptions.transparent ??
      config.transparent ??
      defaults.transparent ??
      false,
    watermark:
      rawOptions.watermark ?? config.watermark ?? defaults.watermark,
    json: rawOptions.json ?? defaults.json ?? false
  };
}

export function writeDefaultConfig(file = defaultConfigName): void {
  const target = path.resolve(file);

  if (existsSync(target)) {
    throw new Error(`${file} already exists`);
  }

  const config = {
    theme: "tokyo-night",
    fontSize: 15,
    padding: 32,
    radius: 18,
    window: true,
    shadow: true,
    width: 900
  };

  writeFileSync(target, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

function loadConfig(configPath?: string): TerminalShotConfig {
  const target = configPath
    ? path.resolve(configPath)
    : path.resolve(defaultConfigName);

  if (!existsSync(target)) {
    return {};
  }

  const parsed = JSON.parse(readFileSync(target, "utf8")) as unknown;
  const result = configSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(`Invalid config file ${target}: ${result.error.message}`);
  }

  return result.data;
}

function inferFormat(output: string): OutputFormat {
  const extension = path.extname(output).toLowerCase();

  if (extension === ".svg") {
    return "svg";
  }

  if (extension === ".html" || extension === ".htm") {
    return "html";
  }

  return "png";
}

function parseFormat(format: string): OutputFormat {
  if (format === "png" || format === "svg" || format === "html") {
    return format;
  }

  throw new Error(`Invalid format "${format}". Expected png, svg, or html.`);
}
