import fs from 'fs';
import genDiff from '../src';

describe('Comparing two configuration files and showing a difference.', () => {
  it('json', () => {
    const firstFile = '__tests__/__fixtures__/before.json';
    const secondFile = '__tests__/__fixtures__/after.json';
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });
  it('yaml', () => {
    const firstFile = '__tests__/__fixtures__/before.yml';
    const secondFile = '__tests__/__fixtures__/after.yml';
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('ini', () => {
    const firstFile = '__tests__/__fixtures__/before.ini';
    const secondFile = '__tests__/__fixtures__/after.ini';
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('tree', () => {
    const firstFile = '__tests__/__fixtures__/beforeTree.json';
    const secondFile = '__tests__/__fixtures__/afterTree.json';
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultTree.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });
});
