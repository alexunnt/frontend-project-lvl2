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
  const getStatus = {
    object: () => children.map((node) => getOutput(node, `${key}.`)),
    changed: () => `Property '${parent}${key}' was updated. From ${strignify(firstValue)} to ${strignify(secondValue)}`,
    deleted: () => `Property '${parent}${key}' was removed`,
    added: () => `Property '${parent}${key}' was added with value: ${strignify(value)}`,
    unchanged: () => null,
  };
  return getStatus[type]();
};

export default (ast) => ast.map((item) => getOutput(item))
  .filter((item) => item !== null)
  .join('\n');
