const readline = require('readline');

/**
 * Prompt user for confirmation
 * @param {string} message - Message to display
 * @returns {Promise<boolean>} User's response (true for yes, false for no)
 */
function promptUser(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      // Default to 'no' if empty or anything other than 'y'/'Y'/'yes'/'YES'
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}

/**
 * Prompt user to overwrite existing file
 * @param {string} filePath - Path to the file that exists
 * @returns {Promise<boolean>} true if user wants to overwrite, false otherwise
 */
async function promptOverwrite(filePath) {
  const path = require('path');
  const relativePath = path.relative(process.cwd(), filePath);
  
  return await promptUser(
    `File "${relativePath}" already exists. Do you want to overwrite it?`
  );
}

module.exports = {
  promptUser,
  promptOverwrite,
};

