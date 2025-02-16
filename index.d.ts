/// <reference types="cheerio" />

declare module "html-table-to-json" {
  class HtmlTableToJson {
    readonly headers: Array<any>;
    readonly results: Array<any>;
    readonly count: number;

    constructor(html: string, opts?: Object);

    static factory(html: string, opts?: Object): HtmlTableToJson;

    private _process(): Array<any>;

    private _processTable(tableIndex: number, table: CheerioElement): void;

    private _processRow(
      tableIndex: number,
      index: number,
      row: CheerioElement
    ): void;

    private _buildHeaders(index: number, table: CheerioElement): void;

    private _pruneEmptyRows(tableIndex: number): void;
  }

  export = HtmlTableToJson;
}
