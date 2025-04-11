/**
 * Converts a string to title case (first letter of each word capitalized)
 * @param {string} str - The input string to titleize
 * @return {string} The titleized string
 */
export function titleize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
}

/**
 * Returns the current page based on the URL hash.
 * If no hash is present, defaults to 'matching'.
 * @return {string} The current page identifier
 */
export function currentPage() {
  const hash = window.location.hash.substring(1);
  return hash === '' ? 'matching' : hash;
}
