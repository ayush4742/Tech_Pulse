# 🔧 Create Frontend .env File

## Your backend is running on port 5001, but frontend doesn't know!

## ✅ Quick Fix:

### Step 1: Create Frontend .env File

1. **Go to** `frontend` folder
2. **Create** a new file named `.env` (just `.env` - no extension!)
3. **Copy and paste** this:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```
4. **Save** the file

### Step 2: Restart Frontend

1. **Stop frontend** (Ctrl+C in frontend terminal)
2. **Run again:**
   ```bash
   npm start
   ```

### Step 3: Check Dashboard

Your dashboard at `http://localhost:3000` should now:
- ✅ Show "Live" status (not "Offline")
- ✅ Display your response count
- ✅ Show charts with data

---

## 🔍 Verify It's Working:

**In browser, open:** http://localhost:5001/api/health

Should show: `{"status":"ok","message":"Tech Pulse API is running"}`

If this works but dashboard still shows offline, check browser console (F12) for errors.

---

**After creating the .env file and restarting frontend, your dashboard should connect!** ✅

