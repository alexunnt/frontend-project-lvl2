import getComplex from './complex.js';
import getPlain from './plain.js';

const outputType = {
  complex: getComplex,
  plain: getPlain,
};

export default (data, format) => outputType[format](data);
