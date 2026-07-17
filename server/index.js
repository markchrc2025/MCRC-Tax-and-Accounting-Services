"use strict";

/*
 * MCRC marketing site — production server.
 *
 * Serves the static Vite build (../dist) and exposes a single API route,
 * POST /api/contact, which:
 *   1. stores the submission in the self-hosted Postgres DB (if configured), and
 *   2. emails a formatted notification to the firm (if SMTP is configured).
 *
 * All secrets come from environment variables — nothing is hard-coded:
 *   DATABASE_URL   postgres://... connection string (server-side only)
 *   MAIL_TO        recipient for inquiry notifications
 *   MAIL_FROM      From address (e.g. "MCRC Website <no-reply@mcrctas.com>")
 *   SMTP_HOST      SMTP server host
 *   SMTP_PORT      SMTP port (465 for SSL, 587 for STARTTLS)
 *   SMTP_USER      SMTP username
 *   SMTP_PASS      SMTP password / app password
 *   PORT           HTTP port (default 8080)
 */

const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const { Pool } = require("pg");

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, "..", "dist");

// ---------------------------------------------------------------------------
// Postgres (optional — the server still runs and emails if the DB is absent)
// ---------------------------------------------------------------------------
let pool = null;
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  // The self-hosted DB uses a self-signed cert (sslmode=no-verify): use TLS
  // but skip cert verification. sslmode=disable => no TLS.
  const needsSsl = !/sslmode=disable/i.test(url);
  pool = new Pool({
    connectionString: url,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });
  pool.on("error", (err) => console.error("[db] pool error:", err.message));
}

async function ensureSchema() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id            SERIAL PRIMARY KEY,
      type          TEXT NOT NULL DEFAULT 'message',
      name          TEXT NOT NULL,
      email         TEXT NOT NULL,
      phone         TEXT,
      company       TEXT,
      message       TEXT,
      booking_date  TEXT,
      booking_time  TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

