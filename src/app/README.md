# MCRC Tax and Accounting Services - Website Documentation

## 🎉 What's Included

Your professional website now has:

✅ **Full Website** - Homepage, About, Services, Contact with Google Maps
✅ **Working Contact Form** - Saves all submissions to database  
✅ **Email Notifications** - Instant alerts when someone contacts you
✅ **Admin Dashboard** - View and manage all submissions

---

## 🚀 Quick Start (3 Steps)

### Step 1: Email Notifications Setup

You've already been prompted to add your **Resend API key**. If you need to set it up:

1. Sign up at [resend.com](https://resend.com) - Free (100 emails/day)
2. Get your API key from the dashboard
3. Add it when prompted

Emails will be sent to: **christian.canlubo@mcrctas.com**

### Step 2: Change Admin Password

**Current Password**: `mcrc2024admin`

To change it:
- Open `/components/AdminDashboard.tsx`
- Line 30: Change `const ADMIN_PASSWORD = "mcrc2024admin";`
- Save the file

### Step 3: Test Everything

1. Submit a test contact form
2. Check your email for notification
3. Visit `yoursite.com#admin` and login
4. Verify the submission appears

**Done! 🎊**

---

## 📱 How to Use

### Access Admin Dashboard

**URL**: Add `#admin` to your website URL  
**Password**: The one you set above

### Admin Features

- View all contact form submissions
- See "New" vs "Read" status
- Click submissions to view full details
- Click email/phone to contact directly
- Mark as read after responding
- Delete spam submissions
- Refresh to see new submissions

### Daily Workflow

1. Check admin dashboard for new submissions (🔵 "new" badge)
2. Click to view details
3. Respond via email or phone
4. Mark as "read"
5. Delete test/spam submissions

---

## 📧 Email Notifications

Every form submission sends an email to you with:

- Sender's name
- Email address (clickable)
- Phone number (clickable)  
- Company name
- Full message
- Timestamp (Manila timezone)

### Troubleshooting Emails

**Not receiving emails?**
- Check spam folder
- Verify Resend API key is correct
- Check Resend dashboard for errors
- Note: Form still works even if email fails

**Using Free Resend Account?**
- Limit: 100 emails/day
- From address: `onboarding@resend.dev`
- Upgrade for custom domain

**Want Custom Email Domain?**
1. Add your domain in Resend dashboard
2. Verify DNS records
3. Update `/supabase/functions/server/index.tsx` line 52:
   ```tsx
   from: "MCRC Contact <noreply@mcrctas.com>",
   ```

---

## 🗂️ Website Structure

### Main Sections
- **Hero** - Team photo banner with tagline
- **About** - Company introduction
- **Services** - 5 service categories
- **Contact** - Form + Google Maps + Contact info
- **Footer** - Quick links + social media

### Navigation
- Home, About, Services, Contact
- Mobile responsive menu
- Smooth scroll navigation
- "Get Started" CTA button

### Contact Information
- **Phone**: 09190660794, 09171102814
- **Email**: christian.canlubo@mcrctas.com
- **Address**: Brgy San Roque, Marikina City
- **Map**: Midtown Subdivision 2, 37 Dragon, Marikina

---

## 🔒 Security & Privacy

- Admin dashboard password protected
- API keys stored as environment variables
- Secure database in Supabase
- HTTPS recommended for production

**⚠️ Important**: This is a prototyping environment. For production use with real customer data, ensure proper security measures are in place.

---

## 🎨 Customization

### Brand Colors
- Primary Blue: `#00618F`
- Dark Blue: `#004d73`
- Light Blue: `#B3E5FC`
- Background: `#E6F7FF`

### Change Email Recipient

Edit `/supabase/functions/server/index.tsx` line 51:
```tsx
to: ["your-email@mcrctas.com"],
```

Add multiple recipients:
```tsx
to: ["email1@mcrctas.com", "email2@mcrctas.com"],
```

### Customize Email Template

Edit `/supabase/functions/server/index.tsx` starting at line 54. Change HTML styling, layout, or content.

---

## 📁 Key Files

```
/App.tsx                          Main app with routing
/components/
  ├── Contact.tsx                 Contact form with backend
  ├── AdminDashboard.tsx          Admin dashboard
  ├── Navigation.tsx              Site navigation
  ├── Hero.tsx                    Landing banner
  ├── About.tsx                   About section
  ├── Services.tsx                Services section
  └── Footer.tsx                  Footer with admin link
/supabase/functions/server/
  └── index.tsx                   Backend API + email
```

---

## 🔗 API Endpoints

Base URL: `https://{projectId}.supabase.co/functions/v1/make-server-212365c9/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/contact` | POST | Submit contact form |
| `/contact-submissions` | GET | Get all submissions |
| `/contact-submissions/:id` | PUT | Update status |
| `/contact-submissions/:id` | DELETE | Delete submission |

---

## 💡 Pro Tips

✅ Bookmark `yoursite.com#admin` for quick access  
✅ Check dashboard daily for new leads  
✅ Respond within 24 hours for best conversion  
✅ Set up email filters for MCRC inquiries  
✅ Keep admin password secure  
✅ Export important leads to your CRM

---

## 🆘 Common Issues

### Form Not Submitting?
- Check browser console (F12) for errors
- Verify internet connection
- Try refreshing the page

### Admin Dashboard Not Loading?
- Confirm you're using `#admin` in URL
- Check password is correct
- Clear browser cache

### Can't See Submissions?
- Click "Refresh" button in admin dashboard
- Verify form submissions are successful
- Check browser console for errors

---

## 🚀 Future Enhancements

Want to add:
- ✨ Auto-reply emails to customers
- 📱 SMS notifications
- 👥 Multiple admin users with authentication
- 📊 Analytics dashboard
- 📥 Export submissions to CSV/Excel
- 🔗 CRM integration
- 🛡️ Spam protection (reCAPTCHA)

Just ask!

---

## 📞 Support Resources

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Email Issues**: Check Resend dashboard
- **Technical Issues**: Check browser console (F12)

---

## 📝 Version History

**v2.0** - January 2025
- Added admin dashboard
- Added email notifications
- Integrated with Supabase backend

**v1.0** - Initial Release
- Full website design
- Basic contact form

---

## ✅ Checklist

Setup completed?
- [ ] Resend API key added
- [ ] Admin password changed
- [ ] Test contact form submitted
- [ ] Email notification received
- [ ] Admin dashboard accessed
- [ ] Admin URL bookmarked

---

**You're all set! 🎉**

Every form submission will now:
1. ✅ Save to your database
2. ✅ Send you an email alert
3. ✅ Appear in your admin dashboard

Start receiving and managing leads from your professional website!

---

**MCRC Tax and Accounting Services**  
*Empowering Entrepreneurs*
