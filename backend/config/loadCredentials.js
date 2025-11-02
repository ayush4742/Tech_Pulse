/**
 * Alternative: Load credentials directly from JSON file
 * This bypasses .env file issues with private key formatting
 */

const fs = require('fs');
const path = require('path');

function loadFromJson(jsonFilePath) {
  try {
    // Try to read from JSON file
    const jsonPath = path.resolve(jsonFilePath);
    
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`JSON file not found: ${jsonPath}`);
    }

    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const credentials = JSON.parse(jsonContent);

    return {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    };
  } catch (error) {
    console.error('Error loading from JSON:', error.message);
    return null;
  }
}

module.exports = { loadFromJson };

