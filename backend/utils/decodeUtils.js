const morse = require('morse');

const decodeMorseInObject = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      decodeMorseInObject(obj[key]);
    } else if (typeof obj[key] === 'string') {
      obj[key] = morse.decode(obj[key]);
    }
  }
  return obj;
};

module.exports = { decodeMorseInObject };
