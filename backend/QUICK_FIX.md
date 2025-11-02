# ⚡ Quick Fix - Use JSON File Instead of .env for Private Key

## The Problem:
The private key is hard to format correctly in `.env` file, causing OpenSSL errors.

## The Solution:
Use the JSON file directly! Much easier and more reliable.

---

## 🚀 3-Step Fix:

### Step 1: Copy JSON File
1. Find your downloaded JSON key file (from Google Cloud Console)
2. Copy it to: `backend/credentials.json`

### Step 2: Update `.env`
Your `backend/.env` should look like this:

```env
GOOGLE_SHEET_ID=1gGV_sdK22TbjFUmfgieDigpt29WPuz_4HPtHuHgidpo
GOOGLE_SERVICE_ACCOUNT_EMAIL=techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_PATH=./credentials.json

# Optional: Remove GOOGLE_PRIVATE_KEY line (not needed with JSON file)
```

### Step 3: Test
```bash
cd backend
node test-connection.js
```

If you see `✅ Google Sheets API initialized successfully`, you're good!

Then start server:
```bash
npm start
```

---

## 🎯 That's It!

The code will automatically load credentials from `credentials.json` instead of parsing from `.env`. This avoids all the formatting issues!

---

**Note:** Make sure `credentials.json` is in the `backend` folder, not the root folder.

