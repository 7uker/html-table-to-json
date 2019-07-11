# html-table-to-json [![Build Status](https://travis-ci.org/brandon93s/html-table-to-json.svg?branch=master)](https://travis-ci.org/brandon93s/html-table-to-json)

**Fork note - cells are returned as an object instead of string, containing value and html attributes**

> Extracts tables from a provided html snippet and converts them to JSON objects

*Note: Currently always returns an array of results regardless of table count*

## Install

```
$ npm install --save 7uker/html-table-to-json
```


## Usage

```js
const HtmlTableToJson = require('html-table-to-json');

const jsonTables = new HtmlTableToJson(`
<table>
    <tr>
        <th colspan ="4">Animal</th>
        <th>Color</th>
        <th>Name</th>
    </tr>
    <tr>
        <td colspan="4">Unicorn</td>
        <td>Pink</td>
        <td>Billy</td>
    </tr>
    <tr>
        <td>Walrus</td>
        <td>Orange</td>
        <td>Sue</td>
    </tr>
</table>
    `);

console.log(jsonTables.results[0][0]);
/* 

{ Animal:
   { val: 'Unicorn',
     attr: { colspan: '4' },
     thAttr: { colspan: '4' } },
  Color: { val: 'Pink' },
  Name: { val: 'Billy' } }

 */

console.log(jsonTables.count);
// => 1

```


## API

### new HtmlTableToJson(input [,options])
### HtmlTableToJson.factory(input [,options])

#### input

Type: `string`

Any html snippet.

#### options

##### // todo


## License

MIT © [Brandon Smith](https://github.com/brandon93s)
