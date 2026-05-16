import { spawn } from "node:child_process";
import chalk from "chalk";
import type { Command } from "commander";
import { getCliOptions } from "./options.js";
import { renderText } from "./stdin.js";

type RunResult = {
  output: string;
  exitCode: number;
};

type RunOptions = {
  failFast?: boolean;
  forceColor?: boolean;
};

export function registerRunCommand(program: Command): void {
  const runCommand = program
    .command("run")
    .description("Run a shell command and render its output")
    .argument("<command...>", "Command to run through the system shell")
    .option("--fail-fast", "Exit without rendering when the command fails")
    .option("--no-force-color", "Do not set FORCE_COLOR=1 for the command");

  runCommand.action(async (commandParts: string[]) => {
    const commandText = commandParts.join(" ");
    const runOptions = runCommand.opts<RunOptions>();
    const result = await runShellCommand(commandText, runOptions);

    if (result.exitCode !== 0 && runOptions.failFast) {
      console.error(
        `${chalk.red("Command failed")} with exit code ${result.exitCode}`
      );
      process.exitCode = result.exitCode;
      return;
    }

    await renderText(result.output, getCliOptions(program), {
      source: commandText,
      exitCode: result.exitCode
    });

    if (result.exitCode !== 0) {
      process.exitCode = result.exitCode;
    }
  });
}

function runShellCommand(
  command: string,
  options: RunOptions
): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const env = { ...process.env };

    if (options.forceColor !== false) {
      env.FORCE_COLOR = "1";
    }

    const child = spawn(command, {
      shell: true,
      env,
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
    child.on("close", (code) => {
      resolve({
        output: chunks.join(""),
        exitCode: code ?? 1
      });
    });
  });
}
