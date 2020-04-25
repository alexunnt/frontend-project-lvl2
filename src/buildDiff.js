import _ from 'lodash';

const buildDifference = (firstObjectData, secondObjectData) => {
  const uniqueKeys = _.union(Object.keys(firstObjectData), Object.keys(secondObjectData));

  return uniqueKeys.map((item) => {
    const firstObjectItem = firstObjectData[item];
    const secondObjectItem = secondObjectData[item];
    if (_.has(firstObjectData, item)) {
      return {
        type: 'deleted',
        key: item,
        value: firstObjectItem,
      };
    }
    const checkingFirstObject = _.isObject(firstObjectItem);
    const checkingSecondObject = _.isObject(secondObjectItem);
    if (checkingFirstObject && checkingSecondObject) {
      return {
        type: 'object',
        key: item,
        children: buildDifference(firstObjectItem, secondObjectItem),
      };
    }
    if (firstObjectItem === secondObjectItem) {
      return {
        type: 'unchanged',
        key: item,
        value: firstObjectItem,
      };
    }
    if (checkingFirstObject || checkingSecondObject) {
      return {
        type: 'changed',
        key: item,
        firstValue: firstObjectItem,
        secondValue: secondObjectItem,
      };
    }
    return {
      type: 'added',
      key: item,
      value: secondObjectItem,
    };
  });
};

export default buildDifference;
