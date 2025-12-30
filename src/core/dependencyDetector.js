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
      needsComponent: null,
      needsContext: null,
    };
  }

  const dependencies = {
    needsNormalizeSize: false,
    needsTheme: false,
    needsComponent: null,
    needsContext: null,
  };

  // More precise pattern matching
  const normalizeSizePattern = /@\/helper\/normalizeSize|from\s+['"]@\/helper\/normalizeSize|normalizeSize\s*\(/;
  const themePattern = /@\/constants\/theme|from\s+['"]@\/constants\/theme/;

  dependencies.needsNormalizeSize = normalizeSizePattern.test(content);
  dependencies.needsTheme = themePattern.test(content);

  // Detect component imports in context files
  const componentImportPattern = /from\s+['"]@\/components\/ui\/([^'"]+)['"]/;
  const componentMatch = content.match(componentImportPattern);
  if (componentMatch) {
    dependencies.needsComponent = componentMatch[1]; // e.g., "loading-bar"
  }

  // Detect context imports in component files
  const contextImportPattern = /from\s+['"]@\/context\/([^'"]+)['"]/;
  const contextMatch = content.match(contextImportPattern);
  if (contextMatch) {
    dependencies.needsContext = contextMatch[1]; // e.g., "top-loading-bar-context"
  }

  return dependencies;
}

/**
 * Detect related context for a component
 * @param {string} componentName - Component name in kebab-case
 * @param {string} templatesDir - Templates directory
 * @returns {string|null} Related context name or null
 */
function detectRelatedContext(componentName, templatesDir) {
  const fs = require('fs-extra');
  const path = require('path');
  
  // Check all context files to see if any imports this component
  const contextDir = path.join(templatesDir, 'context');
  if (!fs.existsSync(contextDir)) {
    return null;
  }

  const contextFiles = fs.readdirSync(contextDir).filter(file => file.endsWith('.tsx'));
  
  for (const contextFile of contextFiles) {
    const contextPath = path.join(contextDir, contextFile);
    const content = fs.readFileSync(contextPath, 'utf-8');
    
    // Check if this context imports the component
    // Escape special regex characters in componentName
    const escapedComponentName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const componentImportPattern = new RegExp(`@/components/ui/${escapedComponentName}`);
    if (componentImportPattern.test(content)) {
      return path.basename(contextFile, '.tsx');
    }
  }

  return null;
}

/**
 * Detect related component for a context
 * @param {string} contextName - Context name in kebab-case
 * @param {string} templatesDir - Templates directory
 * @returns {string|null} Related component name or null
 */
function detectRelatedComponent(contextName, templatesDir) {
  const fs = require('fs-extra');
  const path = require('path');
  
  const contextPath = path.join(templatesDir, 'context', `${contextName}.tsx`);
  if (!fs.existsSync(contextPath)) {
    return null;
  }

  const content = fs.readFileSync(contextPath, 'utf-8');
  
  // Extract component name from import
  const componentImportPattern = /from\s+['"]@\/components\/ui\/([^'"]+)['"]/;
  const match = content.match(componentImportPattern);
  
  if (match) {
    return match[1]; // e.g., "loading-bar"
  }

  return null;
}

module.exports = {
  detectDependencies,
  detectRelatedContext,
  detectRelatedComponent,
};

