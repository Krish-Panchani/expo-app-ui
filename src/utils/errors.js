class CLIError extends Error {
  constructor(message, code = 'CLI_ERROR') {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

class TemplateNotFoundError extends CLIError {
  constructor(templateName) {
    super(`Template "${templateName}" not found`, 'TEMPLATE_NOT_FOUND');
    this.templateName = templateName;
  }
}

class FileExistsError extends CLIError {
  constructor(filePath) {
    super(`File already exists: ${filePath}`, 'FILE_EXISTS');
    this.filePath = filePath;
  }
}

class InvalidProjectError extends CLIError {
  constructor(message = 'Not a valid Expo project') {
    super(message, 'INVALID_PROJECT');
  }
}

class InvalidInputError extends CLIError {
  constructor(message = 'Invalid input provided') {
    super(message, 'INVALID_INPUT');
  }
}

module.exports = {
  CLIError,
  TemplateNotFoundError,
  FileExistsError,
  InvalidProjectError,
  InvalidInputError,
};
