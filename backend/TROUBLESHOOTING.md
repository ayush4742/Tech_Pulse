# 🐛 Backend Troubleshooting Guide

## Common Errors and Solutions

### ❌ Error: "Cannot find module 'express'"

**Solution:**
```bash
cd backend
npm install
```

---

### ❌ Error: "GOOGLE_SERVICE_ACCOUNT_EMAIL is not set"

**Cause:** `.env` file not found or variable not set

**Solution:**
1. Make sure you're in the `backend` folder
2. Check if `.env` file exists: `ls -la .env` (Linux/Mac) or `dir .env` (Windows)
3. Verify the file has all three required variables

---

### ❌ Error: "GOOGLE_PRIVATE_KEY is not set"

**Cause:** Private key not properly set in `.env`

**Solution:**
1. Make sure private key starts and ends with quotes: `"-----BEGIN..."`
2. Keep all `\n` characters (don't replace with actual line breaks)
3. The entire key should be on one line in the `.env` file

---

### ❌ Error: "GOOGLE_SHEET_ID is not set"

**Solution:**
1. Get your Sheet ID from Google Sheet URL
2. Add to `.env`: `GOOGLE_SHEET_ID=your_sheet_id_here`

---

### ❌ Error: "The caller does not have permission" or "Access denied"

**Cause:** Google Sheet not shared with service account

**Solution:**
1. Open your Google Sheet
2. Click "Share" button
3. Add this email: `techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com`
4. Give "Editor" permission
5. Click "Share"
6. Restart backend server

---

### ❌ Error: "Unable to parse private key"

**Cause:** Private key formatting issue

**Solution:**
1. Check private key in `.env` has quotes around it
2. Make sure `\n` characters are preserved (not actual newlines)
3. Verify it starts with `"-----BEGIN PRIVATE KEY-----`
4. Verify it ends with `-----END PRIVATE KEY-----\n"`

**Example of correct format:**
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW\n...\n-----END PRIVATE KEY-----\n"
```

---

### ❌ Error: "Requested entity was not found" (404)

**Cause:** Wrong Sheet ID or sheet doesn't exist

**Solution:**
1. Verify Sheet ID is correct in `.env`
2. Make sure the sheet exists and is accessible
3. Try opening the sheet URL in browser to verify

---

### ❌ Error: "The API returned an error: Invalid credentials"

**Cause:** Service account credentials are invalid or expired

**Solution:**
1. Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correct
2. Verify `GOOGLE_PRIVATE_KEY` is complete (not truncated)
3. Re-download JSON key from Google Cloud Console if needed

---

### ❌ Error: "Port 5000 already in use"

**Solution:**
```bash
# Option 1: Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill

# Option 2: Change port in .env
PORT=5001
```

---

### ❌ Error: "Module not found: Cannot resolve './routes/ml'"

**Solution:**
Make sure `backend/routes/ml.js` exists. If not, the file might be missing. The server will work without it if you comment out the ML routes.

---

### ❌ Error: "Range not found" or "Unable to parse range"

**Cause:** Sheet name might not be "Sheet1"

**Solution:**
1. Check your Google Sheet tab name (bottom of sheet)
2. Update `sheetsService.js` line 30:
   ```javascript
   async fetchAllRows(range = 'YourActualSheetName') {
   ```
   Replace `YourActualSheetName` with your actual sheet tab name

---

## 🔍 Debugging Steps

### Step 1: Check .env File
```bash
# Make sure file exists
cd backend
cat .env  # Linux/Mac
type .env  # Windows

# Should see:
# GOOGLE_SHEET_ID=...
# GOOGLE_SERVICE_ACCOUNT_EMAIL=...
# GOOGLE_PRIVATE_KEY="..."
```

### Step 2: Verify Dependencies
```bash
cd backend
npm install
```

### Step 3: Test Google Sheets Connection
```bash
# Start server
npm start

# Look for:
# ✅ Google Sheets API initialized successfully
```

### Step 4: Test API Endpoints
Open in browser:
- `http://localhost:5000/api/health` - Should return JSON
- `http://localhost:5000/api/count` - Should return count

---

## 🆘 Still Not Working?

**Share the exact error message** and I'll help fix it!

Common info to share:
1. Full error message from terminal
2. Your `.env` file format (hide the actual keys)
3. Whether you shared the Google Sheet with service account
4. Your Node.js version: `node --version`

