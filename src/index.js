import fs from 'fs';
import path from 'path';
import parsing from './parsers.js';
import getOutput from './formatters';
import buildDifference from './buildDiff.js';

const genDiff = (pathToFirstFile, pathToSecondFile, type = 'complex') => {
  const contentOfFirstFile = fs.readFileSync(path.resolve(process.cwd(), pathToFirstFile), 'utf-8');
  const contentOfSecondFile = fs.readFileSync(path.resolve(process.cwd(), pathToSecondFile), 'utf-8');

  const extensionOfFirstFile = path.extname(pathToFirstFile).slice(1);
  const extensionOfSecondFile = path.extname(pathToSecondFile).slice(1);

  const firstObjectData = parsing(extensionOfFirstFile, contentOfFirstFile);
  const secondObjectData = parsing(extensionOfSecondFile, contentOfSecondFile);

  const difference = buildDifference(firstObjectData, secondObjectData);

  return getOutput(difference, type);
};

export default genDiff;
