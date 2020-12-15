const React = {};
React.createElement = (tag, attrs, ...children) => {
  return {
    tag,
    attrs,
    children,
  };
};
export default React;
