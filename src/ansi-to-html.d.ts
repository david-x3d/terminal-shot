declare module "ansi-to-html" {
  type AnsiToHtmlOptions = {
    fg?: string;
    bg?: string;
    newline?: boolean;
    escapeXML?: boolean;
    colors?: Record<number, string> | string[];
  };

  export default class Convert {
    constructor(options?: AnsiToHtmlOptions);
    toHtml(input: string): string;
  }
}
