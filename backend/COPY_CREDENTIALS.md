# 🔑 Use JSON File for Credentials (Easiest Method)

Instead of copying the private key to `.env`, we'll use the JSON file directly. This is more reliable!

## Steps:

### 1. Copy Your JSON File to Backend Folder

1. Find your downloaded JSON key file (the one from Google Cloud Console)
2. **Copy it** to the `backend` folder
3. **Rename it** to `credentials.json`

**Your folder structure should be:**
```
TechPulse/
├── backend/
│   ├── credentials.json    ← Put it here!
│   ├── .env
│   ├── server.js
│   └── ...
```

### 2. Update Your `.env` File

Open `backend/.env` and make sure it has:

```env
GOOGLE_SHEET_ID=1gGV_sdK22TbjFUmfgieDigpt29WPuz_4HPtHuHgidpo
GOOGLE_SERVICE_ACCOUNT_EMAIL=techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_PATH=./credentials.json

# You can REMOVE the GOOGLE_PRIVATE_KEY line now (not needed when using JSON file)
```

### 3. Test It

```bash
cd backend
node test-connection.js
```

You should see:
```
📁 Loading credentials from JSON file...
✅ Google Sheets API initialized successfully
```

### 4. Start Server

```bash
npm start
```

---

## ✅ Benefits:

- ✅ No formatting issues with private key
- ✅ No need to worry about quotes or `\n` characters
- ✅ More secure (keep JSON file out of Git)
- ✅ Works on all operating systems

---

## 🔒 Security Note:

Make sure `credentials.json` is in `.gitignore` (it should be already). Never commit this file to Git!

