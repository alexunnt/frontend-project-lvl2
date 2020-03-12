import _ from 'lodash';

const strignify = (data) => {
  if (!_.isObject(data)) {
    return `'${data}'`;
  }
  return '[complex value]';
};

const getOutput = (item, parent = '') => {
  const {
    type, key, firstValue, secondValue, children, value,
  } = item;
  switch (type) {
    case 'object':
      return children.map((node) => getOutput(node, `${key}.`));
    case 'changed':
      return `Property '${parent}${key}' was updated. From ${strignify(firstValue)} to ${strignify(secondValue)}`;
    case 'deleted':
      return `Property '${parent}${key}' was removed`;
    case 'added':
      return `Property '${parent}${key}' was added with value: ${strignify(value)}`;
    default:
      return null;
  }
};

export default (ast) => _.flattenDeep(ast.map((item) => getOutput(item))).filter((item) => item !== null).join('\n');
