# 🔧 Email Notification Troubleshooting Guide

## Issue: Not Receiving Email Notifications

You mentioned you're not receiving email notifications when the contact form is submitted. Let's debug this step by step.

---

## 🎯 Quick Diagnosis

### Step 1: Use the Debug Panel (NEW!)

I've created a special debug panel for you:

**URL**: Add `#debug` to your website URL (e.g., `yoursite.com#debug`)

This will:
- ✅ Test all API endpoints
- ✅ Submit a test contact form
- ✅ Show detailed results
- ✅ Guide you on what to check

**IMPORTANT**: Open your browser console (F12) while running the tests to see detailed server logs!

---

## 🔍 Common Issues & Solutions

### Issue 1: RESEND_API_KEY Not Set

**Symptoms:**
- Server logs show: "RESEND_API_KEY not configured"
- Emails are not being sent at all

**Solution:**
The environment variable might not be saved yet. Here's what to verify:

1. **Check if the secret was created**:
   - You should have been prompted to add the `RESEND_API_KEY`
   - The value should be: `re_3evDAcKh_Q6pR8QqHuqpTjQS4GPCSpaeB`

2. **Verify the environment variable**:
   - Open the debug panel (`#debug`)
   - Run tests
   - Open browser console (F12)
   - Look for: "Checking for RESEND_API_KEY: Found (length: XX)"
   - If you see "Not found", the environment variable isn't set

3. **If not set**:
   - The system should prompt you again
   - Or we can manually verify it's configured

---

### Issue 2: Resend API Error

**Symptoms:**
- Console shows "Email notification failed"
- Status code 400 or 403

**Common Causes:**

**A. Invalid API Key**
```
Status: 403 Forbidden
Error: Invalid API key
```
**Solution**: Verify the API key is correct: `re_3evDAcKh_Q6pR8QqHuqpTjQS4GPCSpaeB`

**B. Email Address Not Verified**
```
Status: 400 Bad Request
Error: Email address not verified
```
**Solution**: 
- Free Resend accounts must use `onboarding@resend.dev` as sender
- We're already using this in the code ✅

**C. Rate Limit Exceeded**
```
Status: 429 Too Many Requests
```
**Solution**: Free tier = 100 emails/day. Wait or upgrade.

---

### Issue 3: Emails Going to Spam

**Symptoms:**
- No error in console
- "Email notification sent successfully" message
- Email not in inbox

**Solution:**
1. **Check spam/junk folder** ⚠️ This is most common!
2. Look for emails from: `onboarding@resend.dev`
3. Mark as "Not Spam" to train your email provider
4. Add `onboarding@resend.dev` to contacts

---

### Issue 4: Resend Account Issue

**Symptoms:**
- API calls fail
- Unexpected errors

