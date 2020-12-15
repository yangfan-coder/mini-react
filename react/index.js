import { Component } from '../components/component';

const React = {};
React.Component = Component;
React.createElement = (tag, attrs, ...children) => {
  return {
    tag,
    attrs,
    children,
  };
};
export default React;
