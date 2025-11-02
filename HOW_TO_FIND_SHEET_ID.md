# 🔍 How to Find Your Google Sheet ID

## Quick Method - From Google Form

### Step 1: Open Your Google Form
1. Go to your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSd2mKuc-y3WdqePrhSRibUPDAXvI9_foZYQqhfRkyMCJQ7mcA/viewform
2. You should see your form in **edit mode** (if not, click "Edit" or go to Google Forms dashboard)

### Step 2: Access the Response Sheet
1. In your Google Form editor, click on the **"Responses"** tab (top of the page)
2. You'll see a green spreadsheet icon 📊 that says "View responses in Sheets"
3. **Click on that icon** - it will open your Google Sheet

### Step 3: Get the Sheet ID from URL
Once the sheet opens, look at the URL in your browser:

```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0
                                      ^^^^^^^^^^^^^^^^
                                      This is your Sheet ID!
```

**Example:**
If your URL is:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/edit#gid=0
```

Then your Sheet ID is: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

---

## Alternative Method - From Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Look for a file named something like:
   - `TechPulse_Responses` (or whatever you named your form)
   - Or search for files created when you set up the form
3. Open the spreadsheet
4. Copy the Sheet ID from the URL (same as above)

---

## Quick Visual Guide

```
Google Form URL (what you have):
https://docs.google.com/forms/d/e/1FAIpQLSd2mKuc-y3WdqePrhSRibUPDAXvI9_foZYQqhfRkyMCJQ7mcA/viewform

Google Sheet URL (what you need):
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit#gid=0
                               ^^^^^^^^^^^^^^^^^^^^^^
                               Copy this part!
```

---

## ⚠️ Important Notes

- The **Form ID** and **Sheet ID** are **different**
- Your form ID is: `1FAIpQLSd2mKuc-y3WdqePrhSRibUPDAXvI9_foZYQqhfRkyMCJQ7mcA`
- But you need the **Sheet ID** which will be a different string
- The Sheet ID is typically 44 characters long (alphanumeric)

---

## ✅ Once You Have the Sheet ID

1. Go to `backend` folder
2. Open or create `.env` file
3. Add this line:
   ```env
   GOOGLE_SHEET_ID=your_actual_sheet_id_here
   ```
4. Replace `your_actual_sheet_id_here` with the ID you copied

---

## 🆘 Can't Find It?

If you can't find the sheet:

1. **Check if responses are being collected:**
   - Go to your form
   - Click "Responses" tab
   - If you see responses, the sheet exists

2. **The sheet might be in a different Google account:**
   - Make sure you're logged into the same Google account that created the form

3. **Create a new response sheet:**
   - In Form editor → Responses tab
   - Click the 3-dot menu (⋮)
   - Select "Unlink form" (if linked)
   - Then click "Select response destination" → "Create new spreadsheet"

---

**Still stuck?** Share what you see when you click "View responses in Sheets" and I'll help you identify it!

