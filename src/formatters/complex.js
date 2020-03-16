import _ from 'lodash';

const indention = (value) => ' '.repeat(value * 2);

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const gettingInner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${indention(level + 2)}${item}: ${data[item]}`;
    }
    return `${indention(level + 2)}${item}: ${stringify(item, level)}`;
  });
  return _.flattenDeep(['{', gettingInner, `${indention(level)}  }`]).join('\n');
};

const getOutput = (item, depth = 0) => {
  const {
    type, key, firstValue, secondValue, value, children,
  } = item;
  switch (type) {
    case 'object':
      return [`${indention(depth + 1)}${key}: {`,
        ...children.map((node) => getOutput(node, depth + 1)),
        `${indention(depth + 1)}}`];
    case 'unchanged':
      return `${indention(depth + 1)}${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [`${indention(depth)}- ${key}: ${stringify(firstValue, depth)}`,
        `${indention(depth)}+ ${key}: ${stringify(secondValue, depth)}`];
    case 'deleted':
      return `${indention(depth)}- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${indention(depth)}+ ${key}: ${stringify(value, depth)}`;
    default:
      throw new Error('Type error');
  }
};

export default (genDiff) => _.flattenDeep(['{', genDiff.map((item) => getOutput(item)), '}']).join('\n');
