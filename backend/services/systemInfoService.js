const axios = require('axios');
const morse = require('morse');
const { decodeMorseInObject } = require('../utils/decodeUtils');

const decodeMorse = (morseText) => {
  return morse.decode(morseText);
};

const getSystemInfo = async (command) => {
  try {
    const morseText = morse.encode(command);

    const response = await axios.post('http://ik.olleco.net/morse-api/', {
      command: morseText,
    });

    const morseData = response.data;

    const decodedData = decodeMorseInObject(morseData);

    return decodedData;
  } catch (error) {
    throw error;
  }
};

module.exports = { getSystemInfo };
