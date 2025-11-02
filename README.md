# 🚀 Tech Pulse - Real-Time Technology Trend Analyzer

A live dashboard that analyzes technology trends from Google Form responses in real-time, featuring beautiful visualizations, AI usage tracking, and ML-powered predictions.

## ✨ Features

- **📊 Real-Time Dashboard** - Live updates every 5 seconds
- **🔥 Tech Popularity Charts** - See what technologies people are using
- **🎯 Emerging Trends** - Top 5 technologies people plan to learn
- **🤖 AI Usage Tracker** - Monitor AI tool adoption rates
- **🌍 Geo Distribution** - See where responses are coming from
- **📈 ML Predictions** - Forecast next month's trending technologies
- **🌙 Dark Mode** - Beautiful dark theme with smooth animations

## 🏗️ Project Structure

```
tech-pulse/
├── backend/              # Node.js/Express API
│   ├── config/          # Google Sheets configuration
│   ├── services/        # Business logic
│   ├── routes/          # API endpoints
│   └── server.js        # Main server file
├── frontend/            # React dashboard
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service
│   │   └── App.js       # Main app
│   └── public/
├── ml/                  # ML prediction models
│   └── train.py         # Training script
└── README.md
```

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for ML features)
- Google Cloud account (for Sheets API)

### Step 1: Set Up Google Sheets API

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** (or use existing)
3. **Enable Google Sheets API:**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. **Create a Service Account:**
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name it (e.g., "tech-pulse-sheets")
   - Click "Create and Continue"
   - Grant "Editor" role (or custom role with Sheets access)
   - Click "Done"

5. **Create JSON Key:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key" > Choose "JSON"
   - Download the JSON file

6. **Share Google Sheet with Service Account:**
   - Open your Google Sheet (the one with form responses)
   - Click "Share" button
   - Paste the **service account email** (from the JSON file, it's the `client_email` field)
   - Give it "Editor" access
   - Click "Share"

7. **Get Your Sheet ID:**
   - Open your Google Sheet
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

### Step 2: Configure Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file:**
   ```env
   GOOGLE_SHEET_ID=your_sheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   **How to get values from JSON key file:**
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Copy `client_email` from JSON
   - `GOOGLE_PRIVATE_KEY`: Copy `private_key` from JSON (keep the quotes and \n characters)
   - `GOOGLE_SHEET_ID`: From your Google Sheet URL

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the backend:**
   ```bash
   npm start
   ```

   You should see:
   ```
   ✅ Google Sheets API initialized successfully
   ✅ Server running on http://localhost:5000
   ```

### Step 3: Configure Frontend

1. **Navigate to frontend folder:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend:**
   ```bash
   npm start
   ```

   The dashboard will open at `http://localhost:3000`

### Step 4: Test It Out!

1. **Submit a test response** to your Google Form
2. **Watch the dashboard update** - it should refresh every 5 seconds
3. **Verify all charts are showing data**

## 📡 API Endpoints

- `GET /api/health` - Health check
- `GET /api/count` - Total response count
- `GET /api/dashboard` - All aggregated data
- `GET /api/tech-usage` - Technology usage statistics
- `GET /api/learning-interests` - Top learning interests
- `GET /api/ai-usage` - AI usage statistics
- `GET /api/locations` - Location distribution
- `GET /api/ml/predictions` - ML predictions

## 🎨 Customization

### Change Refresh Interval

In frontend components, modify the `refreshInterval` prop (in milliseconds):

```jsx
<RealTimeCounter refreshInterval={10000} /> // 10 seconds
```

### Add New Charts

1. Create a new component in `frontend/src/components/`
2. Use `apiService` to fetch data
3. Add it to `App.js`

### Styling

Modify CSS variables in `frontend/src/index.css`:

```css
:root {
  --bg-primary: #0f172a;
  --accent: #3b82f6;
  /* ... */
}
```

## 🤖 ML Predictions (Optional)

1. **Install Python dependencies:**
   ```bash
   cd ml
   pip install pandas scikit-learn numpy
   ```

2. **Train model:**
   ```bash
   python train.py
   ```

3. **Model will be saved** as `ml/model.pkl`

## 🐛 Troubleshooting

### Backend Issues

- **"Google Sheets API not initialized"**
  - Check your `.env` file has correct credentials
  - Verify service account email has access to the sheet
  - Ensure Google Sheets API is enabled in Cloud Console

- **"Failed to fetch dashboard data"**
  - Check if Google Sheet ID is correct
  - Verify sheet name is "Sheet1" (or update in `sheetsService.js`)

### Frontend Issues

- **"Failed to fetch count"**
  - Ensure backend is running on port 5000
  - Check CORS settings in backend
  - Verify `REACT_APP_API_URL` in frontend `.env`

### Common Issues

- **No data showing:** Make sure your Google Sheet has data and column headers match expected format
- **CORS errors:** Add your frontend URL to `FRONTEND_URL` in backend `.env`
- **Port already in use:** Change `PORT` in backend `.env`

## 📝 Google Form Setup Tips

For best results, use these exact column names (case-insensitive):

- `Timestamp`
- `Email address`
- `Full Name`
- `Which Age group you belong to?`
- `College / Current Company name?`
- `Which tools or frameworks do you use in your daily work?`
- `Which of the following technology areas are you interested in?`
- `Your target domain for new learning in next 1-2 years?`

## 🚀 Deployment

### Backend (Railway/Heroku)

1. Set environment variables in your hosting platform
2. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend (Vercel/Netlify)

1. Set `REACT_APP_API_URL` to your deployed backend URL
2. Deploy:
   ```bash
   npm run build
   # Upload build folder or connect to Vercel/Netlify
   ```

## 📄 License

MIT

## 🙏 Credits

Built with ❤️ for TechPulse

---

**Need help?** Check the troubleshooting section or review the code comments for detailed explanations.

