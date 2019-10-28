# WX-markdown

```bash
$ npm i wx-markdown --save
```

`微信开发者工具` -> `(左上角)工具` -> [`构建 npm`](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

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

更多属性请查看 [`markdown/component/index.ts`](markdown/component/index.ts)

## 功能

* 支持页面逻辑解析，并跳转 `../build.md`
* 支持跳转 GitHub 页面到 [Gitter（小程序）](https://github.com/huangjianke/Gitter) [wx2252b6835e7eb568](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#navigateToMiniProgramAppIdList)
