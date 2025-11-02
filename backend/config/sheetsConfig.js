/**
 * Google Sheets API Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Cloud Console: https://console.cloud.google.com/
 * 2. Create a new project (or use existing)
 * 3. Enable "Google Sheets API"
 * 4. Create a Service Account:
 *    - Go to "IAM & Admin" > "Service Accounts"
 *    - Click "Create Service Account"
 *    - Give it a name (e.g., "tech-pulse-sheets")
 *    - Grant it "Editor" role (for now, or custom role with Sheets access)
 * 5. Create a JSON key:
 *    - Click on the service account
 *    - Go to "Keys" tab
 *    - Click "Add Key" > "Create new key" > Choose JSON
 *    - Download the JSON file
 * 6. Extract credentials:
 *    - Copy the "client_email" value → GOOGLE_SERVICE_ACCOUNT_EMAIL
 *    - Copy the "private_key" value → GOOGLE_PRIVATE_KEY
 * 7. Share your Google Sheet with the service account email (IMPORTANT!)
 *    - Open your Google Sheet
 *    - Click "Share" button
 *    - Paste the service account email
 *    - Give it "Editor" access
 * 8. Get your Sheet ID from the URL:
 *    - URL format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
 *    - Copy SHEET_ID → GOOGLE_SHEET_ID
 */

const { google } = require('googleapis');
require('dotenv').config();
const { loadFromJson } = require('./loadCredentials');

class SheetsConfig {
  constructor() {
    this.sheetId = process.env.GOOGLE_SHEET_ID;
    this.auth = null;
    this.sheets = null;
  }

  async initialize() {
    try {
      let clientEmail, privateKey;

      // Try loading from JSON file first (more reliable)
      const jsonPath = process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json';
      const jsonCreds = loadFromJson(jsonPath);
      
      if (jsonCreds) {
        console.log('📁 Loading credentials from JSON file...');
        clientEmail = jsonCreds.client_email;
        privateKey = jsonCreds.private_key;
      } else {
        // Fall back to .env file
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
          throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in .env file');
        }
        if (!process.env.GOOGLE_PRIVATE_KEY) {
          throw new Error('GOOGLE_PRIVATE_KEY is not set in .env file');
        }
        if (!process.env.GOOGLE_SHEET_ID) {
          throw new Error('GOOGLE_SHEET_ID is not set in .env file');
        }

        clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.trim();
        
        // Clean up private key - handle both escaped and unescaped newlines
        privateKey = process.env.GOOGLE_PRIVATE_KEY;
        
        // Remove surrounding quotes if present (both at start and end)
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
          privateKey = privateKey.slice(1, -1);
        }
        if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
          privateKey = privateKey.slice(1, -1);
        }
        
        // Replace escaped newlines with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');
      }
      
      // Ensure the key has proper BEGIN and END markers
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Private key format is invalid. Missing BEGIN marker.');
      }
      if (!privateKey.includes('-----END PRIVATE KEY-----')) {
        throw new Error('Private key format is invalid. Missing END marker.');
      }

      // Service account authentication
      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const authClient = await this.auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: authClient });

      console.log('✅ Google Sheets API initialized successfully');
      console.log(`📊 Connected to Sheet ID: ${this.sheetId.substring(0, 20)}...`);
      return true;
    } catch (error) {
      console.error('❌ Error initializing Google Sheets API:', error.message);
      console.error('\n📝 Make sure you have:');
      console.error('   1. Created a service account');
      console.error('   2. Enabled Google Sheets API');
      console.error('   3. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env');
      console.error('   4. Shared your Google Sheet with the service account email');
      console.error('\n🔍 Full error details:', error);
      throw error; // Re-throw to allow server to handle it
    }
  }

  getSheetId() {
    return this.sheetId;
  }

  getSheetsInstance() {
    return this.sheets;
  }
}

module.exports = new SheetsConfig();

