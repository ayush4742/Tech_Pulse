# 🔧 Fix: Port 5000 Already in Use

## The Error:
```
Error: listen EADDRINUSE: address already in use :::5000
```

This means something else is already using port 5000.

---

## ✅ Solution 1: Kill the Process Using Port 5000 (Recommended)

### For Windows (PowerShell):

**Find the process:**
```powershell
netstat -ano | findstr :5000
```

This will show something like:
```
TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       12345
```

The last number (12345) is the Process ID (PID).

**Kill the process:**
```powershell
taskkill /PID 12345 /F
```
(Replace 12345 with your actual PID)

**Then try starting backend again:**
```bash
npm start
```

---

## ✅ Solution 2: Use a Different Port (Alternative)

**Change backend port:**

1. Open `backend/.env` file
2. Change:
   ```env
   PORT=5001
   ```
   (Instead of 5000, use 5001)

3. Open `frontend/.env` file (create if it doesn't exist)
4. Add:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

5. Restart both backend and frontend

---

## 🎯 Quick Command (One-liner):

**Windows PowerShell:**
```powershell
netstat -ano | findstr :5000 | ForEach-Object { $_.Split()[-1] } | ForEach-Object { taskkill /PID $_ /F }
```

This automatically finds and kills the process using port 5000.

---

## 🔍 Check What's Using the Port:

**To see what process is using port 5000:**
```powershell
netstat -ano | findstr :5000
```

**Then check the process name:**
```powershell
tasklist | findstr <PID>
```
(Replace <PID> with the number you got)

---

**After killing the process, your backend should start successfully!** ✅

