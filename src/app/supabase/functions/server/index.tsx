import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-212365c9/health", (c) => {
  return c.json({ status: "ok" });
});

// Environment check endpoint (for debugging)
app.get("/make-server-212365c9/env-check", (c) => {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  return c.json({
    resendApiKeyConfigured: !!resendKey,
    resendApiKeyLength: resendKey?.length || 0,
    resendApiKeyPrefix: resendKey ? resendKey.substring(0, 5) + "..." : "Not found",
  });
});

// Contact form submission endpoint
app.post("/make-server-212365c9/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    // Create a unique key for this submission using timestamp
    const timestamp = new Date().toISOString();
    const key = `contact_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Store the submission in the KV store
    const submissionData = {
      id: key,
      name,
      email,
      phone: phone || '',
      service: service || 'General Inquiry',
      message,
      timestamp,
      status: 'new'
    };

    await kv.set(key, JSON.stringify(submissionData));

    console.log(`New contact form submission received from ${email} at ${timestamp}`);

    // Send email notification using Resend
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      console.log("🔑 Checking for RESEND_API_KEY:", resendApiKey ? "✅ Found (length: " + resendApiKey.length + ")" : "❌ Not found");
      
      if (resendApiKey) {
        console.log("📧 Attempting to send email notification to christian.canlubo@mcrctas.com...");
        
        const emailPayload = {
          from: "MCRC Contact Form <onboarding@resend.dev>",
          to: ["christian.canlubo@mcrctas.com"],
          subject: `🔔 New Contact Form Submission from ${name}`,
          reply_to: email, // Allow direct reply to the customer
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #00618F 0%, #004d73 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">🔔 New Contact Form Submission</h1>
                  <p style="color: #B3E5FC; margin: 10px 0 0 0;">MCRC Tax & Accounting Services</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px; background: white;">
                  <p style="font-size: 16px; color: #333; margin-top: 0;">
                    You have received a new inquiry through your website:
                  </p>
                  
                  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00618F;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">Name:</td>
                        <td style="padding: 8px 0; color: #333;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${email}" style="color: #00618F; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                        <td style="padding: 8px 0; color: #333;">${phone || "Not provided"}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666; font-weight: bold;">Company:</td>
                        <td style="padding: 8px 0; color: #333;">${service || "Not provided"}</td>
                      </tr>
                    </table>
                    
                    <div style="margin-top: 20px;">
                      <p style="color: #666; font-weight: bold; margin: 0 0 10px 0;">Message:</p>
                      <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; line-height: 1.6; color: #333;">
                        ${message.replace(/\n/g, "<br>")}
                      </div>
                    </div>
                    
                    <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">
                      📅 Submitted: ${new Date(timestamp).toLocaleString('en-US', { 
                        dateStyle: 'full', 
                        timeStyle: 'short',
                        timeZone: 'Asia/Manila'
                      })} (Manila Time)
                    </p>
                  </div>
                  
                  <!-- Action Button -->
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${email}?subject=Re: Your Inquiry to MCRC" 
                       style="display: inline-block; background: #00618F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                      Reply to ${name.split(' ')[0]}
                    </a>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="color: #666; font-size: 12px; margin: 0;">
                    This email was sent from your MCRC website contact form
                  </p>
                  <p style="color: #999; font-size: 11px; margin: 10px 0 0 0;">
                    View all submissions in your <a href="#admin" style="color: #00618F;">Admin Dashboard</a>
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        console.log("📤 Email payload prepared:", JSON.stringify({ 
          from: emailPayload.from, 
          to: emailPayload.to,
          subject: emailPayload.subject,
          reply_to: emailPayload.reply_to,
          html: "[HTML content omitted]" 
        }));

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailPayload),
        });

        const responseData = await emailResponse.json();
        console.log("📬 Resend API response status:", emailResponse.status);
        console.log("📬 Resend API response data:", JSON.stringify(responseData));

        if (!emailResponse.ok) {
          console.error("❌ Email notification failed!");
          console.error("Status code:", emailResponse.status);
          console.error("Error details:", JSON.stringify(responseData, null, 2));
          
          if (emailResponse.status === 403) {
            console.error("⚠️  IMPORTANT: Email sending failed with 403 Forbidden");
            console.error("⚠️  This usually means the recipient email is not verified in Resend");
            console.error("⚠️  ACTION REQUIRED: Go to https://resend.com/emails and verify christian.canlubo@mcrctas.com");
            console.error("⚠️  OR add and verify your custom domain at https://resend.com/domains");
          } else if (emailResponse.status === 401) {
            console.error("⚠️  IMPORTANT: Invalid API key - Please check your RESEND_API_KEY");
          } else if (emailResponse.status === 422) {
            console.error("⚠️  IMPORTANT: Invalid email data - Check email addresses and content");
          }
        } else {
          console.log("✅✅✅ Email notification sent successfully!");
          console.log("📧 Email ID:", responseData.id);
          console.log("👤 Sent to:", emailPayload.to[0]);
          console.log("📬 Reply-to:", emailPayload.reply_to);
        }
      } else {
        console.warn("⚠️  RESEND_API_KEY not found in environment variables");
        console.warn("⚠️  Email notifications are disabled");
      }
    } catch (emailError) {
      console.error("❌ Exception while sending email:", emailError);
      console.error("Error type:", emailError.constructor.name);
      console.error("Error message:", emailError.message);
      console.error("Stack trace:", emailError.stack);
      // Don't fail the request if email fails - contact form submission should still work
    }

    return c.json({ 
      success: true, 
      message: "Your message has been received. We'll get back to you soon!" 
    });

  } catch (error) {
    console.error(`Error processing contact form submission: ${error}`);
    return c.json({ 
      error: "Failed to submit your message. Please try again or contact us directly." 
    }, 500);
  }
});

// Get all contact submissions (for admin view)
app.get("/make-server-212365c9/contact-submissions", async (c) => {
  try {
    const submissions = await kv.getByPrefix("contact_");
    
    // Parse and sort by timestamp (newest first)
    const parsedSubmissions = submissions
      .map(item => JSON.parse(item))
      .sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

    return c.json({ submissions: parsedSubmissions });
  } catch (error) {
    console.error(`Error fetching contact submissions: ${error}`);
    return c.json({ error: "Failed to fetch submissions" }, 500);
  }
});

// Update submission status
app.put("/make-server-212365c9/contact-submissions/:id", async (c) => {
  try {
    const submissionId = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    // Get existing submission
    const existingData = await kv.get(submissionId);
    if (!existingData) {
      return c.json({ error: "Submission not found" }, 404);
    }

    const submission = JSON.parse(existingData);
    submission.status = status;

    // Update in KV store
    await kv.set(submissionId, JSON.stringify(submission));

    return c.json({ success: true, submission });
  } catch (error) {
    console.error(`Error updating submission status: ${error}`);
    return c.json({ error: "Failed to update submission" }, 500);
  }
});

// Delete submission
app.delete("/make-server-212365c9/contact-submissions/:id", async (c) => {
  try {
    const submissionId = c.req.param("id");
    await kv.del(submissionId);
    return c.json({ success: true });
  } catch (error) {
    console.error(`Error deleting submission: ${error}`);
    return c.json({ error: "Failed to delete submission" }, 500);
  }
});

Deno.serve(app.fetch);