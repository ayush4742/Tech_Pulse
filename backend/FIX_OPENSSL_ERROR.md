# 🔧 Fix OpenSSL Error: "DECODER routines::unsupported"

This error occurs when Node.js can't parse your private key. Here are the solutions:

## Solution 1: Check Private Key Format (Most Common)

Run this to check your private key:
```bash
cd backend
node fix-private-key.js
```

## Solution 2: Re-copy Private Key from JSON

The private key might have been corrupted when copying. Do this:

1. **Open your JSON key file** (the one you downloaded from Google Cloud)
2. **Find the `private_key` field**
3. **Copy it EXACTLY as shown** - including quotes and `\n`
4. **Paste into `.env` file** like this:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW\n...\n-----END PRIVATE KEY-----\n"
```

**Important:**
- Keep the quotes `""` around the entire key
- Keep all `\n` characters (don't replace with actual line breaks)
- Don't add any extra spaces or characters

## Solution 3: Update Node.js (If Version is Old)

Check your Node.js version:
```bash
node --version
```

**If it's below v18:**
1. Download latest Node.js from: https://nodejs.org/
2. Install it
3. Restart your terminal
4. Try again

## Solution 4: Use Alternative Key Format

If the above doesn't work, try copying the private key WITHOUT quotes in JSON:

1. In your JSON file, the `private_key` might already have `\n` in it
2. Copy JUST the value (without the quotes in JSON)
3. In `.env`, wrap it in quotes:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW
...
-----END PRIVATE KEY-----"
```

But this is less reliable - prefer Solution 2.

## Solution 5: Use Environment Variable Directly (Advanced)

Instead of `.env`, try setting it as an environment variable:

**Windows PowerShell:**
```powershell
$env:GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW\n...\n-----END PRIVATE KEY-----\n"
```

**Windows CMD:**
```cmd
set GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW\n...\n-----END PRIVATE KEY-----\n"
```

Then run:
```bash
node test-connection.js
```

## Solution 6: Re-download JSON Key

If nothing works:

1. Go to Google Cloud Console
2. Navigate to your service account
3. Delete the old key
4. Create a new JSON key
5. Copy the NEW `private_key` value
6. Update your `.env` file

## Quick Test After Fix

```bash
cd backend
node fix-private-key.js
node test-connection.js
```

If both pass, your backend should work!

---

**Most likely solution:** Re-copy the private key from your JSON file, ensuring:
- It's wrapped in quotes in `.env`
- All `\n` characters are preserved
- No extra spaces or line breaks
- The entire key is on one line in `.env`

