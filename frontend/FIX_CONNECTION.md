# 🔧 Fix Frontend-Backend Connection

## The Problem:
Your dashboard shows:
- ❌ "Failed to fetch count"
- ❌ "Offline" status
- ❌ Empty charts

This means frontend can't connect to backend.

---

## ✅ Quick Fix Steps:

### Step 1: Verify Backend is Running

**Check Terminal 1 (Backend):**
- Make sure you see: `✅ Server running on http://localhost:5000`
- If not, run: `npm start` in `backend` folder

### Step 2: Test Backend API Directly

**Open in your browser:**
```
http://localhost:5000/api/health
```

**You should see:**
```json
{"status":"ok","message":"Tech Pulse API is running"}
```

If this doesn't work, your backend isn't running properly.

### Step 3: Check Frontend API Configuration

**The frontend needs to know where backend is.**

Open `frontend/src/services/api.js` and check line 5:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

This should be `http://localhost:5000/api`

### Step 4: Create Frontend .env File (If Needed)

**In `frontend` folder, create `.env` file:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Then restart frontend:**
1. Stop frontend (Ctrl+C in terminal)
2. Run `npm start` again

---

## 🧪 Test Each Step:

1. **Backend health check:**
   - Browser: http://localhost:5000/api/health ✅

2. **Backend count endpoint:**
   - Browser: http://localhost:5000/api/count ✅

3. **Backend dashboard data:**
   - Browser: http://localhost:5000/api/dashboard ✅

If all three work in browser, then it's a frontend connection issue.

---

## 🔍 Common Issues:

### Issue 1: Backend Not Running
**Solution:** Start backend with `npm start` in `backend` folder

### Issue 2: Port Conflict
**Check if port 5000 is being used:**
```bash
# Windows:
netstat -ano | findstr :5000

# If something else is using it, change PORT in backend/.env
```

### Issue 3: CORS Error
**Check browser console (F12) for CORS errors**
- If you see CORS error, verify `FRONTEND_URL` in `backend/.env`
- Should be: `FRONTEND_URL=http://localhost:3000`

### Issue 4: Wrong API URL
**Verify frontend is using correct URL:**
- Check browser console (F12) → Network tab
- Look for failed requests to `/api/...`
- Should be going to `http://localhost:5000/api/...`

---

## ✅ After Fix, You Should See:

1. **Status changes to "Live"** (green dot)
2. **Counter shows your actual response count**
3. **Charts populate with data**
4. **All widgets show data**

---

**Let me know which step fails and I'll help fix it!**

