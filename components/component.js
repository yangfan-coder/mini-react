import { _render } from '../reactDom/index';
export class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    // 每次调用方法的时候 都要进行合并
    const result = Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}

export function createComponent(component, props) {
  let inst;

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
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}
export function renderComponent(component) {
  let base;

  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else {
    component.base = base;
    component.componentDidMount && component.componentDidMount();
    if (component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild(base, component.base);
    }
    return;
  }
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
}
