/**
 * Test script to verify Google Sheets connection
 * Run: node test-connection.js
 */

require('dotenv').config();
const sheetsConfig = require('./config/sheetsConfig');

const fs = require('fs');
const path = require('path');

async function testConnection() {
  console.log('🧪 Testing Google Sheets Connection...\n');

  // Check environment variables
  console.log('📋 Checking configuration:');
  console.log(`   GOOGLE_SHEET_ID: ${process.env.GOOGLE_SHEET_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`   GOOGLE_SERVICE_ACCOUNT_EMAIL: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✅ Set' : '❌ Missing'}`);
  
  // Check for JSON credentials file
  const jsonPath = process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json';
  const jsonExists = fs.existsSync(path.resolve(jsonPath));
  console.log(`   Credentials JSON file (${jsonPath}): ${jsonExists ? '✅ Found' : '❌ Missing'}`);
  
  // Check for private key in env (fallback)
  const hasPrivateKey = process.env.GOOGLE_PRIVATE_KEY ? '✅ Set (using .env)' : 'Not set (using JSON file)';
  console.log(`   GOOGLE_PRIVATE_KEY: ${hasPrivateKey}`);
  console.log('');

  // Validate required fields
  if (!process.env.GOOGLE_SHEET_ID) {
    console.error('❌ GOOGLE_SHEET_ID is missing!');
    console.error('   Add it to your .env file.');
    process.exit(1);
  }

  // Check if we have credentials (either JSON or .env)
  if (!jsonExists && !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('❌ No credentials found!');
    console.error('   Either:');
    console.error('   1. Add GOOGLE_PRIVATE_KEY to .env, OR');
    console.error(`   2. Create ${jsonPath} file with your JSON credentials`);
    process.exit(1);
  }

  try {
    console.log('🔌 Initializing Google Sheets API...');
    const initialized = await sheetsConfig.initialize();

    if (!initialized) {
      console.error('❌ Failed to initialize Google Sheets API');
      process.exit(1);
    }

    console.log('✅ Connection successful!');
    console.log(`📊 Sheet ID: ${process.env.GOOGLE_SHEET_ID}`);
    console.log(`👤 Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);

    // Try to fetch data
    console.log('\n📥 Testing data fetch...');
    const sheets = sheetsConfig.getSheetsInstance();
    const sheetId = sheetsConfig.getSheetId();

    // First, get the sheet metadata to find the actual sheet name
    console.log('   Getting sheet metadata...');
    const metadataResponse = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const firstSheet = metadataResponse.data.sheets[0];
    const sheetName = firstSheet.properties.title;
    console.log(`   Found sheet name: "${sheetName}"`);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1:Z1`, // Use actual sheet name
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log('✅ Successfully fetched data from sheet!');
      console.log(`   Headers: ${response.data.values[0].length} columns found`);
    } else {
      console.log('⚠️  Sheet is empty or no data found');
    }

    console.log('\n🎉 All tests passed! Your backend should work now.');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔍 Full error:', error);

    if (error.message.includes('does not have permission')) {
      console.error('\n💡 Solution: Share your Google Sheet with this email:');
      console.error(`   ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
    }

    if (error.message.includes('Unable to parse')) {
      console.error('\n💡 Solution: Check your GOOGLE_PRIVATE_KEY format in .env file');
      console.error('   It should be wrapped in quotes and have \\n characters');
    }

    process.exit(1);
  }
}

testConnection();

