import type { TerminalTheme } from "./types.js";

export const DEFAULT_THEME_NAME = "tokyo-night";

const trafficLights = {
  red: "#ff5f57",
  yellow: "#ffbd2e",
  green: "#28c840"
};

const standardAnsi = [
  "#15161e",
  "#f7768e",
  "#9ece6a",
  "#e0af68",
  "#7aa2f7",
  "#bb9af7",
  "#7dcfff",
  "#a9b1d6",
  "#414868",
  "#ff899d",
  "#9fe044",
  "#faba4a",
  "#8db0ff",
  "#c7a9ff",
  "#a4daff",
  "#c0caf5"
];

export const themes: Record<string, TerminalTheme> = {
  dark: {
    name: "dark",
    background: "#111318",
    terminalBackground: "#171a21",
    foreground: "#edf2f7",
    mutedForeground: "#8b93a7",
    border: "rgba(255, 255, 255, 0.10)",
    shadow: "0 24px 80px rgba(0, 0, 0, 0.42)",
    titlebar: "#20242d",
    trafficLights,
    ansi: [
      "#000000",
      "#ff6b6b",
      "#69db7c",
      "#ffd43b",
      "#74c0fc",
      "#da77f2",
      "#66d9e8",
      "#f8f9fa",
      "#495057",
      "#ff8787",
      "#8ce99a",
      "#ffe066",
      "#91a7ff",
      "#e599f7",
      "#99e9f2",
      "#ffffff"
    ]
  },
  catppuccin: {
    name: "catppuccin",
    background: "#11111b",
    terminalBackground: "#1e1e2e",
    foreground: "#cdd6f4",
    mutedForeground: "#9399b2",
    border: "rgba(205, 214, 244, 0.12)",
    shadow: "0 26px 90px rgba(17, 17, 27, 0.56)",
    titlebar: "#181825",
    trafficLights,
    ansi: [
      "#45475a",
      "#f38ba8",
      "#a6e3a1",
      "#f9e2af",
      "#89b4fa",
      "#cba6f7",
      "#94e2d5",
      "#bac2de",
      "#585b70",
      "#f38ba8",
      "#a6e3a1",
      "#f9e2af",
      "#89b4fa",
      "#cba6f7",
      "#94e2d5",
      "#a6adc8"
    ]
  },
  "tokyo-night": {
    name: "tokyo-night",
    background: "#0b1020",
    terminalBackground: "#16161e",
    foreground: "#c0caf5",
    mutedForeground: "#787c99",
    border: "rgba(122, 162, 247, 0.20)",
    shadow: "0 28px 90px rgba(2, 6, 23, 0.55)",
    titlebar: "#1f2335",
    trafficLights,
    ansi: standardAnsi
  },
  dracula: {
    name: "dracula",
    background: "#191a21",
    terminalBackground: "#282a36",
    foreground: "#f8f8f2",
    mutedForeground: "#a7abbe",
    border: "rgba(248, 248, 242, 0.12)",
    shadow: "0 28px 90px rgba(0, 0, 0, 0.48)",
    titlebar: "#21222c",
    trafficLights,
    ansi: [
      "#21222c",
      "#ff5555",
      "#50fa7b",
      "#f1fa8c",
      "#bd93f9",
      "#ff79c6",
      "#8be9fd",
      "#f8f8f2",
      "#6272a4",
      "#ff6e6e",
      "#69ff94",
      "#ffffa5",
      "#d6acff",
      "#ff92df",
      "#a4ffff",
      "#ffffff"
    ]
  },
  nord: {
    name: "nord",
    background: "#2e3440",
    terminalBackground: "#3b4252",
    foreground: "#eceff4",
    mutedForeground: "#aeb8c8",
    border: "rgba(216, 222, 233, 0.16)",
    shadow: "0 28px 90px rgba(15, 23, 42, 0.42)",
    titlebar: "#343b49",
    trafficLights,
    ansi: [
      "#3b4252",
      "#bf616a",
      "#a3be8c",
      "#ebcb8b",
      "#81a1c1",
      "#b48ead",
      "#88c0d0",
      "#e5e9f0",
      "#4c566a",
      "#bf616a",
      "#a3be8c",
      "#ebcb8b",
      "#81a1c1",
      "#b48ead",
      "#8fbcbb",
      "#eceff4"
    ]
  },
  "github-dark": {
    name: "github-dark",
    background: "#0d1117",
    terminalBackground: "#161b22",
    foreground: "#e6edf3",
    mutedForeground: "#8b949e",
    border: "#30363d",
    shadow: "0 24px 76px rgba(1, 4, 9, 0.45)",
    titlebar: "#21262d",
    trafficLights,
    ansi: [
      "#484f58",
      "#ff7b72",
      "#3fb950",
      "#d29922",
      "#58a6ff",
      "#bc8cff",
      "#39c5cf",
      "#b1bac4",
      "#6e7681",
      "#ffa198",
      "#56d364",
      "#e3b341",
      "#79c0ff",
      "#d2a8ff",
      "#56d4dd",
      "#f0f6fc"
    ]
  },
  "github-light": {
    name: "github-light",
    background: "#f6f8fa",
    terminalBackground: "#ffffff",
    foreground: "#24292f",
    mutedForeground: "#57606a",
    border: "#d0d7de",
    shadow: "0 24px 64px rgba(27, 31, 36, 0.16)",
    titlebar: "#f6f8fa",
    trafficLights,
    ansi: [
      "#24292f",
      "#cf222e",
      "#116329",
      "#4d2d00",
      "#0969da",
      "#8250df",
      "#1b7c83",
      "#57606a",
      "#6e7781",
      "#a40e26",
      "#1a7f37",
      "#633c01",
      "#218bff",
      "#a475f9",
      "#3192aa",
      "#8c959f"
    ]
  },
  glass: {
    name: "glass",
    background: "linear-gradient(135deg, #0f172a 0%, #172554 45%, #065f46 100%)",
    terminalBackground: "rgba(15, 23, 42, 0.72)",
    foreground: "#f8fafc",
    mutedForeground: "#cbd5e1",
    border: "rgba(255, 255, 255, 0.22)",
    shadow: "0 32px 100px rgba(0, 0, 0, 0.38)",
    titlebar: "rgba(255, 255, 255, 0.08)",
    trafficLights,
    ansi: [
      "#0f172a",
      "#fb7185",
      "#4ade80",
      "#facc15",
      "#60a5fa",
      "#c084fc",
      "#22d3ee",
      "#f8fafc",
      "#64748b",
      "#fda4af",
      "#86efac",
      "#fde047",
      "#93c5fd",
      "#d8b4fe",
      "#67e8f9",
      "#ffffff"
    ]
  },
  mono: {
    name: "mono",
    background: "#f4f1ea",
    terminalBackground: "#111111",
    foreground: "#f5f5f5",
    mutedForeground: "#a3a3a3",
    border: "rgba(0, 0, 0, 0.22)",
    shadow: "0 22px 70px rgba(0, 0, 0, 0.26)",
    titlebar: "#1c1c1c",
    trafficLights,
    ansi: [
      "#111111",
      "#e5e5e5",
      "#d4d4d4",
      "#c4c4c4",
      "#b4b4b4",
      "#a3a3a3",
      "#949494",
      "#f5f5f5",
      "#737373",
      "#ededed",
      "#e5e5e5",
      "#d4d4d4",
      "#c4c4c4",
      "#b4b4b4",
      "#a3a3a3",
      "#ffffff"
    ]
  },
  matrix: {
    name: "matrix",
    background: "#020403",
    terminalBackground: "#03130a",
    foreground: "#d2ffd2",
    mutedForeground: "#4ade80",
    border: "rgba(74, 222, 128, 0.22)",
    shadow: "0 26px 90px rgba(20, 184, 80, 0.16)",
    titlebar: "#04180d",
    trafficLights,
    ansi: [
      "#001f0f",
      "#38f27d",
      "#00ff7f",
      "#7cff9f",
      "#24d477",
      "#68ff9a",
      "#32f0a0",
      "#c8ffd6",
      "#096b35",
      "#5cff92",
      "#3dff88",
      "#adffbd",
      "#65ffa2",
      "#93ffb0",
      "#78ffd7",
      "#ffffff"
    ]
  }
};

export function getTheme(name: string): TerminalTheme {
  const theme = themes[name];

  if (!theme) {
    const available = Object.keys(themes).join(", ");
    throw new Error(`Unknown theme "${name}". Available themes: ${available}`);
  }

  return theme;
}

export function listThemeNames(): string[] {
  return Object.keys(themes).sort();
}
