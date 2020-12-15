import React from './react/index';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'init',
    };
    this.test = [1, 2, 3];
  }

  handleClick(e) {
    this.setState({
      test: 'test',
    });
  }
  componentDidMount() {
    console.log('1111111');
    // 执行setState的方法
    this.setState({
      test: 'mount',
    });
  }
  componentWillMount() {
    console.log('22222222');
  }
  componentWillUpdate() {
    console.log('333333');
  }
  componentDidUpdate() {
    console.log('4444444');
  }
  render() {
    return (
      <div data-id='111'>
        <span>{this.state.test}</span>
        <button onClick={this.handleClick.bind(this)}>改变状态</button>
      </div>
    );
  }
}
