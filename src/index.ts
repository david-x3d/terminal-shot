#!/usr/bin/env node
import chalk from "chalk";
import { Command, InvalidArgumentError, Option } from "commander";
import { writeDefaultConfig } from "./config.js";
import { registerDemoCommand } from "./commands/demo.js";
import { registerFileCommand } from "./commands/file.js";
import { getCliOptions } from "./commands/options.js";
import { registerRunCommand } from "./commands/run.js";
import { renderStdin } from "./commands/stdin.js";
import { runWizard } from "./commands/wizard.js";
import { listThemeNames } from "./themes.js";

const program = new Command();

program
  .name("terminal-shot")
  .description(
    "Turn terminal output, ANSI text, commands, or files into polished shareable images."
  )
  .version("0.1.0")
  .showHelpAfterError()
  .option("-o, --output <file>", "Output file")
  .addOption(
    new Option("--format <format>", "Output format").choices([
      "png",
      "svg",
      "html"
    ])
  )
  .option("--theme <name>", "Built-in theme name")
  .option("--title <text>", "Window title")
  .option("--subtitle <text>", "Window subtitle")
  .option("--font <family>", "CSS font-family")
  .option("--font-size <number>", "Font size", parseNumber)
  .option("--line-height <number>", "Line height", parseNumber)
  .option("--padding <number>", "Image padding", parseNumber)
  .option("--radius <number>", "Window radius", parseNumber)
  .option("--shadow", "Enable shadow")
  .option("--no-shadow", "Disable shadow")
  .option("--window", "Show terminal window chrome")
  .option("--no-window", "Hide terminal window chrome")
  .option("--prompt <text>", "Optional prompt line")
  .option("--cwd <text>", "Working directory label")
  .option("--width <number>", "Image width in CSS pixels", parseNumber)
  .option("--max-height <number>", "Maximum terminal body height", parseNumber)
  .option("--scale <number>", "PNG device scale factor", parseNumber)
  .option("--background <css-color>", "CSS background color or gradient")
  .option("--transparent", "Use a transparent image background")
  .option("--copy", "Copy output to clipboard after rendering")
  .option("--config <file>", "Config file path")
  .option("--no-header", "Hide title and subtitle text")
  .option("--watermark <text>", "Small watermark text")
  .option("--highlight <line-ranges>", "Line ranges to highlight")
  .option("--crop", "Crop output to max height")
  .option("--trim", "Trim transparent pixels after rendering")
  .option("--json", "Print render metadata as JSON")
  .action(async () => {
    if (process.stdin.isTTY) {
      await runWizard(getCliOptions(program));
      return;
    }

    await renderStdin(getCliOptions(program));
  });

program
  .command("wizard")
  .description("Interactively build a terminal shot")
  .action(async () => {
    await runWizard(getCliOptions(program));
  });

registerRunCommand(program);
registerFileCommand(program);
registerDemoCommand(program);

program
  .command("init")
  .description("Create terminal-shot.config.json")
  .argument("[file]", "Config file to create", "terminal-shot.config.json")
  .action((file: string) => {
    writeDefaultConfig(file);
    console.log(`${chalk.green("✓")} Created ${chalk.bold(file)}`);
  });

program
  .command("themes")
  .description("List built-in themes")
  .action(() => {
    for (const theme of listThemeNames()) {
      console.log(theme);
    }
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`${chalk.red("Error:")} ${message}`);
  process.exitCode = 1;
});

function parseNumber(value: string): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new InvalidArgumentError(`Expected a number, received "${value}"`);
  }

  return number;
}
