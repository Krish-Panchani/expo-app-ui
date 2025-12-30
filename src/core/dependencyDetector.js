/**
 * Detect dependencies in component content
 * @param {string} content - File content to analyze
 * @returns {Object} Dependencies object
 */
function detectDependencies(content) {
  if (typeof content !== 'string') {
    return {
      needsNormalizeSize: false,
      needsTheme: false,
    };
  }

  const dependencies = {
    needsNormalizeSize: false,
    needsTheme: false,
  };

  // More precise pattern matching
  const normalizeSizePattern = /@\/helper\/normalizeSize|from\s+['"]@\/helper\/normalizeSize|normalizeSize\s*\(/;
  const themePattern = /@\/constants\/theme|from\s+['"]@\/constants\/theme/;

  dependencies.needsNormalizeSize = normalizeSizePattern.test(content);
  dependencies.needsTheme = themePattern.test(content);

  return dependencies;
}

module.exports = {
  detectDependencies,
};

