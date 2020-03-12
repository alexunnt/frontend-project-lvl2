import getComplex from './complex.js';
import getPlain from './plain.js';
import getJson from './json.js';

const outputType = {
  complex: getComplex,
  plain: getPlain,
  json: getJson,
};

export default (data, format) => outputType[format](data);
