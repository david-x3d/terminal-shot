import { stat } from "node:fs/promises";
import { chromium } from "playwright";
import { renderHtml, renderTerminalMarkup } from "./renderHtml.js";
import type { RenderOptions, RenderResult } from "../types.js";

export async function renderPng(
  input: string,
  options: RenderOptions
): Promise<RenderResult> {
  const { estimatedHeight } = renderTerminalMarkup(input, options);
  const html = renderHtml(input, options);
  const viewportHeight = Math.max(240, estimatedHeight + 80);
  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: {
        width: Math.ceil(options.width),
        height: Math.ceil(viewportHeight)
      },
      deviceScaleFactor: options.scale
    });
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const shot = page.locator("#terminal-shot");
    const box = await shot.boundingBox();
    await shot.screenshot({
      path: options.output,
      omitBackground: options.transparent,
      animations: "disabled"
    });
    await context.close();
    const file = await stat(options.output);

    return {
      output: options.output,
      format: "png",
      theme: options.themeName,
      width: box ? Math.round(box.width * options.scale) : undefined,
      height: box ? Math.round(box.height * options.scale) : undefined,
      bytes: file.size
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not render PNG with Playwright. Run "pnpm exec playwright install chromium" if the browser is not installed.\n${message}`
    );
  } finally {
    await browser?.close();
  }
}
