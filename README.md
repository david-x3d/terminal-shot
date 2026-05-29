# terminal-shot 📸

> Beautiful terminal screenshots from text, commands, and ANSI output.

[![npm](https://img.shields.io/npm/v/terminal-shot?color=cb3837)](https://www.npmjs.com/package/terminal-shot)
[![GitHub](https://img.shields.io/badge/GitHub-david--x3d%2Fterminal--shot-181717?logo=github)](https://github.com/david-x3d/terminal-shot)
![Node](https://img.shields.io/badge/node-%3E%3D18-339933)
![License](https://img.shields.io/badge/license-MIT-blue)

`terminal-shot` turns terminal output into polished PNG, SVG, or HTML images for READMEs, docs, Discord, changelogs, and social posts. It is local-first: no uploads, no telemetry, no desktop screen capture.

![terminal-shot demo](./examples/demo.png)

## ✨ Features

- Render pasted text, piped ANSI output, files, commands, or a built-in demo.
- Export `png`, `svg`, or `html`.
- Preserve ANSI colors and terminal formatting.
- Built-in themes: `dark`, `catppuccin`, `tokyo-night`, `dracula`, `nord`, `github-dark`, `github-light`, `glass`, `mono`, and `matrix`.
- Window chrome, title, subtitle, prompt, watermark, sizing, padding, radius, transparency, and typography controls.
- Interactive wizard when you run `terminal-shot` with no arguments.
- Works locally and in CI/headless environments.

## 📦 Installation

```bash
npm install -g terminal-shot
```

PNG export uses Playwright Chromium. Install the browser once:

```bash
npx playwright install chromium
```

## 🚀 Quick Start

Run the guided wizard:

```bash
terminal-shot
```

Render the built-in demo:

```bash
terminal-shot demo -o demo.png
```

Pipe command output:

```bash
npm test --color=always | terminal-shot --title "npm test" -o tests.png
git status --short | terminal-shot --theme dracula -o status.png
fastfetch | terminal-shot --theme glass -o system.png
```

Render a command directly:

```bash
terminal-shot run "git log --oneline -5" --title "Recent commits" -o commits.png
```

Render a file:

```bash
terminal-shot file output.txt --format svg -o output.svg
```

## 🎨 Themes

List available themes:

```bash
terminal-shot themes
```

Use a theme:

```bash
terminal-shot demo --theme tokyo-night -o tokyo-night.png
terminal-shot demo --theme github-light --format svg -o github-light.svg
```

## 🛠 Options

```bash
terminal-shot demo \
  --theme tokyo-night \
  --title "npm test" \
  --subtitle "~/repo" \
  --width 900 \
  --padding 32 \
  --radius 18 \
  --font-size 15 \
  --scale 2 \
  -o demo.png
```

| Flag | Description |
| --- | --- |
| `-o, --output <file>` | Output path |
| `--format png\|svg\|html` | Output format |
| `--theme <name>` | Built-in theme |
| `--title <text>` / `--subtitle <text>` | Window header text |
| `--no-header` | Hide the title/subtitle |
| `--window` / `--no-window` | Show or hide window chrome |
| `--shadow` / `--no-shadow` | Drop shadow |
| `--font <family>` / `--font-size <n>` / `--line-height <n>` | Typography |
| `--padding <n>` / `--radius <n>` | Spacing |
| `--width <n>` / `--max-height <n>` / `--scale <n>` | Sizing and DPR |
| `--background <css>` / `--transparent` | Background |
| `--prompt <text>` / `--cwd <text>` | Faux shell prompt |
| `--watermark <text>` | Small watermark |
| `--config <file>` | Custom config path |
| `--json` | Print render metadata as JSON |

## ⚙️ Config

Create a config file:

```bash
terminal-shot init
```

Example `terminal-shot.config.json`:

```json
{
  "theme": "tokyo-night",
  "fontSize": 15,
  "padding": 32,
  "radius": 18,
  "window": true,
  "shadow": true,
  "width": 900
}
```

Use a custom path:

```bash
terminal-shot demo --config ./shot.config.json -o demo.png
```

## 🔐 Privacy

- No telemetry.
- No cloud rendering.
- No uploads.
- No desktop screen recording.
- Command mode runs locally through your system shell.
- PNG output uses a local headless Chromium instance.

## 🧪 Development

```bash
git clone https://github.com/david-x3d/terminal-shot.git
cd terminal-shot
npm install
npm run build
npx playwright install chromium
node dist/index.js demo -o examples/demo.png
```

Smoke checks:

```bash
printf '\033[32mPASS\033[0m hello\n' | node dist/index.js --format html -o examples/stdin.html
node dist/index.js file examples/demo.txt --format svg -o examples/demo.svg
node dist/index.js demo -o examples/demo.png
```

## 📄 License

MIT
