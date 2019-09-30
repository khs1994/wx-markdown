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
    catch (e) {
    }
    return arr;
}
function parsePath(href) {
    var arr = href.split('/');
    while (true) {
        var index = arr.indexOf('..');
        if (index === -1) {
            break;
        }
        arr[index] = null;
        arr[index - 1] = null;
        // remove null
        arr = arr.filter(function (d) { return d; });
    }
    return arr.join('/');
}
Component({
    properties: {
        // markdown 原始数据或者 towxml 处理过的数据（isTowxml="{{true}}"）
        markdown: {
            type: String,
            value: '',
            optionalTypes: [String, Object]
        },
        theme: {
            type: String,
            value: 'light'
        },
        ad: {
            type: Array,
            value: []
        },
        fontType: {
            type: String,
            value: ''
        },
        folder: {
            type: String,
            value: ''
        },
        isTowxml: {
            type: Boolean,
            value: false
        },
        navigator: {
            type: Boolean,
            value: true
        }
    },
    data: {
        MDdata: ''
    },
    lifetimes: {
        attached: function () {
        }
    },
    observers: {
        markdown: function () {
            var _a = this.properties, markdown = _a.markdown, theme = _a.theme, ad = _a.ad, fontType = _a.fontType, isTowxml = _a.isTowxml;
            if (markdown === '') {
                this.setData({
                    MDdata: ''
                });
                return;
            }
            if (isTowxml) {
                this.setData({
                    MDdata: markdown
                });
                return;
            }
            var MDdata = towxml.toJson(markdown, 'markdown');
            if (ad !== []) {
                MDdata.child = randomInsert(ad.map(function (adId) {
                    return { node: 'ad', adId: adId };
                }), MDdata.child);
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
            var href = res.currentTarget.dataset._el.attr.href || '';
            if (href !== '') {
                console.log(href);
            }
            var _a = this.properties, folder = _a.folder, navigator = _a.navigator;
            if (href.match(/^https:\/\/github.com/)) {
                var array = href.split('/');
                var user = array[3] || null;
                var repo = array[4] || null;
                openGitHub_1["default"](user, repo);
            }
            if (href.match(/^http:\/\//g) ||
                href.match(/^https:\/\//g) ||
                href === '' ||
                !href.match(/.md$/g) || !navigator) {
                return;
            }
            href = folder === '/' ? href : folder + href;
            if (href.match(/../g)) {
                console.log(href);
                href = parsePath(href);
            }
            wx.navigateTo({
                url: 'index?key=' + href
            });
            return null;
        },
        __bind_touchcancel: function () {
        }
    }
});
