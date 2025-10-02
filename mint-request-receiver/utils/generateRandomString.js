const crypto = require('crypto');

/**
 * Generates a secure random string of specified length using a custom charset.
 * @param {number} length - Number of characters in the output string.
 * @param {string} [charset] - Characters to choose from.
 * @returns {string}
 */
const generateRandomString = (length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  if (length <= 0) return '';

  const result = [];
  const bytes = crypto.randomBytes(length);
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const index = bytes[i] % charsetLength;
    result.push(charset[index]);
  }

  return result.join('');
}

module.exports = generateRandomString;