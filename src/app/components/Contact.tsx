import { useMemo, useState } from "react";
import { toast } from "sonner";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MS = 86400000;
const SLOT_LABELS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:00 PM"];

// Same-origin API served by the Node backend (server/index.js).
const CONTACT_ENDPOINT = "/api/contact";

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** 8 consecutive weekdays (Sundays skipped) starting from base + pageStart days. */
function weekdaysFrom(base: Date, pageStart: number): Date[] {
  const cursor = new Date(base);
  cursor.setDate(cursor.getDate() + pageStart);
  const dates: Date[] = [];
  while (dates.length < 8) {
    if (cursor.getDay() !== 0) dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

const DETAILS = [
  { k: "Phone", v: <>0947 395 9157</> },
  { k: "Email", v: <>christian.canlubo@mcrctas.com</> },
  { k: "Office", v: <>Brgy. San Roque,<br />Marikina City</> },
  { k: "Hours", v: <>Mon–Fri · 8:00 AM – 6:00 PM<br />Sat · 9:00 AM – 1:00 PM</> },
];

export function Contact() {
  const [contactTab, setContactTab] = useState<"message" | "booking">("message");

  // ----- "today" anchor (real current date, per handoff) -----
  const base = useMemo(() => {
    const b = new Date();
    b.setHours(0, 0, 0, 0);
    return b;
  }, []);

  // ----- Message form -----
  const [msg, setMsg] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          company: msg.company,
          message: msg.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Thank you for your message! We'll get back to you soon.");
        setMsg({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again or contact us directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  // ----- Scheduler -----
  const [pageStart, setPageStart] = useState(0);
  const [selISO, setSelISO] = useState(() => iso(weekdaysFrom(base, 0)[0]));
  const [selSlot, setSelSlot] = useState(2);
  const [booking, setBooking] = useState({ name: "", email: "" });
  const [bookingSending, setBookingSending] = useState(false);

  const days = useMemo(() => weekdaysFrom(base, pageStart), [base, pageStart]);
  const rangeLabel = useMemo(() => {
    const first = days[0], last = days[7];
    return first.getFullYear() === last.getFullYear() && first.getMonth() === last.getMonth()
      ? `${MON[first.getMonth()]} ${first.getFullYear()}`
      : `${MON[first.getMonth()]} ${first.getDate()} – ${MON[last.getMonth()]} ${last.getDate()}, ${last.getFullYear()}`;
  }, [days]);
  const prevDisabled = pageStart === 0;

  const bookingSummary = useMemo(() => {
    const d = new Date(selISO + "T00:00:00");
    return `${DOW[d.getDay()]}, ${MON[d.getMonth()]} ${d.getDate()} at ${SLOT_LABELS[selSlot]}`;
  }, [selISO, selSlot]);

  const jumpDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v) return;
    const d = new Date(v + "T00:00:00");
    const off = Math.round((d.getTime() - base.getTime()) / DAY_MS);
    setPageStart(Math.max(0, off));
    setSelISO(v);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSending(true);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: booking.name,
          email: booking.email,
          bookingDate: selISO,
          bookingTime: SLOT_LABELS[selSlot],
          message: `Consultation booking request for ${bookingSummary}.`,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || `Booking request sent for ${bookingSummary}. We'll confirm shortly.`);
        setBooking({ name: "", email: "" });
      } else {
        toast.error(data.error || "Failed to send booking. Please try again or contact us directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setBookingSending(false);
    }
  };

  return (
    <section id="contact" className="rd-section rd-container">
      <div className="rd-eyebrow">
        <span className="num">04</span>
        <span className="rule" />
        <span className="label">Contact</span>
      </div>

      <div className="rd-contact-grid">
        {/* Left: details */}
        <div>
          <h2 className="rd-h2">Let's talk about your business.</h2>
          <p className="rd-contact-lead">
            Reach out through any channel and our team will get back to you promptly — usually
            within one business day.
          </p>
          <div className="rd-contact-details">
            {DETAILS.map((d) => (
              <div className="rd-detail" key={d.k}>
                <span className="k">{d.k}</span>
                <div className="v">{d.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: card with tabs */}
        <div className="rd-card-panel">
          <div className="rd-segment" role="tablist">
            <button className={contactTab === "message" ? "active" : ""} onClick={() => setContactTab("message")}>Send a message</button>
            <button className={contactTab === "booking" ? "active" : ""} onClick={() => setContactTab("booking")}>Book a consultation</button>
          </div>

          {contactTab === "message" ? (
            <form className="rd-panel-body" onSubmit={submitMessage}>
              <div className="rd-panel-eyebrow">Send us a message</div>
              <div className="rd-field-grid">
                <label className="rd-field">Full name *
                  <input type="text" required placeholder="Juan dela Cruz" value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} />
                </label>
                <label className="rd-field">Email address *
                  <input type="email" required placeholder="juan@example.com" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} />
                </label>
                <label className="rd-field">Phone number
                  <input type="tel" placeholder="+63 947 395 9157" value={msg.phone} onChange={(e) => setMsg({ ...msg, phone: e.target.value })} />
                </label>
                <label className="rd-field">Company
                  <input type="text" placeholder="Your company" value={msg.company} onChange={(e) => setMsg({ ...msg, company: e.target.value })} />
                </label>
              </div>
              <label className="rd-field full">Message *
                <textarea required placeholder="Tell us about your needs…" value={msg.message} onChange={(e) => setMsg({ ...msg, message: e.target.value })} />
              </label>
              <button type="submit" className="rd-btn rd-btn-primary" disabled={sending}>
                {sending ? "Sending…" : <>Send Message <span className="arrow">→</span></>}
              </button>
            </form>
          ) : (
            <form className="rd-panel-body" onSubmit={submitBooking}>
              <div className="rd-panel-eyebrow">Book a free consultation</div>
              <p className="rd-panel-note">Pick a day and time for a 30-minute intro call with our team.</p>

              <div className="rd-sched-row">
                <span className="lbl">Select a date</span>
                <div className="rd-sched-controls">
                  <label className="rd-jump">Jump to
                    <input type="date" min={iso(base)} onChange={jumpDate} />
                  </label>
                  <button type="button" className="rd-weekbtn" aria-label="Previous week" disabled={prevDisabled} onClick={() => setPageStart((p) => Math.max(0, p - 7))}>‹</button>
                  <button type="button" className="rd-weekbtn" aria-label="Next week" onClick={() => setPageStart((p) => p + 7)}>›</button>
                </div>
              </div>
              <div className="rd-range">{rangeLabel}</div>

              <div className="rd-daygrid">
                {days.map((d) => {
                  const on = iso(d) === selISO;
                  return (
                    <button type="button" key={iso(d)} className={`rd-day${on ? " on" : ""}`} onClick={() => setSelISO(iso(d))}>
                      <span className="dow">{DOW[d.getDay()]}</span>
                      <span className="d">{d.getDate()}</span>
                      <span className="mon">{MON[d.getMonth()]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rd-slots-label">Available times</div>
              <div className="rd-slots">
                {SLOT_LABELS.map((label, i) => (
                  <button type="button" key={label} className={`rd-slot${i === selSlot ? " on" : ""}`} onClick={() => setSelSlot(i)}>{label}</button>
                ))}
              </div>

              <div className="rd-field-grid">
                <label className="rd-field">Full name *
                  <input type="text" required placeholder="Juan dela Cruz" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
                </label>
                <label className="rd-field">Email address *
                  <input type="email" required placeholder="juan@example.com" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} />
                </label>
              </div>

              <div className="rd-summary">
                <span className="check">✓</span>
                <span>Your call: <strong>{bookingSummary}</strong></span>
              </div>
              <button type="submit" className="rd-btn rd-btn-gold" disabled={bookingSending}>
                {bookingSending ? "Sending…" : <>Confirm Booking <span>→</span></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
