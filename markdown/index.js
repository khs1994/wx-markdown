"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownHandler = require("towxml");
var towxml = new MarkdownHandler();
function randomInsert(insertArr, arr) {
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
        arr = arr.filter(function (d) { return d; });
    }
    return arr.join('/');
}
Component({
    properties: {
        markdown: {
            type: String,
            value: '',
        },
        theme: {
            type: String,
            value: 'light',
        },
        ad: {
            type: String,
            value: '',
        },
        fontType: {
            type: String,
            value: '',
        },
        folder: {
            type: String,
            value: '',
        },
    },
    data: {
        MDdata: '',
    },
    lifetimes: {
        attached: function () { },
    },
    observers: {
        markdown: function () {
            if (this.properties.markdown === '') {
                return;
            }
            var MDdata = towxml.toJson(this.properties.markdown, 'markdown');
            MDdata.theme = this.properties.theme;
            MDdata.child = randomInsert([{ node: 'ad', adId: 'adunit-3ea71b7cfce6c721' }], MDdata.child);
            MDdata.fontType = this.properties.fontType;
            this.setData({
                MDdata: MDdata,
            });
        },
    },
    methods: {
        __bind_touchend: function () {
        },
        __bind_touchstart: function () {
        },
        __bind_touchmove: function () {
        },
        __bind_tap: function (res) {
            console.log(res);
            var href = res.currentTarget.dataset._el.attr.href || '';
            if (href.match(/^http:\/\//g) ||
                href.match(/^https:\/\//g) ||
                href === '' ||
                !href.match(/.md$/g)) {
                return;
            }
            var folder = this.properties.folder;
            href = folder === '/' ? href : folder + href;
            if (href.match(/../g)) {
                console.log(href);
                href = parsePath(href);
            }
            wx.navigateTo({
                url: 'index?key=' + href,
            });
            return null;
        },
        __bind_touchcancel: function () { },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSx3Q0FBMEM7QUFFMUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUVyQyxTQUFTLFlBQVksQ0FBQyxTQUFxQixFQUFFLEdBQWU7SUFFMUQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtRQUNuQixTQUFTLGtCQUFPLFNBQVMsR0FBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEVBQUMsQ0FBQztLQUM3RTtJQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFVO1FBQzNCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQWhELENBQWdELENBQ2pELENBQUM7SUFDRixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFZO0lBQzdCLElBQUksR0FBRyxHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhELE9BQU8sSUFBSSxFQUFFO1FBQ1gsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixNQUFNO1NBQ1A7UUFFRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRXRCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQyxDQUFDO0tBQzFCO0lBRUQs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IEB0cy1pZ25vcmVcbmltcG9ydCAqIGFzIE1hcmtkb3duSGFuZGxlciBmcm9tICd0b3d4bWwnO1xuXG5jb25zdCB0b3d4bWwgPSBuZXcgTWFya2Rvd25IYW5kbGVyKCk7XG5cbmZ1bmN0aW9uIHJhbmRvbUluc2VydChpbnNlcnRBcnI6IEFycmF5PGFueT4sIGFycjogQXJyYXk8YW55Pikge1xuICAvLyBjb25zb2xlLmxvZyhhcnIubGVuZ3RoKTtcbiAgaWYgKGFyci5sZW5ndGggPiAzMCkge1xuICAgIGluc2VydEFyciA9IFsuLi5pbnNlcnRBcnIsIHsgbm9kZTogJ2FkJywgYWRJZDogJ2FkdW5pdC0xMjQ2ZjBhNWU0NDFlYTRjJyB9XTtcbiAgfVxuICBpbnNlcnRBcnIuZm9yRWFjaCgodmFsdWU6IGFueSkgPT5cbiAgICBhcnIuc3BsaWNlKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoLCAwLCB2YWx1ZSksXG4gICk7XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChocmVmOiBzdHJpbmcpIHtcbiAgbGV0IGFycjogQXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBocmVmLnNwbGl0KCcvJyk7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBsZXQgaW5kZXggPSBhcnIuaW5kZXhPZignLi4nKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhcnJbaW5kZXhdID0gbnVsbDtcbiAgICBhcnJbaW5kZXggLSAxXSA9IG51bGw7XG4gICAgLy8gcmVtb3ZlIG51bGxcbiAgICBhcnIgPSBhcnIuZmlsdGVyKGQgPT4gZCk7XG4gIH1cblxuICByZXR1cm4gYXJyLmpvaW4oJy8nKTtcbn1cblxuQ29tcG9uZW50KHtcbiAgcHJvcGVydGllczoge1xuICAgIC8vIG1hcmtkb3duIOWOn+Wni+aVsOaNrlxuICAgIG1hcmtkb3duOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJycsXG4gICAgfSxcbiAgICB0aGVtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdsaWdodCcsXG4gICAgfSxcbiAgICBhZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gICAgZm9udFR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9LFxuICAgIGZvbGRlcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gIH0sXG4gIGRhdGE6IHtcbiAgICBNRGRhdGE6ICcnLFxuICB9LFxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpOiB2b2lkIHt9LFxuICB9LFxuICBvYnNlcnZlcnM6IHtcbiAgICBtYXJrZG93bigpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMubWFya2Rvd24gPT09ICcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxldCBNRGRhdGEgPSB0b3d4bWwudG9Kc29uKHRoaXMucHJvcGVydGllcy5tYXJrZG93biwgJ21hcmtkb3duJyk7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBNRGRhdGEudGhlbWUgPSB0aGlzLnByb3BlcnRpZXMudGhlbWU7XG4gICAgICBNRGRhdGEuY2hpbGQgPSByYW5kb21JbnNlcnQoXG4gICAgICAgIFt7IG5vZGU6ICdhZCcsIGFkSWQ6ICdhZHVuaXQtM2VhNzFiN2NmY2U2YzcyMScgfV0sXG4gICAgICAgIE1EZGF0YS5jaGlsZCxcbiAgICAgICk7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBNRGRhdGEuZm9udFR5cGUgPSB0aGlzLnByb3BlcnRpZXMuZm9udFR5cGU7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBNRGRhdGEsXG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICAvLyBAdHMtaWdub3JlXG4gIG1ldGhvZHM6IHtcbiAgICAvLyB0b3d4bWwg5LqL5Lu2XG4gICAgX19iaW5kX3RvdWNoZW5kKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ+inpuaRuOe7k+adnycgKyByZXMpO1xuICAgICAgLy8gbGV0IGVuZFg9IHJlcy5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICAgIC8vIGxldCBlbmRZID0gcmVzLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgLy9cbiAgICAgIC8vIGxldCBkaWZmX3kgPSBlbmRZIC0gPGFueT50aGlzLmRhdGEuc3RhcnRZO1xuICAgICAgLy8gbGV0IGRpZmZfeCA9IGVuZFggLSA8YW55PnRoaXMuZGF0YS5zdGFydFg7XG4gICAgICAvL1xuICAgICAgLy8gY29uc29sZS5sb2coZGlmZl94LGRpZmZfeSk7XG4gICAgICAvL1xuICAgICAgLy8gaWYoTWF0aC5hYnMoZGlmZl95KSA+IDEwICl7XG4gICAgICAvLyAgIHJldHVybjtcbiAgICAgIC8vIH1cbiAgICAgIC8vXG4gICAgICAvLyBkaWZmX3ggPiA0MCAmJiB0aGlzLmJlZm9yZSgpO1xuICAgICAgLy8gZGlmZl94IDwgLTQwICYmIHRoaXMubmV4dCgpO1xuICAgIH0sXG5cbiAgICBfX2JpbmRfdG91Y2hzdGFydCgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCfop6bmkbjlvIDlp4snICsgcmVzKTtcbiAgICAgIC8vIGxldCBzdGFydFg9cmVzLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAvLyBsZXQgc3RhcnRZID0gcmVzLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgLy9cbiAgICAgIC8vIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgLy8gICBzdGFydFgsXG4gICAgICAvLyAgIHN0YXJ0WSxcbiAgICAgIC8vIH0pO1xuICAgIH0sXG5cbiAgICBfX2JpbmRfdG91Y2htb3ZlKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ+inpuaRuOS4rScgKyByZXMpO1xuICAgIH0sXG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgX19iaW5kX3RhcChyZXM6IGFueSkge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIGxldCBocmVmID0gcmVzLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5fZWwuYXR0ci5ocmVmIHx8ICcnO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGhyZWYubWF0Y2goL15odHRwOlxcL1xcLy9nKSB8fFxuICAgICAgICBocmVmLm1hdGNoKC9eaHR0cHM6XFwvXFwvL2cpIHx8XG4gICAgICAgIGhyZWYgPT09ICcnIHx8XG4gICAgICAgICFocmVmLm1hdGNoKC8ubWQkL2cpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBmb2xkZXIgPSB0aGlzLnByb3BlcnRpZXMuZm9sZGVyO1xuXG4gICAgICBocmVmID0gZm9sZGVyID09PSAnLycgPyBocmVmIDogZm9sZGVyICsgaHJlZjtcblxuICAgICAgaWYgKGhyZWYubWF0Y2goLy4uL2cpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGhyZWYpO1xuICAgICAgICBocmVmID0gcGFyc2VQYXRoKGhyZWYpO1xuICAgICAgfVxuXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnaW5kZXg/a2V5PScgKyBocmVmLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICBfX2JpbmRfdG91Y2hjYW5jZWwoKSB7fSxcbiAgfSxcbn0pO1xuIl19