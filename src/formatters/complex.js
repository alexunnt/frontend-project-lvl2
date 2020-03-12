import _ from 'lodash';

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const gettingInner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${item}: ${data[item]}`;
    }
    return `${item}: ${stringify(item, level)}`;
  });
  return _.flattenDeep(['{', gettingInner, '  }']).join('\n');
};

const getOutput = (item, depth = 0) => {
  const {
    type, key, firstValue, secondValue, value, children,
  } = item;
  switch (type) {
    case 'object':
      return [`${key}: {`,
        ...children.map((node) => getOutput(node, depth + 1)),
        '}'];
    case 'unchanged':
      return `  ${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [`- ${key}: ${stringify(firstValue, depth)}`,
        `+ ${key}: ${stringify(secondValue, depth)}`];
    case 'deleted':
      return `- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `+ ${key}: ${stringify(value, depth)}`;
    default:
      throw new Error('Type error');
  }
};

export default (genDiff) => _.flattenDeep(['{', genDiff.map((item) => getOutput(item)), '}']).join('\n');
