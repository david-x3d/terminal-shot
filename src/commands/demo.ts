import type { Command } from "commander";
import { getCliOptions } from "./options.js";
import { renderText } from "./stdin.js";

export const demoText = `\u001b[36mterminal-shot\u001b[0m \u001b[2mv0.1.0\u001b[0m

\u001b[90m$ pnpm test --color=always\u001b[0m

\u001b[32m PASS \u001b[0m src/render/renderHtml.test.ts
\u001b[32m PASS \u001b[0m src/commands/file.test.ts
\u001b[32m PASS \u001b[0m src/themes.test.ts

\u001b[1mTest Suites:\u001b[0m \u001b[32m3 passed\u001b[0m, 3 total
\u001b[1mTests:\u001b[0m       \u001b[32m18 passed\u001b[0m, 18 total
\u001b[1mTime:\u001b[0m        1.42s
`;

export function registerDemoCommand(program: Command): void {
  program
    .command("demo")
    .description("Render a built-in demo terminal shot")
    .action(async () => {
      await renderText(demoText, getCliOptions(program), {
        source: "demo"
      });
    });
}
