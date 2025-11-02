# 🔧 Fix Port 5000 Already in Use

## Quick Fix (Choose One):

### Option 1: Kill Process on Port 5000 (Windows PowerShell)

**Run this command:**
```powershell
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

**Or step by step:**

1. **Find the process:**
   ```powershell
   Get-NetTCPConnection -LocalPort 5000
   ```

2. **Kill it (replace PID with actual number):**
   ```powershell
   Stop-Process -Id <PID> -Force
   ```

3. **Then start backend:**
   ```bash
   npm start
   ```

---

### Option 2: Use Different Port (Easier)

**Step 1: Change Backend Port**

1. Open `backend/.env`
2. Change to:
   ```env
   PORT=5001
   ```

**Step 2: Update Frontend**

1. Create `frontend/.env` file (if it doesn't exist)
2. Add:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

**Step 3: Restart Both**

- Backend: Stop and run `npm start`
- Frontend: Stop and run `npm start`

---

## 🎯 Recommended: Use Option 2 (Different Port)

It's faster and you won't have this issue again!

---

**After fixing, your backend should start successfully!** ✅

