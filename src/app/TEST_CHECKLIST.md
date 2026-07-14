# ✅ MCRC Website - Complete Setup Checklist

## Current Status: ✅ READY TO TEST

Your Resend API key has been configured: `re_3evDAcKh_Q6pR8QqHuqpTjQS4GPCSpaeBe`

---

## Quick Test (Do This Now - 2 minutes)

### Test 1: Submit Contact Form
1. Scroll to the **Contact** section on your website
2. Fill out the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `09171234567`
   - Company: `Test Company`
   - Message: `This is a test submission`
3. Click **Send Message**
4. ✅ You should see: "Thank you for your message! We'll get back to you soon."

### Test 2: Check Email
1. Open your email inbox: `christian.canlubo@mcrctas.com`
2. Look for: **Subject: "New Contact Form Submission from Test User"**
3. ✅ Email should contain all the form details
4. ⚠️ **Check spam folder** if you don't see it in inbox

### Test 3: Admin Dashboard
1. Go to your website and add `#admin` to the URL
   - Example: `https://yoursite.com#admin`
2. Enter password: `mcrc2024admin`
3. Click **Login**
4. ✅ You should see your test submission in the list
5. Click on the submission to view full details
6. Try marking it as "read"
7. Try deleting it

---

## ⚠️ Important: Change Admin Password

**Current Password**: `mcrc2024admin` (Not secure!)

**To Change:**
1. Open file: `/components/AdminDashboard.tsx`
2. Find line 30: `const ADMIN_PASSWORD = "mcrc2024admin";`
3. Change to a secure password
4. Save the file

---

## 🎯 What's Working

✅ **Contact Form**
- Saves all submissions to database
- Validates required fields
- Shows loading state while submitting
- Displays success/error messages
- Clears form after submission

✅ **Email Notifications**
- Sends to: `christian.canlubo@mcrctas.com`
- From: `MCRC Contact Form <onboarding@resend.dev>`
- Professional HTML template
- Includes all submission details
- Manila timezone timestamps

✅ **Admin Dashboard**
- Password protected access via `#admin`
- View all submissions (newest first)
- "New" vs "Read" status badges
- Click-to-email and click-to-call
- Mark as read/unread
- Delete submissions
- Refresh to reload data
- Fully responsive design

---

## 📧 Email Configuration

### Current Setup (Free Tier)
- **Provider**: Resend
- **API Key**: Configured ✅
- **From Address**: `onboarding@resend.dev` (Resend default)
- **To Address**: `christian.canlubo@mcrctas.com`
- **Limit**: 100 emails/day (free tier)

### Optional: Custom Domain Email

Want to send from `noreply@mcrctas.com` instead?

1. **Add Domain in Resend**:
   - Log in to [resend.com](https://resend.com)
   - Go to **Domains** → **Add Domain**
   - Enter: `mcrctas.com`
   - Follow DNS verification steps

2. **Update Server Code**:
   - Edit: `/supabase/functions/server/index.tsx`
   - Line 70: Change from address:
     ```tsx
     from: "MCRC Contact Form <noreply@mcrctas.com>",
     ```

3. **Benefits**:
   - Professional sender address
   - Better email deliverability
   - Doesn't go to spam as often

---

## 🔍 Troubleshooting

### Email Not Received?

**Check 1: Spam Folder**
- Emails from `onboarding@resend.dev` often go to spam initially
- Mark as "Not Spam" to improve future delivery

**Check 2: Resend Dashboard**
- Log in to [dashboard.resend.com](https://dashboard.resend.com)
- Check **Logs** section for delivery status
- Look for any error messages

**Check 3: API Key**
- Verify the key is correct
- Should start with `re_`
- Check for any copy/paste errors

**Check 4: Browser Console**
- Open browser console (F12)
- Submit the form
- Look for any error messages
- Check server logs for "Email notification sent successfully"

### Admin Dashboard Won't Load?

**Check 1: URL Format**
- Must include `#admin` (e.g., `yoursite.com#admin`)
- Not `/admin` or `?admin`

**Check 2: Password**
- Default: `mcrc2024admin`
- Case sensitive
- No extra spaces

**Check 3: Browser Cache**
- Try hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Try incognito/private window

### Form Not Submitting?

**Check 1: Required Fields**
- Name, Email, and Message are required
- Email must be valid format

**Check 2: Network Connection**
- Check internet connection
- Look for error messages

**Check 3: Browser Console**
- Press F12 to open console
- Look for error messages in red
- Share these with support if needed

---

## 📱 Test on All Devices

After basic testing, verify on:
- ✅ Desktop browser
- ✅ Mobile phone (Chrome/Safari)
- ✅ Tablet
- ✅ Different browsers (Chrome, Firefox, Safari, Edge)

---

## 🚀 Going Live Checklist

Before using with real customers:

- [ ] Change admin password
- [ ] Test contact form
- [ ] Confirm email notifications work
- [ ] Test admin dashboard
- [ ] Bookmark admin URL
- [ ] Set up email filters for MCRC inquiries
- [ ] (Optional) Add custom domain to Resend
- [ ] Train team on admin dashboard
- [ ] Test on mobile devices
- [ ] Add admin URL to team documentation

---

## 📊 Daily Workflow

**Morning Routine:**
1. Visit admin dashboard (`yoursite.com#admin`)
2. Check for new submissions (🔵 "new" badge)
3. Click each to review details
4. Respond to inquiries via email/phone
5. Mark as "read" after responding

**Email Setup:**
1. Add filter in Gmail/Outlook for "MCRC Contact Form"
2. Label/folder for easy organization
3. Set up mobile notifications for urgent leads
4. Consider forwarding to team members

---

## 💡 Quick Tips

✅ **Response Time**: Aim for < 24 hours
✅ **Professional**: Use company email signature
✅ **Follow-up**: Set reminders for follow-ups
✅ **Archive**: Keep important leads, delete spam
✅ **Export**: Copy important details to your CRM
✅ **Monitor**: Check Resend dashboard weekly

---

## 📞 Need Help?

### Email Issues
- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Resend Dashboard: [dashboard.resend.com](https://dashboard.resend.com)
- Check spam folder first!

### Technical Issues
- Open browser console (F12)
- Check for error messages
- Verify internet connection

### Feature Requests
Want to add:
- Multiple admin users?
- Auto-reply emails?
- SMS notifications?
- CRM integration?
- Analytics dashboard?

Just ask!

---

## 🎉 You're All Set!

Your MCRC website is now fully functional with:
1. ✅ Professional contact form
2. ✅ Instant email notifications
3. ✅ Admin dashboard for managing leads

**Next Step**: Run the 2-minute test above to confirm everything works!

---

**Last Updated**: January 2025  
**API Key Status**: ✅ Configured  
**Email Recipient**: christian.canlubo@mcrctas.com  
**Admin Password**: mcrc2024admin (⚠️ Change this!)
