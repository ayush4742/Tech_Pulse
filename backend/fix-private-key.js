/**
 * Helper script to check and fix private key format
 * Run: node fix-private-key.js
 */

require('dotenv').config();

function checkPrivateKey() {
  console.log('🔍 Checking private key format...\n');
  
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('❌ GOOGLE_PRIVATE_KEY is not set');
    return false;
  }
  
  console.log('📋 Private Key Analysis:');
  console.log(`   Length: ${privateKey.length} characters`);
  console.log(`   Has quotes at start: ${privateKey.startsWith('"') || privateKey.startsWith("'")}`);
  console.log(`   Has quotes at end: ${privateKey.endsWith('"') || privateKey.endsWith("'")}`);
  console.log(`   Contains BEGIN marker: ${privateKey.includes('-----BEGIN PRIVATE KEY-----')}`);
  console.log(`   Contains END marker: ${privateKey.includes('-----END PRIVATE KEY-----')}`);
  console.log(`   Contains \\n: ${privateKey.includes('\\n')}`);
  console.log(`   Contains actual newlines: ${privateKey.includes('\n')}`);
  
  // Clean the key
  let cleanedKey = privateKey;
  
  // Remove quotes
  if ((cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) || 
      (cleanedKey.startsWith("'") && cleanedKey.endsWith("'"))) {
    cleanedKey = cleanedKey.slice(1, -1);
    console.log('\n✅ Removed surrounding quotes');
  }
  
  // Check for \n
  if (cleanedKey.includes('\\n')) {
    cleanedKey = cleanedKey.replace(/\\n/g, '\n');
    console.log('✅ Converted \\n to actual newlines');
  }
  
  // Validate format
  if (!cleanedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    console.error('\n❌ ERROR: Private key missing BEGIN marker');
    return false;
  }
  
  if (!cleanedKey.includes('-----END PRIVATE KEY-----')) {
    console.error('\n❌ ERROR: Private key missing END marker');
    return false;
  }
  
  // Check if key can be parsed
  try {
    // Try to create a basic validation (checking structure)
    const lines = cleanedKey.split('\n');
    console.log(`\n📊 Key structure: ${lines.length} lines`);
    console.log(`   First line: ${lines[0].substring(0, 30)}...`);
    console.log(`   Last line: ${lines[lines.length - 1].substring(0, 30)}...`);
    
    // Check if it looks like a valid PEM format
    if (lines[0].trim() !== '-----BEGIN PRIVATE KEY-----') {
      console.error('❌ ERROR: First line should be "-----BEGIN PRIVATE KEY-----"');
      return false;
    }
    
    if (lines[lines.length - 1].trim() !== '-----END PRIVATE KEY-----') {
      console.error('❌ ERROR: Last line should be "-----END PRIVATE KEY-----"');
      return false;
    }
    
    console.log('\n✅ Private key format looks correct!');
    console.log('\n💡 If you still get OpenSSL errors, try:');
    console.log('   1. Make sure Node.js version is 18+ (run: node --version)');
    console.log('   2. Re-download the JSON key from Google Cloud Console');
    console.log('   3. Copy the private_key value again (ensure no extra spaces)');
    
    return true;
  } catch (error) {
    console.error('\n❌ Error parsing key:', error.message);
    return false;
  }
}

checkPrivateKey();

