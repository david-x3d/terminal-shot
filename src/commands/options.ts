import type { Command } from "commander";
import type { RawCliOptions } from "../types.js";

const optionKeys: Array<keyof RawCliOptions> = [
  "output",
  "format",
  "theme",
  "title",
  "subtitle",
  "font",
  "fontSize",
  "lineHeight",
  "padding",
  "radius",
  "shadow",
  "window",
  "prompt",
  "cwd",
  "width",
  "maxHeight",
  "scale",
  "background",
  "transparent",
  "config",
  "header",
  "watermark",
  "json",
  "copy",
  "highlight",
  "crop",
  "trim"
];

export function getCliOptions(program: Command): RawCliOptions {
  const options = program.opts<RawCliOptions>();
  const cliOptions: Partial<RawCliOptions> = {};

  for (const key of optionKeys) {
    const source = program.getOptionValueSource(key);

    if (source === "cli" || source === "env") {
      cliOptions[key] = options[key] as never;
    }
  }

  return cliOptions;
}
