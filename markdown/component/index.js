"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// @ts-ignore
var MarkdownHandler = require("towxml");
var towxml = new MarkdownHandler();
function randomInsert(insertArr, arr) {
    // console.log(arr.length);
    if (arr.length > 30) {
        insertArr = __spreadArrays(insertArr, [{ node: 'ad', adId: 'adunit-1246f0a5e441ea4c' }]);
    }
    insertArr.forEach(function (value) {
        return arr.splice(Math.random() * arr.length, 0, value);
    });
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
        // markdown 原始数据
        markdown: {
            type: String,
            value: ''
        },
        theme: {
            type: String,
            value: 'light'
        },
        ad: {
            type: String,
            value: ''
        },
        fontType: {
            type: String,
            value: ''
        },
        folder: {
            type: String,
            value: ''
        }
    },
    data: {
        MDdata: ''
    },
    lifetimes: {
        attached: function () { }
    },
    observers: {
        markdown: function () {
            // @ts-ignore
            if (this.properties.markdown === '') {
                return;
            }
            // @ts-ignore
            var MDdata = towxml.toJson(this.properties.markdown, 'markdown');
            // @ts-ignore
            MDdata.theme = this.properties.theme;
            MDdata.child = randomInsert([{ node: 'ad', adId: 'adunit-3ea71b7cfce6c721' }], MDdata.child);
            // @ts-ignore
            MDdata.fontType = this.properties.fontType;
            // @ts-ignore
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
            if (href.match(/^http:\/\//g) ||
                href.match(/^https:\/\//g) ||
                href === '' ||
                !href.match(/.md$/g)) {
                return;
            }
            // @ts-ignore
            var folder = this.properties.folder;
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
        __bind_touchcancel: function () { }
    }
});
