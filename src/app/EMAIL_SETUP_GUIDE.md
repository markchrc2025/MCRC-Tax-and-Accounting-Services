# 📧 Email Notification Setup Guide

## 🚨 **Why You're Not Receiving Emails**

Your contact form is working perfectly and saving all submissions, but **Resend requires email verification** when using their test email address (`onboarding@resend.dev`).

## ✅ **Quick Fix: Verify Your Email (5 Minutes)**

### Step-by-Step Instructions:

1. **Go to Resend Dashboard**
   - Visit: https://resend.com/emails
   - Log in with your Resend account

2. **Verify Your Email Address**
   - Click **"Verify Email"** or **"Add Email"** button
   - Enter: `christian.canlubo@mcrctas.com`
   - Click **"Send Verification Email"**

3. **Check Your Inbox**
   - Open your email: `christian.canlubo@mcrctas.com`
   - Look for an email from Resend
   - Click the verification link

4. **Test the Contact Form**
   - Once verified, go to your website
   - Submit a test message through the contact form
   - You should receive the email notification! 🎉

---

## 🎯 **Better Solution: Add Custom Domain (Recommended)**

For a more professional setup, add your custom domain:

### Step-by-Step Instructions:

1. **Go to Resend Domains**
   - Visit: https://resend.com/domains
   - Click **"Add Domain"**

2. **Add Your Domain**
   - Enter: `mcrctas.com`
   - Click **"Add"**

3. **Configure DNS Records**
   - Resend will show you DNS records to add
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the following DNS records:
     - SPF record (TXT)
     - DKIM record (TXT)
     - DMARC record (TXT)

4. **Wait for Verification**
   - DNS changes can take up to 48 hours
   - Usually works within 1-2 hours
   - Resend will verify automatically

5. **Update Your Code**
   - Once verified, I'll update the "from" email to:
   - `MCRC Contact Form <noreply@mcrctas.com>`

---

## 🔍 **How to Check if Emails Are Working**

### Method 1: Test the Contact Form
1. Go to your website
2. Fill out the contact form with test data
3. Submit the form
4. Check `christian.canlubo@mcrctas.com` inbox

### Method 2: Check the Debug Panel
1. Go to: `your-website-url#debug`
2. Submit a test contact form
3. Look at the debug logs
4. Check for:
   - ✅ "Email notification sent successfully" = Working!
   - ❌ "403 Forbidden" = Email needs verification
   - ❌ "401 Unauthorized" = Wrong API key

### Method 3: Check Server Logs
1. Go to: https://supabase.com/dashboard
2. Open your project
3. Go to **Edge Functions** → **server** → **Logs**
4. Look for email-related messages

---

## 📋 **Current Configuration**

### Your Settings:
- **Resend API Key**: ✅ Configured (`re_3evDAcKh_...`)
- **From Email**: `MCRC Contact Form <onboarding@resend.dev>`
- **To Email**: `christian.canlubo@mcrctas.com`
- **Reply-To**: Customer's email (for easy replies)

### Email Template Features:
- ✅ Professional MCRC branding
- ✅ All contact details included
- ✅ Easy "Reply" button
- ✅ Manila timezone timestamps
- ✅ Responsive HTML design
- ✅ Direct link to customer's email

---

## ❓ **Common Issues & Solutions**

### Issue 1: "403 Forbidden" Error
**Cause**: Recipient email not verified in Resend
**Solution**: Verify `christian.canlubo@mcrctas.com` in Resend dashboard

### Issue 2: "401 Unauthorized" Error
**Cause**: Invalid or missing API key
**Solution**: Check that RESEND_API_KEY is set correctly

### Issue 3: Emails Go to Spam
**Cause**: Using `onboarding@resend.dev` (test email)
**Solution**: Add and verify your custom domain

### Issue 4: No Errors, But No Emails
**Cause**: Email provider blocking/filtering
**Solution**: 
- Check spam/junk folder
- Add `onboarding@resend.dev` to contacts
- Verify email address in Resend

---

## 🧪 **Testing Checklist**

Before testing, make sure:
- [ ] Email `christian.canlubo@mcrctas.com` is verified in Resend
- [ ] RESEND_API_KEY is correctly configured
- [ ] You have access to the email inbox
- [ ] Check spam/junk folders

To test:
1. [ ] Go to your website
2. [ ] Fill out contact form with real data
3. [ ] Click "Send Message"
4. [ ] Wait 10-30 seconds
5. [ ] Check email inbox (and spam folder)
6. [ ] Verify email looks good and has all details

---

## 📊 **What Happens When Form is Submitted**

1. **User fills out form** → Form data sent to server
2. **Server saves to database** → Stored in KV store
3. **Server sends email** → Via Resend API
4. **Resend delivers email** → To `christian.canlubo@mcrctas.com`
5. **You receive notification** → Check inbox!
6. **View in Admin Dashboard** → `website-url#admin`

---

## 🎨 **Email Preview**

Your email notifications will look like this:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                    
   🔔 New Contact Form Submission                  
   MCRC Tax & Accounting Services                  
                                                    
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You have received a new inquiry through your website:

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                              ┃
┃  Name:     Juan dela Cruz                   ┃
┃  Email:    juan@example.com                 ┃
┃  Phone:    09171234567                      ┃
┃  Company:  ABC Corporation                  ┃
┃                                              ┃
┃  Message:                                    ┃
┃  I'm interested in your tax advisory        ┃
┃  services for my new business...            ┃
┃                                              ┃
┃  📅 Submitted: January 10, 2025, 2:30 PM    ┃
┃                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

        [ Reply to Juan ] ← Clickable button
```

---

## 🔧 **Need More Help?**

### Quick Tests:
1. **Test API Key**: Visit `your-website#debug` and submit a form
2. **Check Logs**: Look for detailed error messages
3. **Admin Dashboard**: Go to `your-website#admin` to see all submissions

### Still Not Working?
1. Check server logs for specific error messages
2. Verify API key is exactly: `re_3evDAcKh_Q6pR8QqHuqpTjQS4GPCSpaeB`
3. Make sure you verified the email in Resend
4. Wait a few minutes after verification
5. Try sending a test email from Resend dashboard directly

---

## 🎯 **Next Steps**

### Immediate Action (Do This Now):
1. ✅ Go to https://resend.com/emails
2. ✅ Verify `christian.canlubo@mcrctas.com`
3. ✅ Test the contact form
4. ✅ Check your inbox

### Future Improvement:
1. ⭐ Add custom domain `mcrctas.com` in Resend
2. ⭐ Update from email to `noreply@mcrctas.com`
3. ⭐ Set up email forwarding if needed
4. ⭐ Add additional recipient emails if needed

---

## ✨ **Features Already Implemented**

Your email notifications include:
- ✅ Professional HTML design with MCRC branding
- ✅ All contact form details beautifully formatted
- ✅ Direct reply button to customer
- ✅ Manila timezone timestamps
- ✅ Mobile-responsive design
- ✅ Detailed logging for debugging
- ✅ Admin dashboard integration
- ✅ Error handling and retry logic

Everything is ready to go - you just need to verify your email! 🚀

---

**Last Updated**: January 10, 2025  
**Status**: ⚠️ Waiting for email verification  
**Action Required**: Verify `christian.canlubo@mcrctas.com` in Resend
