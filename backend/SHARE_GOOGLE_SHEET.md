# 🔐 How to Share Google Sheet with Service Account

## The Error You're Seeing:
```
❌ Error: The caller does not have permission
```

This means your credentials are working, but the Google Sheet isn't shared with the service account.

---

## ✅ Solution: Share Your Google Sheet

### Step-by-Step:

1. **Open Your Google Sheet:**
   - Go to: https://docs.google.com/spreadsheets/d/1gGV_sdK22TbjFUmfgieDigpt29WPuz_4HPtHuHgidpo/edit
   - Or open it from your Google Drive

2. **Click the "Share" Button:**
   - Look for the green **"Share"** button in the top-right corner
   - Click it

3. **Add the Service Account Email:**
   - In the "Add people and groups" field, paste this email:
   ```
   techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
   ```

4. **Set Permission to "Editor":**
   - Make sure the dropdown shows **"Editor"** (not "Viewer")
   - This allows the service account to read your sheet data

5. **Important - Uncheck "Notify people":**
   - Uncheck the box that says "Notify people"
   - (Service accounts don't have email, so notifications don't work)

6. **Click "Share":**
   - Click the blue **"Share"** button

7. **Verify:**
   - You should see the service account email listed in the sharing dialog
   - It should show "Editor" permission

---

## 🧪 Test Again

After sharing, run the test again:

```bash
cd backend
node test-connection.js
```

You should now see:
```
✅ Successfully fetched data from sheet!
   Headers: X columns found
```

---

## 🎯 Quick Checklist:

- [ ] Google Sheet is open
- [ ] Clicked "Share" button
- [ ] Added email: `techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com`
- [ ] Set permission to "Editor"
- [ ] Unchecked "Notify people"
- [ ] Clicked "Share"
- [ ] Service account appears in sharing list

---

## 💡 Why This Happens:

- Your **credentials are correct** (JSON file is working)
- Your **API connection is successful** 
- But Google Sheets requires explicit sharing even with service accounts
- This is a security feature - sheets are private by default

---

**After sharing, your backend should work perfectly!** 🚀

