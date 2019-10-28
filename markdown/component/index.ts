import * as MarkdownHandler from "@pcit/towxml";
import openGithub from "../utils/openGitHub";

const towxml = new MarkdownHandler();

function randomInsert(insertArr: Array<any>, arr: Array<any>) {
  // console.log(arr.length);
  if (arr.length > 30) {
    insertArr = [...insertArr];
  } else {
    insertArr = [insertArr[0]];
  }

  try {
    insertArr.forEach((value: any) =>
      arr.splice(Math.random() * arr.length, 0, value)
    );
  } catch (e) {}

  return arr;
}

function parsePath(href: string) {
  let arr: Array<string | null> = href.split("/");

  while (true) {
    let index = arr.indexOf("..");
    if (index === -1) {
      break;
    }

    arr[index] = null;
    arr[index - 1] = null;
    // remove null
    arr = arr.filter(d => d);
  }

  return arr.join("/");
}

Component({
  properties: {
    // markdown 原始数据或者 towxml 处理过的数据（is-towxml="{{true}}"）
    markdown: {
      type: String,
      value: "", // '# title'
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
      // 是否触发点击事件，若 markdown 为目录(summary)请设为 false
      type: Boolean,
      value: true
    },
    key: { // markdown key, 启用缓存时需要
      type: String,
      value: ""
    },
    cache: { // 是否启用缓存
      type: Boolean,
      value: true
    },
    passMdByCache:{ 
      // markdown 传入的是 MD 数据缓存 key,
      // 即 markdown 可以传入 md 原始数据，也可以传入缓存 key(这个 缓存 key 存储的是 md 原始数据)
      type: Boolean,
      value: false,
    },
  },
  data: {
    MDdata: ""
  },
  lifetimes: {
    attached(): void {}
  },
  observers: {
    markdown() {
      let {
        markdown,
        theme,
        ad,
        fontType,
        isTowxml,
        key,
        cache,
        passMdByCache,
      } = this.properties;

      if(passMdByCache){
        markdown = wx.getStorageSync(markdown);
        console.log('get markdown from cache');
      }

      if (markdown === "") {
        this.setData({
          MDdata: ""
        });

        return;
      }

      if (isTowxml) {
        this.setData({
          MDdata: markdown
        });

        return;
      }

      let MDdata: any;

      let MDdataFromCache = wx.getStorageSync(`wx-markdown/${key}`);

      if (key !== "" && MDdataFromCache && cache) {
        MDdata = JSON.parse(MDdataFromCache);
        console.log("cached");
      } else {
        MDdata = towxml.toJson(markdown, "markdown");
        wx.setStorage({
          key: `wx-markdown/${key}`,
          data: JSON.stringify(MDdata)
        });
      }

      if (ad !== []) {
        MDdata.child = randomInsert(
          ad.map((adId: string) => {
            return { node: "ad", adId };
          }),
          MDdata.child
        );
      }

      MDdata.theme = theme;
      MDdata.fontType = fontType;

      this.setData({
        MDdata
      });
    }
  },
  // @ts-ignore
  methods: {
    // towxml 事件
    __bind_touchend() {
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

    __bind_touchstart() {
      // console.log('触摸开始' + res);
      // let startX=res.touches[0].pageX;
      // let startY = res.changedTouches[0].pageY;
      //
      // this.setData!({
      //   startX,
      //   startY,
      // });
    },

    __bind_touchmove() {
      // console.log('触摸中' + res);
    },

    // @ts-ignore
    __bind_tap(res: any) {
      console.log(res);
      let href = res.currentTarget.dataset._el.attr.href || "";

      if (href !== "") {
        console.log(href);
      }

      const { folder, navigator } = this.properties;

      if (href.match(/^https:\/\/github.com/)) {
        let array = href.split("/");
        let user = array[3] || null;
        let repo = array[4] || null;

        openGithub(user, repo);
      }

      if (
        href.match(/^http:\/\//g) ||
        href.match(/^https:\/\//g) ||
        href === "" ||
        !href.match(/.md$/g) ||
        !navigator
      ) {
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

    __bind_touchcancel() {}
  }
});
