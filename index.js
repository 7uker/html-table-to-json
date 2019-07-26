'use strict'

const cheerio = require('cheerio')

class HtmlTableToJson {
  constructor(html, opts) {
    if (typeof html !== 'string') { throw new TypeError('html input must be a string') }

    this.html = html
    this.opts = opts

    this._$ = cheerio.load(this.html)
    this._results = []
    this._headers = []
    this._count = null

    this._process()
  }

  static factory(html, opts) {
    return new HtmlTableToJson(html, opts)
  }

  get count() {
    return Number.isInteger(this._count) ? this._count : (this._count = this._$('table').get().length)
  }

  get results() {
    return this._results
  }

  get headers() {
    return this._headers
  }

  _process() {
    if (this._results.length) { return this._results }

    this._$('table').each((i, element) => this._processTable(i, element))

    return this._results
  }

  _processTable(tableIndex, table) {
    this._results[tableIndex] = []
    this._buildHeaders(tableIndex, table)

    this._$(table).find('tr').each((i, element) => this._processRow(tableIndex, i, element))
    this._pruneEmptyRows(tableIndex)
  }

  _processRow(tableIndex, index, row) {
    this._results[tableIndex][index] = {}

    this._$(row).find('td').each((i, cell) => {

      let attrRaw = this._$(cell).attr();
      let attr = {};
      let children = {};

      this._$(cell).find('*').each((j, tag) => {
        children[tag.name] = {};
        if (tag.type == 'tag') {
          for (let step in tag.attribs) {
            children[tag.name][step] = tag.attribs[step];
          }
        }
      })

      if (Object.keys(attrRaw).length) {
        for (let step in attrRaw) {
            attr[step] = attrRaw[step];
        }
      }
      let name = this._headers[tableIndex][i] ? this._headers[tableIndex][i].val : i + 1;
      this._results[tableIndex][index][name] = {};
      this._results[tableIndex][index][name].val = this._$(cell).text().trim();

      if (Object.keys(attr).length)
        this._results[tableIndex][index][name].attr = attr;

      if (Object.keys(children).length)
        this._results[tableIndex][index][name].children = children;

      if (isNaN(name) && this._headers[tableIndex][i].attr)
        this._results[tableIndex][index][name].thAttr = this._headers[tableIndex][i].attr

    })
  }

  _buildHeaders(index, table) {
    this._headers[index] = []

    this._$(table).find('tr').each((i, row) => {
      this._$(row).find('th').each((j, cell) => {

        let attrRaw = this._$(cell).attr();
        let attr = {};
        if (Object.keys(attrRaw).length) {
          for (let step in attrRaw) {
              attr[step] = attrRaw[step];
          }
        }

        this._headers[index][j] = {};
        this._headers[index][j].val = this._$(cell).text().trim();

        if (Object.keys(attr).length)
          this._headers[index][j].attr = attr;
      })
    })
  }

  _pruneEmptyRows(tableIndex) {
    this._results[tableIndex] = this._results[tableIndex].filter(t => Object.keys(t).length)
  }
}

module.exports = HtmlTableToJson