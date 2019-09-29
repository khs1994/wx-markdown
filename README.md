# WX-markdown

```bash
$ npm i docker-practice/wx-markdown --save
```

`微信开发者工具` -> `构建 npm`

`page.json`

```json
{
  "usingComponents": {
    "markdown": "wx-markdown/component/index"
  }
}
```

`page.wxml`

```html
<markdown markdown="# Title"></markdown>
```

更多属性请查看 `markdown/component/index.ts`
