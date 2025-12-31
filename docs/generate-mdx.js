const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('data/components.json', 'utf8'));

function createComponentMDX(component) {
  const propsTable = component.props ? component.props.map(p => 
    `| ${p.name} | ${p.type.replace(/\|/g, '\\|')} | ${p.default || '-'} | ${p.description} |`
  ).join('\n') : '';

  const examples = component.examples ? component.examples.map(ex => 
    `### ${ex.title}\n\n` + 
    `\`\`\`tsx\n${ex.code}\n\`\`\``
  ).join('\n\n') : '';

  const features = component.features ? component.features.map(f => `- ${f}`).join('\n') : '';

  const dependencies = component.dependencies && component.dependencies.length > 0 
    ? `:::note\nThis will automatically add required dependencies: ${component.dependencies.join(', ')}.\n:::\n\n` 
    : '';

  const usageExample = component.examples && component.examples.length > 0 
    ? component.examples[0].code 
    : component.import;

  return `# ${component.name}

${component.description}

## Installation

\`\`\`bash
${component.installation}
\`\`\`

${dependencies}## Usage

\`\`\`tsx
${component.import}

${usageExample}
\`\`\`

${propsTable ? `## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propsTable}

` : ''}${examples ? `## Examples

${examples}

` : ''}${features ? `## Features

${features}

` : ''}`;
}

function createContextMDX(context) {
  const propsTable = context.props ? context.props.map(p => 
    `| ${p.name} | ${p.type.replace(/\|/g, '\\|')} | ${p.default || '-'} | ${p.description} |`
  ).join('\n') : '';

  const hookTable = context.hook && context.hook.returns ? context.hook.returns.map(r => 
    `| ${r.name}() | ${r.type} | ${r.description} |`
  ).join('\n') : '';

  const examples = context.examples ? context.examples.map(ex => 
    `### ${ex.title}\n\n` + 
    `\`\`\`tsx\n${ex.code}\n\`\`\``
  ).join('\n\n') : '';

  const features = context.features ? context.features.map(f => `- ${f}`).join('\n') : '';

  const dependencies = context.dependencies && context.dependencies.length > 0 
    ? `:::note\nThis will automatically add required dependencies: ${context.dependencies.join(', ')}.\n:::\n\n` 
    : '';

  return `# ${context.name}

${context.description}

## Installation

\`\`\`bash
${context.installation}
\`\`\`

${dependencies}## Usage

\`\`\`tsx
${context.import}
\`\`\`

${propsTable ? `## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propsTable}

` : ''}${hookTable ? `## Hook API

### ${context.hook.name}

| Method | Type | Description |
|--------|------|-------------|
${hookTable}

` : ''}${examples ? `## Examples

${examples}

` : ''}${features ? `## Features

${features}

` : ''}`;
}

function createHelperMDX(helper) {
  const functionSig = helper.function ? helper.function.signature : '';
  const params = helper.function && helper.function.parameters ? helper.function.parameters.map(p => 
    `| ${p.name} | ${p.type} | ${p.description} |`
  ).join('\n') : '';

  const returns = helper.function && helper.function.returns 
    ? `| ${helper.function.returns.type} | ${helper.function.returns.description} |`
    : '';

  const examples = helper.examples ? helper.examples.map(ex => 
    `### ${ex.title}\n\n` + 
    `\`\`\`tsx\n${ex.code}\n\`\`\``
  ).join('\n\n') : '';

  const features = helper.features ? helper.features.map(f => `- ${f}`).join('\n') : '';

  return `# ${helper.name}

${helper.description}

## Installation

\`\`\`bash
${helper.installation}
\`\`\`

## Usage

\`\`\`tsx
${helper.import}
\`\`\`

${functionSig ? `## Function Signature

\`\`\`tsx
${functionSig}
\`\`\`

${params ? `### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
${params}

` : ''}${returns ? `### Returns

| Type | Description |
|------|-------------|
${returns}

` : ''}` : ''}${examples ? `## Examples

${examples}

` : ''}${features ? `## Features

${features}

` : ''}`;
}

function createConstantMDX(constant) {
  const exports = constant.exports || {};
  const colors = exports.colors ? Object.entries(exports.colors).map(([k, v]) => 
    `| ${k} | ${v} |`
  ).join('\n') : '';

  const sizes = exports.sizes ? Object.entries(exports.sizes).map(([k, v]) => 
    `| ${k} | ${v} |`
  ).join('\n') : '';

  const examples = constant.examples ? constant.examples.map(ex => 
    `### ${ex.title}\n\n` + 
    `\`\`\`tsx\n${ex.code}\n\`\`\``
  ).join('\n\n') : '';

  const features = constant.features ? constant.features.map(f => `- ${f}`).join('\n') : '';

  const dependencies = constant.dependencies && constant.dependencies.length > 0 
    ? `:::note\nThis will automatically add required dependencies: ${constant.dependencies.join(', ')}.\n:::\n\n` 
    : '';

  return `# ${constant.name}

${constant.description}

## Installation

\`\`\`bash
${constant.installation}
\`\`\`

${dependencies}## Usage

\`\`\`tsx
${constant.import}
\`\`\`

${colors ? `## Exports

### Colors

| Color | Value |
|-------|-------|
${colors}

` : ''}${sizes ? `### Sizes

| Size | Value |
|------|-------|
${sizes}

` : ''}${examples ? `## Examples

${examples}

` : ''}${features ? `## Features

${features}

` : ''}`;
}

// Create components
data.components.forEach(comp => {
  const content = createComponentMDX(comp);
  fs.writeFileSync(`pages/docs/components/${comp.slug}.mdx`, content);
  console.log(`Created: pages/docs/components/${comp.slug}.mdx`);
});

// Create contexts
if (data.contexts) {
  data.contexts.forEach(ctx => {
    const content = createContextMDX(ctx);
    fs.writeFileSync(`pages/docs/contexts/${ctx.slug}.mdx`, content);
    console.log(`Created: pages/docs/contexts/${ctx.slug}.mdx`);
  });
}

// Create helpers
if (data.helpers) {
  data.helpers.forEach(helper => {
    const content = createHelperMDX(helper);
    fs.writeFileSync(`pages/docs/helpers/${helper.slug}.mdx`, content);
    console.log(`Created: pages/docs/helpers/${helper.slug}.mdx`);
  });
}

// Create constants
if (data.constants) {
  data.constants.forEach(constant => {
    const content = createConstantMDX(constant);
    fs.writeFileSync(`pages/docs/constants/${constant.slug}.mdx`, content);
    console.log(`Created: pages/docs/constants/${constant.slug}.mdx`);
  });
}

console.log('All MDX files generated successfully!');

