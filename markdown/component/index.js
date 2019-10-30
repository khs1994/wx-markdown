"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var MarkdownHandler = require("@pcit/towxml");
var openGitHub_1 = require("../utils/openGitHub");
var towxml = new MarkdownHandler();
var toRichtext_1 = require("./toRichtext");
function randomInsert(insertArr, arr) {
    // console.log(arr.length);
    if (arr.length > 30) {
        insertArr = __spreadArrays(insertArr);
    }
    else {
        insertArr = [insertArr[0]];
    }
    try {
        insertArr.forEach(function (value) {
            return arr.splice(Math.random() * arr.length, 0, value);
        });
    }
    catch (e) { }
    return arr;
}
function parsePath(href) {
    var arr = href.split("/");
    while (true) {
        var index = arr.indexOf("..");
        if (index === -1) {
            break;
        }
        arr[index] = null;
        arr[index - 1] = null;
        // remove null
        arr = arr.filter(function (d) { return d; });
    }
    return arr.join("/");
}
Component({
    properties: {
        // markdown 原始数据
        // 或者 towxml 处理过的数据(is-towxml="{{true}}")
        // 或者缓存 key (pass-md-by-cache="{{true}}")
        markdown: {
            type: String,
            value: "",
            optionalTypes: [String, Object]
        },
        theme: {
            type: String,
            value: "light" // 'light' | 'dark'
        },
        ad: {
            type: Array,
            value: [] // ["",""]
        },
        fontType: {
            type: String,
            value: ""
        },
        folder: {
            type: String,
            value: ""
        },
        isTowxml: {
            // 属性 markdown 是否为 towxml 处理过的数据
            type: Boolean,
            value: false
        },
        navigator: {
            // 是否触发点击事件，若为目录(summary)请设为 false
            type: Boolean,
            value: true
        },
        key: {
            // markdown key, 启用缓存时需要
            type: String,
            value: ""
        },
        cache: {
            // 是否启用缓存
            type: Boolean,
            value: true
        },
        passMdByCache: {
            // markdown 传入的是 MD 数据缓存 key,
            // 即 markdown 可以传入 md 原始数据，
            // 也可以传入缓存 key(这个 缓存 key 存储的是 md 原始数据)
            type: Boolean,
            value: false
        },
        richtext: {
            // 使用 rich-text 渲染，若为目录(summary)请设为 false，因为不支持跳转
            // 不支持页面跳转
            // 不支持长按图片
            // 不支持事件监听
            // https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html
            type: Boolean,
            value: false
        }
    },
    data: {
        MDdata: ""
    },
    lifetimes: {
        attached: function () { }
    },
    observers: {
        markdown: function () {
            var _a = this.properties, markdown = _a.markdown, theme = _a.theme, ad = _a.ad, fontType = _a.fontType, isTowxml = _a.isTowxml, key = _a.key, cache = _a.cache, passMdByCache = _a.passMdByCache, richtext = _a.richtext;
            if (passMdByCache) {
                markdown = wx.getStorageSync(markdown);
                console.log("get markdown from cache");
            }
            if (markdown === "") {
                this.setData({
                    MDdata: ""
                });
                return;
            }
            if (isTowxml) {
                if (richtext) {
                    markdown.child = toRichtext_1["default"](markdown.child);
                    markdown.richtext = true;
                    markdown.adId = ad[0];
                }
                this.setData({
                    MDdata: markdown
                });
                return;
            }
            var MDdata;
            var MDdataFromCache = wx.getStorageSync("wx-markdown/" + key);
            if (key !== "" && MDdataFromCache && cache) {
                MDdata = JSON.parse(MDdataFromCache);
                console.log("wx-markdown cached");
            }
            else {
                MDdata = towxml.toJson(markdown, "markdown");
                wx.setStorage({
                    key: "wx-markdown/" + key,
                    data: JSON.stringify(MDdata)
                });
            }
            if (richtext) {
                // 富文本不能包括 ad
                MDdata.child = toRichtext_1["default"](MDdata.child);
                MDdata.richtext = true;
                MDdata.adId = ad[0];
            }
            else {
                if (ad !== []) {
                    MDdata.child = randomInsert(ad.map(function (adId) {
                        return { node: "ad", adId: adId };
                    }), MDdata.child);
                }
            }
            MDdata.theme = theme;
            MDdata.fontType = fontType;
            this.setData({
                MDdata: MDdata
            });
        }
    },
    // @ts-ignore
    methods: {
        // towxml 事件
        __bind_touchend: function () {
            // console.log('触摸结束' + res);
            // let endX= res.changedTouches[0].pageX;
            // let endY = res.changedTouches[0].pageY;
            //
            // let diff_y = endY - <any>this.data.startY;
            // let diff_x = endX - <any>this.data.startX;
            //
            // console.log(diff_x,diff_y);
            //
            // if(Math.abs(diff_y) > 10 ){
            //   return;
            // }
            //
            // diff_x > 40 && this.before();
            // diff_x < -40 && this.next();
        },
        __bind_touchstart: function () {
            // console.log('触摸开始' + res);
            // let startX=res.touches[0].pageX;
            // let startY = res.changedTouches[0].pageY;
            //
            // this.setData!({
            //   startX,
            //   startY,
            // });
        },
        __bind_touchmove: function () {
            // console.log('触摸中' + res);
        },
        // @ts-ignore
        __bind_tap: function (res) {
            console.log(res);
            var href = res.currentTarget.dataset._el.attr.href || "";
            if (href !== "") {
                console.log(href);
            }
            var _a = this.properties, folder = _a.folder, navigator = _a.navigator;
            if (href.match(/^https:\/\/github.com/)) {
                var array = href.split("/");
                var user = array[3] || null;
                var repo = array[4] || null;
                openGitHub_1["default"](user, repo);
            }
            if (href.match(/^http:\/\//g) ||
                href.match(/^https:\/\//g) ||
                href === "" ||
                !href.match(/.md$/g) ||
                !navigator) {
                return;
            }
            href = folder === "/" ? href : folder + href;
            if (href.match(/../g)) {
                console.log(href);
                href = parsePath(href);
            }
            wx.navigateTo({
                url: "index?key=" + href
            });
            return null;
        },
        __bind_touchcancel: function () { },
        adError: function (e) {
            console.log(e);
        }
    }
});
