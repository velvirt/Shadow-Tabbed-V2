"use strict";

/**
 * Checks if a string is a valid URL.
 * @param {string} input The input string to validate.
 * @returns {boolean} true if the input is a valid URL, false otherwise.
 */
function isValidURL(input) {
  try {
    new URL(input);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  const inputTrimmed = input.trim();

  // Check if the input is a valid URL
  if (isValidURL(inputTrimmed)) {
    return new URL(inputTrimmed).toString();
  }

  // Check if adding 'http://' makes it a valid URL
  if (isValidURL(`http://${inputTrimmed}`)) {
    return new URL(`http://${inputTrimmed}`).toString();
  }

  // Treat the input as a search query
  return template.replace("%s", encodeURIComponent(inputTrimmed));
}
