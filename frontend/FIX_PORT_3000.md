# 🔧 Fix Port 3000 Already in Use

## Quick Fix Options:

### Option 1: Kill Process on Port 3000 (Recommended)

**In PowerShell:**
```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

**Then restart frontend:**
```bash
npm start
```

---

### Option 2: Use Different Port for Frontend

**Step 1: Set Port in Frontend**

Create/update `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
PORT=3001
```

**Step 2: Restart Frontend**

Stop and run:
```bash
npm start
```

Frontend will now run on **http://localhost:3001**

---

## 🎯 Recommended: Use Option 1

Kill the process and use port 3000 as normal.

---

**After fixing, your frontend should start successfully!** ✅

