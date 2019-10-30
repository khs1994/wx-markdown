"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
function toRichtext(towxmlChild) {
    // towxmlObj.child
    var nodes = [];
    var children;
    for (var _i = 0, towxmlChild_1 = towxmlChild; _i < towxmlChild_1.length; _i++) {
        var iterator = towxmlChild_1[_i];
        var name = iterator._e.tagName;
        var attrs = iterator.attr;
        var childrens = iterator.child;
        var type = void 0;
        var text = void 0;
        if (iterator.node === "text") {
            type = "text";
            text = iterator.text;
        }
        if (childrens) {
            children = toRichtext(childrens);
        }
        nodes = __spreadArrays(nodes, [{ name: name, attrs: attrs, children: children, type: type, text: text }]);
    }
    return nodes;
}
exports["default"] = toRichtext;
