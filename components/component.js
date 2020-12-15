import { _render } from '../reactDom/index';
export class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    // 每次调用方法的时候 都要进行合并
    const result = Object.assign(this.state, stateChange);
    // 进行渲染当前对象、当前在componentDidMount 执行当前方法执行：componentWillUpdate、componentDidUpdate 生命周期
    renderComponent(this);
  }
}

/**
 *  @name 创建组件
 *  */
export function createComponent(component, props) {
  let inst;

  // 初始进入传递的是 app的class对象 重新new 这个对象返回一个class对象
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
  } else {
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function () {
      return this.constructor(props);
    };
  }
  return inst;
}

export function setComponentProps(component, props) {
  // 初始没有开关、证明第一次进入执行 当前的WillMount
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}

// 渲染当前的虚拟DOM的节点
export function renderComponent(component) {
  let base;
  // 拿到当前的class对象、执行当前的render方法 获取到虚拟dom的节点
  const renderer = component.render();

  // 标记一个开关
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  // 递归获取真实的DOM节点
  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else {
    // 标记开关
    component.base = base;

    // 没有开关这时已经触发了WillMount、执行DidMount
    component.componentDidMount && component.componentDidMount();

    if (component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild(base, component.base);
    }
    return;
  }
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  // 执行完了componentWillMount、componentDidMount 标记base
  // 下次在执行的时候 走componentWillUpdate、componentDidUpdate方法
  component.base = base;
  base._component = component;
}
