# 🔧 Update Port to 5001 - Step by Step

## Step 1: Update Backend .env

1. **Open** `backend/.env` file
2. **Find** the line: `PORT=5000`
3. **Change** it to: `PORT=5001`
4. **Save** the file

Your `backend/.env` should now have:
```env
GOOGLE_SHEET_ID=1gGV_sdK22TbjFUmfgieDigpt29WPuz_4HPtHuHgidpo
GOOGLE_SERVICE_ACCOUNT_EMAIL=techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
GOOGLE_CREDENTIALS_PATH=./credentials.json
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## Step 2: Create Frontend .env

1. **Go to** `frontend` folder
2. **Create** a new file named `.env`
3. **Add** this line:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```
4. **Save** the file

---

## Step 3: Restart Both Servers

**Terminal 1 (Backend):**
```bash
# Stop if running (Ctrl+C)
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
# Stop if running (Ctrl+C)
cd frontend
npm start
```

---

## ✅ That's It!

Your backend will now run on port **5001** and frontend will connect to it!

---

**After restarting, your dashboard should work!** 🎉

