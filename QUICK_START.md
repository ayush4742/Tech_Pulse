# ⚡ Quick Start - Get Running in 10 Minutes

Follow these steps to get Tech Pulse running ASAP!

## 📋 Prerequisites Check

- [ ] Node.js installed? Run: `node --version` (should be v16+)
- [ ] Google Form created with responses? ✅ (You have this!)
- [ ] Google account? (for Google Cloud setup)

## 🚀 3-Step Setup

### 1️⃣ Google Cloud Setup (5 min)

1. **Go to:** https://console.cloud.google.com/
2. **Create project** → Name it "tech-pulse"
3. **Enable Sheets API:**
   - APIs & Services → Library → Search "Sheets API" → Enable
4. **Create Service Account:**
   - IAM & Admin → Service Accounts → Create Service Account
   - Name: `tech-pulse-sheets`
   - Role: Editor
5. **Download JSON key:**
   - Click service account → Keys → Add Key → JSON → Download
6. **Share your Google Sheet:**
   - Open Google Sheet → Share → Paste service account email → Editor

### 2️⃣ Backend Setup (3 min)

```bash
# Navigate to backend
cd backend

# Create .env file (copy this template)
cat > .env << EOF
GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
GOOGLE_SERVICE_ACCOUNT_EMAIL=email_from_json@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT=5000
FRONTEND_URL=http://localhost:3000
EOF

# Edit .env and fill in:
# - GOOGLE_SHEET_ID: from Google Sheet URL (between /d/ and /edit)
# - GOOGLE_SERVICE_ACCOUNT_EMAIL: from downloaded JSON (client_email)
# - GOOGLE_PRIVATE_KEY: from downloaded JSON (private_key - keep quotes!)

# Install and start
npm install
npm start
```

✅ Should see: `✅ Server running on http://localhost:5000`

### 3️⃣ Frontend Setup (2 min)

```bash
# Open NEW terminal, navigate to frontend
cd frontend

# Install and start
npm install
npm start
```

✅ Browser opens at `http://localhost:3000` with dashboard!

## 🎯 That's It!

Your dashboard should now be showing:
- ✅ Real-time counter with your response count
- ✅ Tech usage charts
- ✅ Learning interests
- ✅ AI usage stats
- ✅ Location distribution
- ✅ ML predictions

## 🐛 Quick Troubleshooting

**Backend won't start?**
- Check `.env` file exists and has correct values
- Verify service account email shared with Google Sheet

**Frontend shows errors?**
- Make sure backend is running on port 5000
- Check browser console (F12) for details

**No data showing?**
- Verify Google Sheet has data
- Check column names match expected format
- Test API: `http://localhost:5000/api/count`

## 📚 Need More Help?

- **Detailed setup:** See `SETUP_GUIDE.md`
- **Full documentation:** See `README.md`
- **Column names:** Check README for expected Google Form fields

---

**Pro Tip:** Submit a new form response and watch the dashboard update in real-time! 🎉