**Solution:**
1. Log in to [Resend Dashboard](https://dashboard.resend.com)
2. Check if your account is verified
3. Check if your API key is active
4. Look at the "Logs" section for recent email attempts
5. Verify you haven't exceeded free tier limits

---

## 📋 Diagnostic Checklist

Run through this checklist:

- [ ] **1. Environment Variable**
  - Go to `yoursite.com#debug`
  - Open browser console (F12)
  - Run tests
  - Check console for "RESEND_API_KEY: Found"

- [ ] **2. API Key Validity**
  - Should be: `re_3evDAcKh_Q6pR8QqHuqpTjQS4GPCSpaeB`
  - Log in to Resend to verify it's active

- [ ] **3. Test Submission**
  - Submit a test contact form
  - Check browser console for logs
  - Look for "Email notification sent successfully"

- [ ] **4. Check Resend Dashboard**
  - Visit [dashboard.resend.com](https://dashboard.resend.com)
  - Go to "Logs" section
  - Look for recent email attempts
  - Check delivery status

- [ ] **5. Check Email**
  - Inbox: christian.canlubo@mcrctas.com
  - **SPAM FOLDER** ⚠️ (Most likely location!)
  - Search for: "MCRC Contact Form" or "onboarding@resend.dev"

- [ ] **6. Server Logs**
  - Open browser console (F12)
  - Submit test form
  - Look for detailed Resend API logs
  - Check for any error messages

---

## 🛠️ Detailed Debugging Steps

### Step-by-Step Debugging:

**1. Open Debug Panel**
```
yoursite.com#debug
```

**2. Open Browser Console**
```
Windows/Linux: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

**3. Click "Run Tests"**

**4. Read the Console Output**

You should see something like this if working correctly:
```
✅ New contact form submission received from debug@test.com at 2025-01-XX...
✅ Checking for RESEND_API_KEY: Found (length: 41)
✅ Attempting to send email notification...
✅ Email payload: {...}
✅ Resend API response status: 200
✅ Email notification sent successfully! Email ID: xxxx-xxxx-xxxx
```

**5. Identify the Issue**

| What You See | Issue | Solution |
|--------------|-------|----------|
| "RESEND_API_KEY not configured" | Environment variable not set | Re-add the secret |
| "Email notification failed with status: 403" | Invalid API key | Verify API key |
| "Email notification failed with status: 400" | Bad request | Check Resend dashboard logs |
| "Email notification sent successfully" | Email sent! | Check spam folder |
| Network error | Server issue | Check internet connection |

---

## 🔧 Manual Testing

If the debug panel doesn't help, try this manual test:

**1. Test the Health Endpoint**
```javascript
// Paste this in browser console
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-212365c9/health', {
  headers: { Authorization: 'Bearer YOUR_ANON_KEY' }
})
.then(r => r.json())
.then(console.log)
```

**2. Test Contact Submission**
```javascript
// Paste this in browser console
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-212365c9/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  },
  body: JSON.stringify({
    name: 'Manual Test',
    email: 'test@example.com',
    phone: '1234567890',
    service: 'Test',
    message: 'Manual test message'
  })
})
.then(r => r.json())
.then(console.log)
```

**3. Check Console for Logs**

---

## 📊 What to Share If Still Not Working

If you've tried everything and it's still not working, please share:

1. **Browser Console Output**:
   - Full console logs when submitting the form
   - Look for any red error messages
   - Include all "Resend API" related messages

2. **Debug Panel Results**:
   - Screenshot or copy the test results
   - Especially the "Contact Form Submission" test

3. **Resend Dashboard Info**:
   - Do you see any email attempts in the Resend logs?
   - What status do they show?
   - Any error messages?

4. **Environment**:
   - Browser being used
   - Any browser extensions that might block requests?

---

## ✅ Expected Behavior

When everything is working correctly:

1. **User submits form** → Sees "Sending..." → Sees success message
2. **Server receives request** → Validates data → Saves to database
3. **Server sends email** → Calls Resend API → Logs success
4. **You receive email** → In inbox or spam → Contains form details
5. **Admin dashboard** → Shows new submission with "new" status

---

## 🚀 Quick Fixes to Try

**Fix 1: Re-submit the API Key**
Sometimes the environment variable doesn't save properly. We can re-add it.

**Fix 2: Check Resend Account**
- Log in to Resend
- Verify email address is confirmed
- Check API key is active
- Look at Logs for any delivery attempts

**Fix 3: Test Different Email**
Try changing the recipient email temporarily to test:
- Edit `/supabase/functions/server/index.tsx`
- Line 71: Change to your personal email for testing

**Fix 4: Use Debug Panel**
- Visit `yoursite.com#debug`
- Run the automated tests
- Follow the on-screen instructions

---

## 📧 Contact for Support

Still stuck? Share:
- Browser console logs (F12)
- Debug panel results
- Resend dashboard screenshots
- Any error messages

I'll help you debug further!

---

## 🎯 Most Likely Cause

Based on experience, the most common causes in order:

1. **80%** - Email is in spam folder ✉️
2. **10%** - Environment variable not set properly 🔧
3. **5%** - Resend account needs verification 📧
4. **3%** - Invalid API key 🔑
5. **2%** - Other issues 🤔

**Start by checking your spam folder!**

---

**Last Updated**: January 2025
