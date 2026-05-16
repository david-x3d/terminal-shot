import { readFile } from "node:fs/promises";
import type { Command } from "commander";
import { getCliOptions } from "./options.js";
import { renderText } from "./stdin.js";

export function registerFileCommand(program: Command): void {
  program
    .command("file")
    .description("Render a text file into an image")
    .argument("<file>", "Text file to render")
    .action(async (file: string) => {
      const input = await readFile(file, "utf8");
      await renderText(input, getCliOptions(program), { source: file });
    });
}
