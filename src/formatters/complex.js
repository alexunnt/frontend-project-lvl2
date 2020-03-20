import _ from 'lodash';

const indention = (num) => ' '.repeat(num * 2);

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const gettingInner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${indention(level + 5)}${item}: ${data[item]}`;
    }
    return `${indention(level + 5)}${item}: ${stringify(item, level)}`;
  });
  return _.flattenDeep(['{', gettingInner, `${indention(level + 2)}  }`]).join('\n');
};

const getOutput = (item, depth = 0) => {
  const {
    type, key, firstValue, secondValue, value, children,
  } = item;
  switch (type) {
    case 'object':
      return [`  ${indention(depth + 2)}${key}: {`,
        ...children.map((node) => getOutput(node, depth + 1)),
        `${indention(depth + 1)}  }`];
    case 'unchanged':
      return `  ${indention(depth + 2)}${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [`${indention(depth + 2)}- ${key}: ${stringify(firstValue, depth)}`,
        `${indention(depth + 2)}+ ${key}: ${stringify(secondValue, depth)}`];
    case 'deleted':
      return `${indention(depth + 2)}- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${indention(depth + 2)}+ ${key}: ${stringify(value, depth)}`;
    default:
      throw new Error('Type error');
  }
};

export default (genDiff) => _.flattenDeep(['{', genDiff.map((item) => getOutput(item)), '}']).join('\n');
