/**
 * Encodes a string to base64, safely handling Unicode characters.
 * This is used for the OpenRouter 'X-Title' header which requires base64.
 * * @param {string} str - The string to encode.
 * @returns {string} The base64-encoded string.
 */
export const b64EncodeUnicode = (str) => {
  // first we use encodeURIComponent to get UTF-8 encoding of the string
  // then we use btoa to convert the UTF-8 string to base64
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
      }));
};