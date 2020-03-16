import fs from 'fs';
import genDiff from '../src';

const pathToFixtures = '__tests__/__fixtures__/';

describe('Comparing two configuration files and showing a difference.', () => {
  it('json', () => {
    const firstFile = `${pathToFixtures}before.json`;
    const secondFile = `${pathToFixtures}after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('yaml', () => {
    const firstFile = `${pathToFixtures}before.yml`;
    const secondFile = `${pathToFixtures}after.yml`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('ini', () => {
    const firstFile = `${pathToFixtures}before.ini`;
    const secondFile = `${pathToFixtures}after.ini`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('tree', () => {
    const firstFile = `${pathToFixtures}beforeTree.json`;
    const secondFile = `${pathToFixtures}afterTree.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultTree.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile)).toEqual(expected);
  });

  it('plain output', () => {
    const firstFile = `${pathToFixtures}before.json`;
    const secondFile = `${pathToFixtures}after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultPlain.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expected);
  });

  it('json output', () => {
    const firstFile = `${pathToFixtures}before.json`;
    const secondFile = `${pathToFixtures}after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/resultJson.txt`, 'utf-8').trim();
    expect(genDiff(firstFile, secondFile, 'json')).toEqual(expected);
  });
});
