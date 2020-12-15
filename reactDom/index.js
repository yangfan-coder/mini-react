import handleAttrs from './handleAttrs';
import { createComponent, setComponentProps } from '../components/component';
const ReactDom = {};

const render = function (vnode, container) {
  return container.appendChild(_render(vnode));
};

ReactDom.render = render;

export function _render(vnode) {
  if (vnode === undefined || vnode == null || typeof vnode === 'boolean') {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return textNode;
  }
  // 初始的话的时候 会进入当前的判断 因为传递的是App的一个class对象
  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  const dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      handleAttrs(dom, key, value);
    });
  }

  vnode.children && vnode.children.forEach((child) => render(child, dom));

  return dom;
}

export default ReactDom;
