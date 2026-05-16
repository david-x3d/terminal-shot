export type OutputFormat = "png" | "svg" | "html";

export type TrafficLightColors = {
  red: string;
  yellow: string;
  green: string;
};

export type TerminalTheme = {
  name: string;
  background: string;
  terminalBackground: string;
  foreground: string;
  mutedForeground: string;
  border: string;
  shadow: string;
  titlebar: string;
  trafficLights: TrafficLightColors;
  ansi: string[];
};

export type RenderOptions = {
  output: string;
  format: OutputFormat;
  themeName: string;
  theme: TerminalTheme;
  title?: string;
  subtitle?: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  padding: number;
  radius: number;
  shadow: boolean;
  window: boolean;
  header: boolean;
  prompt?: string;
  cwd?: string;
  width: number;
  maxHeight?: number;
  scale: number;
  background?: string;
  transparent: boolean;
  watermark?: string;
  json: boolean;
};

export type RawCliOptions = {
  output?: string;
  format?: string;
  theme?: string;
  title?: string;
  subtitle?: string;
  font?: string;
  fontSize?: number;
  lineHeight?: number;
  padding?: number;
  radius?: number;
  shadow?: boolean;
  window?: boolean;
  prompt?: string;
  cwd?: string;
  width?: number;
  maxHeight?: number;
  scale?: number;
  background?: string;
  transparent?: boolean;
  config?: string;
  header?: boolean;
  watermark?: string;
  json?: boolean;
  copy?: boolean;
  highlight?: string;
  crop?: boolean;
  trim?: boolean;
};

export type RenderResult = {
  output: string;
  format: OutputFormat;
  theme: string;
  width?: number;
  height?: number;
  bytes?: number;
  exitCode?: number;
};
