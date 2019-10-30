export default function toRichtext(towxmlChild) {
  // towxmlObj.child
  let nodes = [];
  let children;
  for (const iterator of towxmlChild) {
    let name = iterator._e.tagName;
    let attrs = iterator.attr;
    let childrens = iterator.child;
    let type;
    let text;
    if (iterator.node === "text") {
      type = "text";
      text = iterator.text;
    }
    if (childrens) {
      children = toRichtext(childrens);
    }
    nodes = [...nodes, { name, attrs, children, type, text }];
  }

  return nodes;
}
