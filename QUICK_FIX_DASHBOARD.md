# 🔧 Quick Fix: Dashboard Not Showing Data

## The Problem:
- ❌ "Failed to fetch count"
- ❌ "Offline" status
- ❌ Empty charts

**This means frontend can't reach backend.**

---

## ✅ Step-by-Step Fix:

### Step 1: Verify Backend is Running

**Check Terminal 1 (Backend):**
- You should see: `✅ Server running on http://localhost:5000`
- If not, run: `cd backend` then `npm start`

### Step 2: Test Backend in Browser

**Open these URLs in your browser:**

1. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```
   Should show: `{"status":"ok","message":"Tech Pulse API is running"}`

2. **Count Endpoint:**
   ```
   http://localhost:5000/api/count
   ```
   Should show: `{"count":16,"timestamp":"..."}` (your actual count)

3. **Dashboard Data:**
   ```
   http://localhost:5000/api/dashboard
   ```
   Should show JSON with all your data

**If these don't work:** Your backend isn't running properly.

### Step 3: Check Browser Console

**In your dashboard (http://localhost:3000):**

1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for **red errors**
4. Common errors:
   - `Network Error` → Backend not running
   - `CORS error` → Backend CORS not configured
   - `Failed to fetch` → Connection issue

### Step 4: Check Network Tab

**In Developer Tools:**
1. Click **Network** tab
2. Refresh the page (F5)
3. Look for requests to `/api/...`
4. Click on failed requests (red)
5. Check the error message

---

## 🔧 Common Fixes:

### Fix 1: Backend Not Running
```bash
# In backend folder:
npm start
```

### Fix 2: Wrong API URL
**Create `frontend/.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```
**Then restart frontend** (stop with Ctrl+C, run `npm start` again)

### Fix 3: CORS Error
**Check `backend/.env` has:**
```env
FRONTEND_URL=http://localhost:3000
```
**Then restart backend**

### Fix 4: Port Already in Use
**If port 5000 is busy:**
- Change `PORT=5001` in `backend/.env`
- Update `frontend/.env` to `REACT_APP_API_URL=http://localhost:5001/api`
- Restart both

---

## ✅ After Fix, You Should See:

1. **Status changes to "Live"** (green dot)
2. **Counter shows your response count**
3. **Charts populate with data**
4. **No errors in console**

---

## 🧪 Quick Test Checklist:

- [ ] Backend terminal shows "Server running on http://localhost:5000"
- [ ] http://localhost:5000/api/health works in browser
- [ ] http://localhost:5000/api/count works in browser
- [ ] Frontend shows "Live" status (not "Offline")
- [ ] No red errors in browser console (F12)
- [ ] Network tab shows successful API requests

---

**Share what you see when you test the backend URLs, and I'll help fix it!**