async function storeSubmission(s) {
  if (!pool) return { stored: false };
  await pool.query(
    `INSERT INTO contact_submissions
       (type, name, email, phone, company, message, booking_date, booking_time)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [s.type, s.name, s.email, s.phone || null, s.company || null, s.message || null, s.bookingDate || null, s.bookingTime || null]
  );
  return { stored: true };
}

// ---------------------------------------------------------------------------
// Email (optional — configured via SMTP_* env vars)
// ---------------------------------------------------------------------------
let transporter = null;
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

function manilaTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  }).format(new Date());
}

function buildEmail(s) {
  const isBooking = s.type === "booking";
  const subject = isBooking
    ? `New Consultation Booking — ${s.name}`
    : `New Website Inquiry — ${s.name}`;
  const when = manilaTimestamp();

  const rows = [
    ["NAME", s.name],
    ["EMAIL", s.email],
    ["MOBILE", s.phone || "—"],
    ["COMPANY", s.company || "—"],
    ["TYPE", isBooking ? "Consultation Booking" : "Service Inquiry"],
  ];
  if (isBooking) rows.push(["REQUESTED SCHEDULE", `${s.bookingDate || "—"} at ${s.bookingTime || "—"}`]);
  rows.push(["COMMENT", s.message || "—"]);
  rows.push(["INQUIRY DATE", when]);

  const text =
    `Dear MCRC Team,\n\nThe website received a new inquiry. Please see details below:\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n\n") + "\n";

  const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#16212c;">
      <div style="background:#0e2a45;color:#f6f2ea;padding:20px 24px;border-radius:6px 6px 0 0;">
        <div style="font-size:20px;font-weight:800;letter-spacing:-.01em;">MCRC Tax &amp; Accounting</div>
        <div style="font-size:12px;letter-spacing:.18em;color:#e6c87c;text-transform:uppercase;margin-top:4px;">New Website Inquiry</div>
      </div>
      <div style="border:1px solid #e4dbc9;border-top:none;border-radius:0 0 6px 6px;padding:24px;">
        <p style="margin:0 0 18px;">Dear MCRC Team,</p>
        <p style="margin:0 0 20px;">The website received a new inquiry. Please see details below:</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows.map(([k, v]) => `
            <tr>
              <td style="padding:8px 0;vertical-align:top;width:170px;color:#a3781f;font-weight:700;letter-spacing:.04em;">${esc(k)}</td>
              <td style="padding:8px 0;vertical-align:top;color:#16212c;">${k === "EMAIL" ? `<a href="mailto:${esc(v)}" style="color:#0e2a45;">${esc(v)}</a>` : esc(v).replace(/\n/g, "<br>")}</td>
            </tr>`).join("")}
        </table>
      </div>
    </div>`;

  return { subject, text, html };
}

async function sendNotification(s) {
  if (!transporter) return { emailed: false };
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  if (!to || !from) return { emailed: false };
  const { subject, text, html } = buildEmail(s);
  await transporter.sendMail({ from, to, replyTo: s.email, subject, text, html });
  return { emailed: true };
}

// Firm contact details echoed in the client acknowledgement (public info).
const FIRM_PHONE = process.env.FIRM_PHONE || "0947 395 9157";
const FIRM_EMAIL = process.env.FIRM_EMAIL || "christian.canlubo@mcrctas.com";

function buildAck(s) {
  const isBooking = s.type === "booking";
  const firstName = (s.name || "").split(/\s+/)[0] || "there";
  const subject = isBooking
    ? "We received your consultation request — MCRC Tax & Accounting"
    : "We received your message — MCRC Tax & Accounting";

  const scheduleLine = isBooking
    ? `Your requested schedule is ${s.bookingDate || "—"} at ${s.bookingTime || "—"}. This is a request — we'll confirm your slot by email or phone shortly.\n\n`
    : "";

  const text =
    `Hi ${firstName},\n\n` +
    `Thank you for reaching out to MCRC Tax and Accounting Services. We've received your ` +
    `${isBooking ? "consultation request" : "message"} and a member of our team will get back to you within one business day.\n\n` +
    scheduleLine +
    (s.message ? `Here's a copy of what you sent:\n"${s.message}"\n\n` : "") +
    `If you need us sooner, reach us at ${FIRM_PHONE} or ${FIRM_EMAIL}.\n\n` +
    `Warm regards,\nMCRC Tax and Accounting Services\n"Your growth, accounted for."\n`;

  const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#16212c;">
      <div style="background:#0e2a45;color:#f6f2ea;padding:22px 24px;border-radius:6px 6px 0 0;">
        <div style="font-size:20px;font-weight:800;letter-spacing:-.01em;">MCRC Tax &amp; Accounting</div>
        <div style="font-size:12px;letter-spacing:.18em;color:#e6c87c;text-transform:uppercase;margin-top:4px;">Your growth, accounted for.</div>
      </div>
      <div style="border:1px solid #e4dbc9;border-top:none;border-radius:0 0 6px 6px;padding:26px 24px;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hi ${esc(firstName)},</p>
        <p style="margin:0 0 16px;">Thank you for reaching out to <strong>MCRC Tax and Accounting Services</strong>. We've received your ${isBooking ? "consultation request" : "message"} and a member of our team will get back to you within one business day.</p>
        ${isBooking ? `<div style="margin:0 0 16px;padding:14px 16px;background:#f1e9d9;border-radius:5px;">
          <div style="font-size:11.5px;letter-spacing:.16em;color:#a3781f;text-transform:uppercase;font-weight:700;">Requested schedule</div>
          <div style="margin-top:4px;font-weight:700;color:#0e2a45;">${esc(s.bookingDate || "—")} at ${esc(s.bookingTime || "—")}</div>
          <div style="margin-top:6px;font-size:13px;color:#5b6976;">This is a request — we'll confirm your slot by email or phone shortly.</div>
        </div>` : ""}
        ${s.message ? `<p style="margin:0 0 8px;color:#5b6976;font-size:13px;">A copy of what you sent:</p>
        <blockquote style="margin:0 0 16px;padding:10px 16px;border-left:3px solid #c0902f;color:#3c4855;">${esc(s.message).replace(/\n/g, "<br>")}</blockquote>` : ""}
        <p style="margin:0 0 16px;">If you need us sooner, reach us at <strong>${esc(FIRM_PHONE)}</strong> or <a href="mailto:${esc(FIRM_EMAIL)}" style="color:#0e2a45;">${esc(FIRM_EMAIL)}</a>.</p>
        <p style="margin:0;color:#5b6976;">Warm regards,<br><strong style="color:#0e2a45;">MCRC Tax and Accounting Services</strong></p>
      </div>
    </div>`;

  return { subject, text, html };
}

async function sendAcknowledgement(s) {
  if (!transporter) return { acked: false };
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  if (!from || !s.email) return { acked: false };
  const replyTo = process.env.MAIL_REPLY_TO || process.env.MAIL_TO || from;
  const { subject, text, html } = buildAck(s);
  await transporter.sendMail({ from, to: s.email, replyTo, subject, text, html });
  return { acked: true };
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, db: !!pool, email: !!transporter })
);

app.post("/api/contact", async (req, res) => {
  const b = req.body || {};
  const s = {
    type: b.type === "booking" ? "booking" : "message",
    name: (b.name || "").trim(),
    email: (b.email || "").trim(),
    phone: (b.phone || "").trim(),
    company: (b.company || "").trim(),
    message: (b.message || "").trim(),
    bookingDate: (b.bookingDate || "").trim(),
    bookingTime: (b.bookingTime || "").trim(),
  };

  if (!s.name || !s.email || (s.type === "message" && !s.message)) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  let stored = false, emailed = false;
  const errors = [];
  try { ({ stored } = await storeSubmission(s)); }
  catch (e) { console.error("[db] insert failed:", e.message); errors.push("db"); }
  try { ({ emailed } = await sendNotification(s)); }
  catch (e) { console.error("[email] send failed:", e.message); errors.push("email"); }

  // Courtesy auto-reply to the client (best-effort — never blocks success).
  try { await sendAcknowledgement(s); }
  catch (e) { console.error("[email] acknowledgement failed:", e.message); }

  // Success as long as the submission was captured somewhere.
  if (stored || emailed) {
    return res.json({
      message: s.type === "booking"
        ? "Your booking request has been sent. We'll confirm shortly."
        : "Thank you for your message! We'll get back to you soon.",
    });
  }
  console.error("[contact] submission not captured:", errors.join(","));
  return res.status(502).json({ error: "We couldn't process your request right now. Please email us directly." });
});

// Static site + SPA fallback
app.use(express.static(DIST_DIR));
app.get("*", (_req, res) => res.sendFile(path.join(DIST_DIR, "index.html")));

ensureSchema()
  .then(() => console.log("[db] schema ready"))
  .catch((e) => console.error("[db] schema init failed:", e.message))
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`[server] listening on ${PORT} — db:${!!pool} email:${!!transporter}`);
    });
  });
