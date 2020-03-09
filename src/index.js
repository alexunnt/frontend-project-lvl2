import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsing from './parsers.js';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const contentOfFirstFile = fs.readFileSync(path.resolve(process.cwd(), pathToFirstFile), 'utf-8');
  const contentOfSecondFile = fs.readFileSync(path.resolve(process.cwd(), pathToSecondFile), 'utf-8');
  const extensionOfFirstFile = path.extname(pathToFirstFile);
  const extensionOfSecondFile = path.extname(pathToSecondFile);
  const firstObjectData = parsing(contentOfFirstFile, extensionOfFirstFile);
  const secondObjectData = parsing(contentOfSecondFile, extensionOfSecondFile);

  const uniqueKeys = _.union(Object.keys(firstObjectData), Object.keys(secondObjectData));
  const buildDifference = uniqueKeys.reduce((acc, item) => {
    if ((_.has(firstObjectData, item) && _.has(secondObjectData, item))) {
      return acc.concat({
        type: 'equal',
        key: item,
        firstValue: firstObjectData[item],
        secondValue: secondObjectData[item],
      });
    }
    if ((_.has(firstObjectData, item) && _.has(secondObjectData, item)) && firstObjectData[item]) {
      return acc.concat({
        type: 'changed',
        key: item,
        firstValue: firstObjectData[item],
        secondValue: secondObjectData[item],
      });
    }
    if (_.has(firstObjectData, item) && !_.has(secondObjectData, item)) {
      return acc.concat({
        type: 'deleted',
        key: item,
        firstValue: firstObjectData[item],
        secondValue: null,
      });
    }
    if (!_.has(firstObjectData, item) && _.has(secondObjectData, item)) {
      return acc.concat({
        type: 'added',
        key: item,
        firstValue: null,
        secondValue: secondObjectData[item],
      });
    }
    return acc;
  }, []);

  const result = buildDifference.reduce((acc, item) => {
    if (item.type === 'equal') {
      acc.push(`${item.key}: ${item.firstValue}`);
      return acc;
    }
    if (item.type === 'changed') {
      acc.push(`- ${item.key}: ${item.firstValue}`);
      acc.push(`+ ${item.key}: ${item.secondValue}`);
      return acc;
    }
    if (item.type === 'deleted') {
      acc.push(`- ${item.key}: ${item.firstValue}`);
      return acc;
    }
    if (item.type === 'added') {
      acc.push(`+ ${item.key}: ${item.secondValue}`);
    }
    return acc;
  }, []);

  return result;
};

export default genDiff;
