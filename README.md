# terminal-shot 📸

> Beautiful terminal screenshots from text, commands and ANSI output.

[![npm](https://img.shields.io/npm/v/terminal-shot?color=cb3837)](https://www.npmjs.com/package/terminal-shot)
[![CI](https://github.com/david-x3d/terminal-shot/actions/workflows/ci.yml/badge.svg)](https://github.com/david-x3d/terminal-shot/actions/workflows/ci.yml)
[![GitHub](https://img.shields.io/badge/GitHub-david--x3d%2Fterminal--shot-181717?logo=github)](https://github.com/david-x3d/terminal-shot)
![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

`terminal-shot` turns terminal output into polished PNG, SVG or HTML images for READMEs, docs, changelogs, Discord posts and social previews. It is local-first: no uploads, no telemetry and no desktop screen recording.

![terminal-shot demo](./examples/demo.png)

## ⚡ Features

- Render pasted text, piped ANSI output, files, commands or a built-in demo.
- Export `png`, `svg` and `html`.
- Preserve ANSI colors and terminal formatting.
- Built-in themes: `dark`, `catppuccin`, `tokyo-night`, `dracula`, `nord`, `github-dark`, `github-light`, `glass`, `mono` and `matrix`.
- Window chrome, title, subtitle, prompt, cwd label, watermark, sizing, padding, radius, transparency and typography controls.
- Line highlighting, max-height cropping and transparent-trim support.
- Interactive wizard when you run `terminal-shot` with no arguments.
- CI-friendly rendering for headless Linux, Windows and macOS workflows.

## 📦 Installation

```bash
npm install -g terminal-shot
```

PNG export uses Playwright Chromium. Install the browser once on machines that render PNGs:

```bash
npx playwright install chromium
```

Use without installing globally:

```bash
npx terminal-shot demo -o demo.png
```

## 🚀 Usage

Open the guided wizard:

```bash
terminal-shot
```

Render the built-in demo:

```bash
terminal-shot demo -o demo.png
terminal-shot demo --format svg -o demo.svg
terminal-shot demo --format html -o demo.html
```

Pipe command output:

```bash
npm test --color=always | terminal-shot --title "npm test" -o tests.png
git status --short | terminal-shot --theme dracula -o status.svg
fastfetch | terminal-shot --theme glass --transparent -o system.png
```

Run a command directly:

```bash
terminal-shot run "git log --oneline -5" --title "Recent commits" -o commits.png
terminal-shot run "npm audit --audit-level moderate" --fail-fast -o audit.png
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
terminal-shot demo --theme matrix --width 860 --watermark "terminal-shot" -o matrix.png
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
  --highlight 2-4 \
  -o demo.png
```

| Flag | Description |
| --- | --- |
| `-o, --output <file>` | Output path |
| `--format png\|svg\|html` | Output format |
| `--theme <name>` | Built-in theme |
| `--title <text>` / `--subtitle <text>` | Window header text |
| `--no-header` | Hide title and subtitle text |
| `--window` / `--no-window` | Show or hide terminal chrome |
| `--shadow` / `--no-shadow` | Enable or disable drop shadow |
| `--font <family>` / `--font-size <n>` / `--line-height <n>` | Typography |
| `--padding <n>` / `--radius <n>` | Spacing and corner radius |
| `--width <n>` / `--max-height <n>` / `--scale <n>` | Sizing and PNG device scale factor |
| `--background <css>` / `--transparent` | Background color, gradient or transparent output |
| `--prompt <text>` / `--cwd <text>` | Faux shell prompt and directory label |
| `--watermark <text>` | Small watermark text |
| `--highlight <ranges>` | Highlight line ranges such as `1,3-5` |
| `--crop` | Crop output to max height |
| `--trim` | Trim transparent pixels after rendering |
| `--copy` | Copy output to clipboard after rendering |
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

## 🧪 CI Examples

Generate documentation images in a workflow:

```bash
npm ci
npx playwright install chromium
npx terminal-shot run "npm test -- --runInBand" --title "Tests" -o docs/tests.png
npx terminal-shot file CHANGELOG.md --format svg --theme github-light -o docs/changelog.svg
```

Use SVG or HTML when you do not want a browser dependency:

```bash
terminal-shot demo --format svg -o terminal-shot-ci.svg
terminal-shot demo --format html -o terminal-shot-ci.html
```

## 🔐 Privacy

- No telemetry.
- No cloud rendering.
- No uploads.
- No desktop capture or screen recording.
- Command mode runs locally through your system shell.
- PNG output uses a local headless Chromium instance.

## Platform Support

| Feature | Linux | Windows | macOS |
| --- | --- | --- | --- |
| Wizard | ✅ | ✅ | ✅ |
| Stdin rendering | ✅ | ✅ | ✅ |
| File rendering | ✅ | ✅ | ✅ |
| Command rendering | ✅ | ✅ | ✅ |
| SVG export | ✅ | ✅ | ✅ |
| HTML export | ✅ | ✅ | ✅ |
| PNG export | ✅ with Chromium | ✅ with Chromium | ✅ with Chromium |

## 🧪 Development

```bash
git clone https://github.com/david-x3d/terminal-shot.git
cd terminal-shot
pnpm install
pnpm run typecheck
pnpm test
pnpm run build
```

Generate example assets:

```bash
npx playwright install chromium
node dist/index.js demo -o examples/demo.png
node dist/index.js demo --format svg -o examples/demo.svg
node dist/index.js demo --format html -o examples/demo.html
```

## 🗺 Roadmap

- More README-ready presets for common package managers and test runners.
- Theme export/import helpers.
- Optional screenshot comparison tests for renderer changes.
- More terminal frame styles.

## Contributing

Issues and pull requests are welcome. Keep changes focused, add smoke coverage for renderer behavior, and avoid committing generated screenshots unless they are intentional documentation examples.

## 📄 License

MIT
