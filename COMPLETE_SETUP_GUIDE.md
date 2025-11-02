# 🔍 Complete Project Setup Review & Fix Guide

## Current Status:

### ❌ Missing Files Found:
1. **backend/.env** - NOT FOUND (needs to be created)
2. **frontend/.env** - NOT FOUND (needs to be created)
3. **backend/credentials.json** - NEED TO VERIFY

---

## ✅ Step-by-Step Complete Fix:

### Step 1: Create Backend .env File

**Location:** `backend/.env`

**Content:**
```env
GOOGLE_SHEET_ID=1gGV_sdK22TbjFUmfgieDigpt29WPuz_4HPtHuHgidpo
GOOGLE_SERVICE_ACCOUNT_EMAIL=techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_PATH=./credentials.json
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

**Important Notes:**
- PORT is set to 5001 (to avoid conflicts)
- FRONTEND_URL points to 3001 (since frontend uses port 3001)

---

### Step 2: Verify credentials.json

**Location:** `backend/credentials.json`

**Make sure:**
- File exists in `backend` folder
- Contains your service account JSON key

---

### Step 3: Create Frontend .env File

**Location:** `frontend/.env`

**Content:**
```env
REACT_APP_API_URL=http://localhost:5001/api
PORT=3001
```

**Important Notes:**
- Points to backend on port 5001
- Frontend runs on port 3001

---

### Step 4: Kill Ports (Clear Conflicts)

**Run in PowerShell:**
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,5001 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

---

### Step 5: Start Backend

**Terminal 1:**
```bash
cd backend
npm start
```

**Expected Output:**
```
✅ Server running on http://localhost:5001
```

---

### Step 6: Start Frontend

**Terminal 2 (new terminal):**
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
Local: http://localhost:3001
```

---

## 🎯 Summary:

**Backend:**
- Port: **5001**
- URL: http://localhost:5001
- API: http://localhost:5001/api

**Frontend:**
- Port: **3001**
- URL: http://localhost:3001
- Connects to: http://localhost:5001/api

---

**After creating both .env files and restarting, everything should work!** ✅

