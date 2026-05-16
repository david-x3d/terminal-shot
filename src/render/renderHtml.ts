import Convert from "ansi-to-html";
import type { RenderOptions, TerminalTheme } from "../types.js";

type TerminalMarkup = {
  markup: string;
  styles: string;
  estimatedHeight: number;
};

export function renderHtml(input: string, options: RenderOptions): string {
  const { markup, styles } = renderTerminalMarkup(input, options);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(options.title ?? "terminal-shot")}</title>
  <style>${styles}</style>
</head>
<body>
${markup}
</body>
</html>
`;
}

export function renderTerminalMarkup(
  input: string,
  options: RenderOptions
): TerminalMarkup {
  const text = composeTerminalText(input, options);
  const convert = new Convert({
    fg: options.theme.foreground,
    bg: options.theme.terminalBackground,
    newline: true,
    escapeXML: true,
    colors: createAnsiColorMap(options.theme)
  });
  const content = convert.toHtml(text || " ");
  const title = escapeHtml(options.title ?? "terminal-shot");
  const subtitle = escapeHtml(options.subtitle ?? options.cwd ?? "");
  const watermark = options.watermark
    ? `<div class="terminal-watermark">${escapeHtml(options.watermark)}</div>`
    : "";
  const titlebar = options.window
    ? `<div class="terminal-titlebar">
  <div class="traffic-lights" aria-hidden="true">
    <span class="traffic-light red"></span>
    <span class="traffic-light yellow"></span>
    <span class="traffic-light green"></span>
  </div>
  ${
    options.header
      ? `<div class="terminal-heading">
    <div class="terminal-title">${title}</div>
    ${subtitle ? `<div class="terminal-subtitle">${subtitle}</div>` : ""}
  </div>`
      : `<div class="terminal-heading" aria-hidden="true"></div>`
  }
</div>`
    : "";
  const markup = `<main id="terminal-shot" class="terminal-shot">
  <section class="${options.window ? "terminal-window" : "terminal-plain"}">
    ${titlebar}
    <pre class="terminal-content"><code>${content}</code></pre>
  </section>
  ${watermark}
</main>`;

  return {
    markup,
    styles: renderStyles(options),
    estimatedHeight: estimateHeight(text, options)
  };
}

function renderStyles(options: RenderOptions): string {
  const theme = options.theme;
  const pageBackground = options.transparent
    ? "transparent"
    : options.background ?? theme.background;
  const contentPadding = Math.max(12, Math.round(options.padding * 0.68));
  const contentMaxHeight = options.maxHeight
    ? `max-height: ${Math.round(options.maxHeight)}px; overflow: hidden;`
    : "";
  const frameShadow = options.shadow ? theme.shadow : "none";
  const outerPadding = `${Math.round(options.padding)}px`;

  return `
:root {
  color-scheme: ${theme.name === "github-light" ? "light" : "dark"};
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-width: ${Math.round(options.width)}px;
  background: ${pageBackground};
}

body {
  display: inline-block;
  font-family: ${options.fontFamily};
}

.terminal-shot {
  width: ${Math.round(options.width)}px;
  padding: ${outerPadding};
  background: ${pageBackground};
  color: ${theme.foreground};
}

.terminal-window,
.terminal-plain {
  width: 100%;
  overflow: hidden;
  color: ${theme.foreground};
  background: ${theme.terminalBackground};
  border: 1px solid ${theme.border};
  border-radius: ${Math.round(options.radius)}px;
  box-shadow: ${frameShadow};
}

.terminal-window {
  backdrop-filter: blur(22px) saturate(145%);
}

.terminal-plain {
  padding: 0;
}

.terminal-titlebar {
  min-height: 46px;
  display: grid;
  grid-template-columns: 72px 1fr 72px;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  background: ${theme.titlebar};
  border-bottom: 1px solid ${theme.border};
}

.traffic-lights {
  display: flex;
  align-items: center;
  gap: 8px;
}

.traffic-light {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.24);
}

.traffic-light.red {
  background: ${theme.trafficLights.red};
}

.traffic-light.yellow {
  background: ${theme.trafficLights.yellow};
}

.traffic-light.green {
  background: ${theme.trafficLights.green};
}

.terminal-heading {
  min-width: 0;
  text-align: center;
}

.terminal-title,
.terminal-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.terminal-title {
  color: ${theme.foreground};
  font-size: 13px;
  font-weight: 650;
  line-height: 1.25;
}

.terminal-subtitle {
  margin-top: 2px;
  color: ${theme.mutedForeground};
  font-size: 11px;
  line-height: 1.2;
}

.terminal-content {
  margin: 0;
  padding: ${contentPadding}px;
  ${contentMaxHeight}
  color: ${theme.foreground};
  font-family: ${options.fontFamily};
  font-size: ${options.fontSize}px;
  line-height: ${options.lineHeight};
  font-variant-ligatures: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  tab-size: 2;
}

.terminal-content code {
  font: inherit;
}

.terminal-watermark {
  margin-top: 12px;
  color: ${theme.mutedForeground};
  font-family: ${options.fontFamily};
  font-size: 12px;
  line-height: 1;
  text-align: right;
  opacity: 0.78;
}
`;
}

function composeTerminalText(input: string, options: RenderOptions): string {
  const prefix = [options.prompt, options.cwd].filter(Boolean).join(" ");

  if (!prefix) {
    return input;
  }

  return `${prefix}\n${input}`;
}

function createAnsiColorMap(theme: TerminalTheme): Record<number, string> {
  return theme.ansi.reduce<Record<number, string>>((colors, color, index) => {
    colors[index] = color;
    return colors;
  }, {});
}

function estimateHeight(input: string, options: RenderOptions): number {
  const contentPadding = Math.max(12, Math.round(options.padding * 0.68));
  const contentWidth =
    options.width - options.padding * 2 - contentPadding * 2 - 2;
  const averageCharWidth = Math.max(7, options.fontSize * 0.62);
  const charsPerLine = Math.max(20, Math.floor(contentWidth / averageCharWidth));
  const visualLines = stripAnsi(input)
    .split(/\r?\n/)
    .reduce((count, line) => {
      return count + Math.max(1, Math.ceil(line.length / charsPerLine));
    }, 0);
  const titlebar = options.window ? 46 : 0;
  const contentHeight = Math.ceil(
    visualLines * options.fontSize * options.lineHeight + contentPadding * 2
  );
  const clippedContentHeight = options.maxHeight
    ? Math.min(contentHeight, options.maxHeight + contentPadding * 2)
    : contentHeight;
  const watermark = options.watermark ? 24 : 0;

  return Math.ceil(
    options.padding * 2 + titlebar + clippedContentHeight + watermark + 2
  );
}

function stripAnsi(value: string): string {
  return value.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001B\u009B][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[a-zA-Z\d]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g,
    ""
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
