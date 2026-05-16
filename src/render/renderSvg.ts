import { renderTerminalMarkup } from "./renderHtml.js";
import type { RenderOptions } from "../types.js";

export function renderSvg(input: string, options: RenderOptions): string {
  const { markup, styles, estimatedHeight } = renderTerminalMarkup(
    input,
    options
  );
  const width = Math.round(options.width);
  const height = Math.round(estimatedHeight);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>${styles}</style>
      ${markup}
    </div>
  </foreignObject>
</svg>
`;
}
