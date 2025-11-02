# 🔧 Detailed Setup Guide - Tech Pulse

This guide will walk you through setting up Tech Pulse step-by-step.

## 📋 What You Need

1. ✅ Google Form with responses (you already have this!)
2. ✅ Google Cloud account (free tier is fine)
3. ✅ Node.js installed
4. ✅ Basic terminal/command line knowledge

## 🎯 Step-by-Step Setup

### Part 1: Google Sheets API Setup (15 minutes)

#### Step 1.1: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click the project dropdown (top left)
3. Click "New Project"
4. Name it: `tech-pulse` (or any name)
5. Click "Create"

#### Step 1.2: Enable Google Sheets API

1. In the left sidebar, click "APIs & Services" > "Library"
2. Search for: `Google Sheets API`
3. Click on it
4. Click the blue "Enable" button
5. Wait for it to enable (takes a few seconds)

#### Step 1.3: Create Service Account

1. In left sidebar, click "IAM & Admin" > "Service Accounts"
2. Click "+ CREATE SERVICE ACCOUNT" (top)
3. Fill in:
   - **Service account name**: `tech-pulse-sheets`
   - **Service account ID**: (auto-filled)
4. Click "CREATE AND CONTINUE"
5. Under "Grant this service account access to project":
   - Select role: **Editor** (or "Service Account User")
6. Click "CONTINUE"
7. Click "DONE" (skip optional steps)

#### Step 1.4: Create JSON Key

1. You should see your service account in the list
2. Click on it (the email address)
3. Go to the "Keys" tab (top menu)
4. Click "ADD KEY" > "Create new key"
5. Select **JSON**
6. Click "CREATE"
7. **IMPORTANT:** A JSON file will download - **save this file safely!**
   - You'll need it in the next step
   - Don't share it publicly!

#### Step 1.5: Share Google Sheet

1. Open your Google Sheet (TechPulse_Responses)
2. Click the green "Share" button (top right)
3. In the "Add people and groups" field, paste:
   - The **service account email** (from the JSON file you downloaded)
   - It looks like: `tech-pulse-sheets@your-project.iam.gserviceaccount.com`
4. Make sure permission is set to **Editor**
5. **UNCHECK** "Notify people" (not needed for service accounts)
6. Click "Share"

#### Step 1.6: Get Sheet ID

1. Look at your Google Sheet URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0
   ```
2. Copy the long ID between `/d/` and `/edit`
3. Save it - you'll need it next!

### Part 2: Backend Setup (10 minutes)

#### Step 2.1: Open JSON Key File

1. Find the JSON file you downloaded earlier
2. Open it in a text editor (Notepad, VS Code, etc.)
3. You'll see something like:
   ```json
   {
     "type": "service_account",
     "project_id": "...",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "tech-pulse-sheets@...iam.gserviceaccount.com",
     ...
   }
   ```

#### Step 2.2: Create .env File

1. Navigate to the `backend` folder in your project
2. Create a file named `.env` (no extension!)
3. Copy this template:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=paste_your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=paste_client_email_from_json
GOOGLE_PRIVATE_KEY="paste_private_key_from_json_keep_quotes_and_n"

# Server Settings
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. **Fill in the values:**
   - `GOOGLE_SHEET_ID`: Paste the Sheet ID from Step 1.6
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Copy `client_email` from JSON file
   - `GOOGLE_PRIVATE_KEY`: Copy `private_key` from JSON file
     - **IMPORTANT:** Keep the quotes `""` around it
     - Keep all the `\n` characters as they are

**Example:**
```env
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j
GOOGLE_SERVICE_ACCOUNT_EMAIL=tech-pulse-sheets@my-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Step 2.3: Install Backend Dependencies

1. Open terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   (This might take 2-3 minutes)

#### Step 2.4: Test Backend

1. Start the server:
   ```bash
   npm start
   ```

2. You should see:
   ```
   🚀 Starting Tech Pulse Backend...
   📊 Initializing Google Sheets connection...
   ✅ Google Sheets API initialized successfully
   ✅ Server running on http://localhost:5000
   ```

3. **If you see errors:**
   - ❌ "Error initializing Google Sheets API"
     - Check your `.env` file formatting
     - Verify service account email is correct
     - Make sure you shared the sheet with service account
   - ❌ "Cannot find module"
     - Run `npm install` again

4. **Keep this terminal open!** The server needs to keep running.

### Part 3: Frontend Setup (5 minutes)

#### Step 3.1: Install Frontend Dependencies

1. Open a **new terminal window** (keep backend running!)
2. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   (This might take 3-5 minutes - it's downloading React and all libraries)

#### Step 3.2: Start Frontend

1. Still in the frontend folder, run:
   ```bash
   npm start
   ```

2. Your browser should automatically open to `http://localhost:3000`

3. **You should see:**
   - Tech Pulse dashboard
   - Real-time counter showing your response count
   - Charts with data from your Google Sheet

### Part 4: Verify Everything Works

#### Test 1: Check Backend API
1. Open a browser
2. Go to: `http://localhost:5000/api/health`
3. You should see: `{"status":"ok","message":"Tech Pulse API is running"}`

#### Test 2: Check Data Fetching
1. Go to: `http://localhost:5000/api/count`
2. You should see: `{"count":16,"timestamp":"..."}` (your actual count)

#### Test 3: Check Dashboard
1. Make sure frontend is showing data
2. Submit a new response to your Google Form
3. Wait 5-10 seconds
4. Dashboard should update automatically!

## 🎉 Success Checklist

- [ ] Google Sheets API enabled
- [ ] Service account created and JSON key downloaded
- [ ] Google Sheet shared with service account email
- [ ] Backend `.env` file configured correctly
- [ ] Backend server running without errors
- [ ] Frontend showing dashboard with data
- [ ] Real-time updates working (test by submitting form)

## 🆘 Common Issues & Fixes

### Issue: "Error initializing Google Sheets API"

**Possible causes:**
1. ❌ Wrong Sheet ID
   - ✅ Double-check Sheet ID from URL
2. ❌ Service account not shared
   - ✅ Go to Google Sheet > Share > Add service account email
3. ❌ Wrong private key format
   - ✅ Make sure private key has quotes and `\n` characters

### Issue: "Cannot find module 'express'"

**Fix:**
```bash
cd backend
npm install
```

### Issue: Frontend shows "Failed to fetch"

**Possible causes:**
1. ❌ Backend not running
   - ✅ Check backend terminal is running
   - ✅ Test `http://localhost:5000/api/health`
2. ❌ CORS error
   - ✅ Check `FRONTEND_URL` in backend `.env` is `http://localhost:3000`

### Issue: Dashboard shows 0 or no data

**Possible causes:**
1. ❌ Column names don't match
   - ✅ Check your Google Sheet column headers match expected format
   - ✅ See README.md for expected column names
2. ❌ Sheet name is wrong
   - ✅ Default is "Sheet1" - if different, update `sheetsService.js`

## 📞 Next Steps

1. ✅ **Customize charts** - Edit components in `frontend/src/components/`
2. ✅ **Add ML predictions** - Set up Python environment (see README.md)
3. ✅ **Deploy** - Follow deployment guide in README.md
4. ✅ **Share your form** - Get more responses for better data!

## 💡 Pro Tips

- **Keep backend terminal open** while developing
- **Check browser console** (F12) for frontend errors
- **Test API endpoints directly** in browser to debug
- **Use Postman** to test API if needed
- **Check Google Cloud Console** for API usage/quota

---

**Still stuck?** Review the error message carefully - most issues are configuration problems that can be fixed by double-checking your `.env` file and Google Cloud setup!

