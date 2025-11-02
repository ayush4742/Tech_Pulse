# 🚀 Starting Your Tech Pulse Dashboard

## ✅ Backend is Working!

Your backend connection test passed, so now let's get everything running!

---

## Step 1: Start Backend Server

**Keep your current terminal open** and run:

```bash
npm start
```

You should see:
```
🚀 Starting Tech Pulse Backend...
📊 Initializing Google Sheets connection...
✅ Google Sheets API initialized successfully
✅ Server running on http://localhost:5000
```

**Keep this terminal running!** Don't close it. The server needs to keep running.

---

## Step 2: Open New Terminal for Frontend

1. **Open a NEW terminal window** (don't close the backend one!)
2. Navigate to frontend:
   ```bash
   cd frontend
   ```

3. **Install dependencies** (first time only):
   ```bash
   npm install
   ```
   (This takes 2-3 minutes - wait for it to finish)

4. **Start frontend:**
   ```bash
   npm start
   ```

5. **Your browser should automatically open** to:
   ```
   http://localhost:3000
   ```

---

## 🎉 What You Should See:

Your dashboard with:
- ✅ Real-time counter showing your response count
- ✅ Tech usage charts
- ✅ Learning interests
- ✅ AI usage stats
- ✅ Location distribution
- ✅ ML predictions

---

## 📊 Testing Real-Time Updates:

1. **Submit a new response** to your Google Form
2. **Wait 5-10 seconds**
3. **Watch the dashboard update automatically!** ✨

---

## 🐛 If Frontend Doesn't Load:

1. **Check backend is still running** (terminal 1)
2. **Check frontend terminal** for errors
3. **Verify backend URL** - test: http://localhost:5000/api/health
4. **Check browser console** (F12) for errors

---

## 🎯 You're Done!

Once both are running:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

Your Tech Pulse dashboard is live! 🎊

