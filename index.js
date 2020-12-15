import React from './react';
class App {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  render() {
    return (
      <div>
        <h1>标题</h1>
        <p>我试验一下babel-plugin-transform-react-jsx的作用</p>
      </div>
    );
  }
}
const app = new App();
const res = app.render();

// 加载当前的babel-plugin-transform-react-jsx 进行虚拟dom转换
console.log(res);
