# 🧪 Test Your Backend Setup

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Start the Server
```bash
npm start
```

## ✅ Expected Output (Success):
```
🚀 Starting Tech Pulse Backend...
📊 Initializing Google Sheets connection...
✅ Google Sheets API initialized successfully
✅ Server running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api

📋 Available endpoints:
   GET /api/health - Health check
   GET /api/count - Total response count
   GET /api/dashboard - All aggregated data
   ...
```

## ❌ If You See Errors:

### Error: "Error initializing Google Sheets API"
**Possible causes:**
1. Google Sheet not shared with service account
   - ✅ Fix: Share your sheet with `techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com`
2. Wrong Sheet ID
   - ✅ Fix: Double-check Sheet ID in `.env` matches your sheet URL
3. Private key formatting issue
   - ✅ Fix: Make sure private key has quotes and `\n` characters

### Error: "Cannot find module"
**Fix:**
```bash
cd backend
npm install
```

## Step 3: Test API Endpoints

Open these URLs in your browser:

1. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```
   Should return: `{"status":"ok","message":"Tech Pulse API is running"}`

2. **Get Response Count:**
   ```
   http://localhost:5000/api/count
   ```
   Should return: `{"count":16,"timestamp":"..."}` (your actual count)

3. **Get Dashboard Data:**
   ```
   http://localhost:5000/api/dashboard
   ```
   Should return JSON with all your dashboard data

## Step 4: If Everything Works ✅

1. **Keep backend running** (don't close the terminal)
2. **Open new terminal** for frontend
3. **Navigate to frontend folder:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Dashboard should open at `http://localhost:3000`

## 🎉 Success Indicators:

- ✅ Backend starts without errors
- ✅ `/api/health` returns OK
- ✅ `/api/count` shows your response count
- ✅ Frontend loads with charts showing data

---

**If you encounter any errors, share the error message and I'll help fix it!**

