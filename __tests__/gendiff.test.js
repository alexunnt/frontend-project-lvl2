import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '../__tests__', '__fixtures__', filename);
const readFileSync = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'complex', 'result.txt'],
  ['ini', 'complex', 'result.txt'],
  ['yml', 'complex', 'result.txt'],
  ['json', 'plain', 'resultPlain.txt'],
  ['json', 'json', 'resultJson.txt'],
];

test.each(cases)('Comparing two configuration files.', (extension, format, pathToResult) => {
  const expectedResult = readFileSync(pathToResult);
  const path1 = getFixturePath(`before.${extension}`);
  const path2 = getFixturePath(`after.${extension}`);
  const result = genDiff(path1, path2, format);
  expect(result).toEqual(expectedResult);
});
