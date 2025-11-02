# ✅ Create Your .env File - Step by Step

Based on your JSON credentials, here's exactly what to put in your `.env` file:

## 📝 Step 1: Create the File

1. Navigate to the `backend` folder
2. Create a new file named `.env` (just `.env` - no extension!)
   - In Windows: You might need to create it as `.env.` (with a dot at the end) or use a code editor
   - Or create `env.txt` then rename it to `.env`

## 📝 Step 2: Copy This Exact Content

Open your `.env` file and paste this (replace `PASTE_YOUR_SHEET_ID_HERE` with your actual Sheet ID):

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=PASTE_YOUR_SHEET_ID_HERE
GOOGLE_SERVICE_ACCOUNT_EMAIL=techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsReaQs7a+xzQW\ncyJoJliWBp/mnIY0j6z5uJUcnICruA6lI7V559YopTaeUNTEvVVTlHxIVR7aNkv9\nlyRsvvtc5Gr0SQw6VedSLqE248FgPZP3IjghuYz/NqcyDzvbwDsojTSDI3f+69V0\nWihroSw35Hc4cPsfCwkHQ3gj+NQEBlt0iX1UJyjK47eflSXM7SND4auDfDHaGlGk\na2grdKDv4ZbzPs25GtyUw2PAzvdqhaofSyQW+f+CN9vSRzM602dHBpricDIDDuwW\nGTWiMUzkcDlb/7yCzM2X+GSQOFY2rUVECK/Kfsbt0hqv0PmV3ZKBmJlIOTzQm6Ai\n/AGtZhBLAgMBAAECggEADTAYs3Eeh0JGqYVM1/4/f9Sn/wZye6mYC1HnEFamvv6L\nGHdAWEG4MkpbgQkdEKaR1qEiVoM1pmzLqnEcl7qTEYxm56aD6h9TYwYwzzvmPNDZ\n9+xFscc7lPoBGKLz6SGxJayRnYxkjj5Ni+eu+nZPJUQ3IDn972Vv3n96vf45dMlL\nUVPkZ2wHMiFVajHSU2Ea773s9lpRtg0uQwuUErEPgEkAyLEHYSww/VNIeT4FkzBy\nb0vLd8MLqfrr5k2xT7oKYP2pWhvGh0bK6UsEBYdvN1/MVRlkMSojWxCrg1koOp1M\ngOOfqGvdbB8g3GlHpMsSWk4q6BzT+TpL/Vekurub4QKBgQDyU8/L1t9DgQ4z/gJ5\nKd1dxL7rRAPUo8F9cdP69Q4yg0KcTcy1bGsCd1C3gPl0e4M3RBlk/R1shMgMTsj6\nTIFhF2S2kMdv9RoxTWrntS8RG62kucyU0lzcFmDz4ZPR8Eahu7e15aL4u6b+4gJr\n2iaHqNTzd/QWgE3oG9wtGYoLOwKBgQC1/jiCBMkDIX7/Fp2eVttm88oU/R8QgCMH\n7U4/oc3aLLXIzxfGPRg+dTMapNdblNg3x9fzrlKTpuq9VjPLWwo5d1KURSa1wSUK\nygLj6nwzK6YSXj8ho8QPPoqaXrNwIZV5oVAUrjvLVtQO6u+Qo1a/dhp76A/fo523\no1XQEWseMQKBgBV8jvlBBSzkHZFInYmGx8UPs+oCbuCE4Jwx4pzm66pY7ygS0ero\nQRjH4ZVTz0qfxQO6exH0S46au24z8igXboVgYKK7daOctQTYG3mOHC1FKgFoJBay\nDF/LcC9Puh6sUmb20RRE1018vhLtkU9k2XO/6Zno8fCo0b+Z8Mzi7dWPAoGAcUcD\nNSp1U5WNzojtIpk9hx9HMTk8FLEtHMoAYmr8Dki1/X+pdKKibH3WiUcBJOfIjS++\notZmX7ENezwkkPbhrlMu+0rvhUHrJIQIuIRDOjZ48AXpla6xYiuzadJ4Lds5hrN5\nfOXWIgKxi3eAFa8VV6bTZTxUZQcaLCtmRlQRMIECgYEA67iDqMcBCVZnuJKkmVRJ\nBtODPnKaQ4ALU1S6w4Vqqmtss15Wdm1pZtGuiezRwTRrelxz+znOp74f4Uzojun6\ns1EOPOiFvRB4PEB334MT+mCdvNTSJ402AWT7bX13qY96RcRw7/G/nW8rZvsavyq5\ncApk+qcWECppiyr73N68Gxo=\n-----END PRIVATE KEY-----\n"

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## ⚠️ Important Notes:

1. **GOOGLE_SHEET_ID**: You still need to get this from your Google Sheet URL (see `HOW_TO_FIND_SHEET_ID.md`)

2. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: ✅ Already filled in from your JSON
   - Value: `techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com`

3. **GOOGLE_PRIVATE_KEY**: ✅ Already filled in from your JSON
   - **IMPORTANT**: Keep the quotes `""` around it
   - **IMPORTANT**: Keep all `\n` characters (don't replace them with actual line breaks)
   - This is already correctly formatted above

4. **Make sure the file is named exactly `.env`** (no `.txt` or other extension)

## ✅ Next Steps After Creating .env:

1. **Get your Sheet ID** (follow `HOW_TO_FIND_SHEET_ID.md`)
2. **Replace `PASTE_YOUR_SHEET_ID_HERE`** with your actual Sheet ID
3. **Share your Google Sheet** with this email: `techpulse-service@techpulse-dashboard-476909.iam.gserviceaccount.com`
   - Open your Google Sheet → Click "Share" → Paste the email → Give "Editor" access
4. **Test the backend**: Run `npm install` then `npm start` in the backend folder

## 🔒 Security Reminder:

- ✅ Never commit the `.env` file to Git (it's already in `.gitignore`)
- ✅ Don't share your `.env` file publicly
- ✅ The JSON key file you downloaded should be kept secure

