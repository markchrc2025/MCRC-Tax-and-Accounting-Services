# 🚀 Quick Start Guide - MCRC Website

## For First-Time Setup (Do This Now!)

### 1️⃣ Set Up Email Notifications (5 minutes)

**You've been prompted to add your Resend API key.**

1. Go to [resend.com](https://resend.com)
2. Sign up (free - 100 emails/day)
3. Copy your API key (starts with `re_`)
4. Paste it when prompted

**That's it!** You'll now get email alerts when someone contacts you.

---

### 2️⃣ Change Admin Password (30 seconds)

**Current password**: `mcrc2024admin`

**To change it:**
1. Open `/components/AdminDashboard.tsx`
2. Find line 30: `const ADMIN_PASSWORD = "mcrc2024admin";`
3. Change to your own password
4. Save the file

---

### 3️⃣ Test Your Setup (2 minutes)

1. **Submit a test contact form** on your website
2. **Check your email** (christian.canlubo@mcrctas.com) for notification
3. **Visit admin dashboard**: Add `#admin` to your URL
4. **Login** with your admin password
5. **Verify** the test submission appears

---

## Daily Usage

### Access Admin Dashboard
**URL**: `yourwebsite.com#admin`
**Password**: (the one you set above)

### What You'll See:
- List of all contact form submissions
- "New" vs "Read" status badges
- Click any submission to view full details
- Respond directly via email or phone

### Daily Tasks:
1. Check for new submissions (look for 🔵 "new" badge)
2. Click to view details
3. Respond to the inquiry via email/phone
4. Mark as "read" after responding
5. Delete spam or test submissions

---

## Quick Links

- **Website Home**: `yoursite.com`
- **Admin Dashboard**: `yoursite.com#admin`
- **Resend Dashboard**: [dashboard.resend.com](https://dashboard.resend.com)

---

## Email Notification Format

When someone submits the form, you'll receive:

**Subject**: New Contact Form Submission from [Name]

**Content**:
- Name
- Email (clickable)
- Phone (clickable)
- Company
- Message
- Timestamp (Manila time)

---

## Common Questions

**Q: I'm not receiving email notifications?**
- Check spam folder
- Verify Resend API key is correct
- Check Resend dashboard for issues
- Form still works; emails are just not sending

**Q: How do I respond to submissions?**
- Click the email address in admin dashboard to send email
- Or click the phone number to call
- Or copy contact details and use your preferred method

**Q: Can I have multiple people access the admin?**
- Currently single password system
- Share password securely with team members
- Or request multi-user authentication upgrade

**Q: What if someone spam submits the form?**
- Delete spam submissions in admin dashboard
- Consider adding reCAPTCHA (can be added later)
- Resend free tier has 100 emails/day limit

**Q: Can I customize the email template?**
- Yes! Edit `/supabase/functions/server/index.tsx`
- Look for the HTML email template (around line 54)
- Customize styling, layout, or content

**Q: Where is my data stored?**
- All submissions are in Supabase database
- Secure and backed up automatically
- Access via admin dashboard or API

---

## Pro Tips

✅ **Bookmark the admin URL** for quick access
✅ **Check dashboard daily** to never miss a lead
✅ **Respond within 24 hours** for best conversion
✅ **Set up email filters** to organize MCRC inquiries
✅ **Export important leads** to your CRM system
✅ **Keep admin password secure** - don't share publicly

---

## Need More Features?

Want to add:
- Auto-reply emails to customers
- SMS notifications
- Multiple admin users
- Analytics dashboard
- Export to Excel/CSV
- Integration with your CRM

Just ask!

---

## Emergency Contacts

- **Resend Support**: [resend.com/docs](https://resend.com/docs)
- **Email Issues**: Check Resend dashboard logs
- **Form Issues**: Check browser console (F12)

---

**You're all set! 🎉**

Your contact form is now live and working. Every submission will:
1. ✅ Save to database
2. ✅ Send you an email
3. ✅ Appear in admin dashboard

Start receiving leads from your website today!
