import { LogoMark } from "./Logo";
import heroBanner from "figma:asset/hero.jpg";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

const FEATURES = [
  "Expert tax & accounting",
  "Registration & compliance",
  "Strategic financial advisory",
  "Year-round business support",
];

function scrollTo(e: React.MouseEvent, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section id="home" className="rd-hero">
      <div className="rd-hero-bg" style={{ backgroundImage: `url(${heroBanner})` }} />
      <div className="rd-hero-scrim" />

      <nav className="rd-hero-nav" aria-label="Primary">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>{l.label}</a>
        ))}
        <a href="#contact" className="rd-btn rd-btn-gold" style={{ padding: "13px 26px", fontSize: "14.5px" }} onClick={(e) => scrollTo(e, "contact")}>
          Request a Consultation <span>→</span>
        </a>
      </nav>

      <div className="rd-hero-inner">
        <div className="rd-hero-lockup">
          <LogoMark size={88} variant="light" />
          <span className="name" style={{ display: "flex", flexDirection: "column" }}>
            <span className="mcrc">MCRC</span>
            <span className="tag">Tax &amp; Accounting</span>
          </span>
        </div>

        <h1>Your growth,<br />accounted for.</h1>
        <p className="rd-hero-sub">
          MCRC helps micro and small business owners see their numbers clearly — from
          bookkeeping and BIR compliance to the advice that plans your next move.
        </p>

        <div className="rd-hero-cta">
          <a href="#contact" className="rd-btn rd-btn-gold" onClick={(e) => scrollTo(e, "contact")}>
            Request a Consultation →
          </a>
          <a href="#services" className="rd-btn rd-btn-outline" onClick={(e) => scrollTo(e, "services")}>
            Explore Services
          </a>
        </div>

        <div className="rd-hero-features">
          {FEATURES.map((f) => (
            <div className="item" key={f}>
              <span className="plus">+</span>{f}
            </div>
          ))}
        </div>
      </div>

      <div className="rd-hero-promise">
        <div className="eyebrow">Our promise</div>
        <div className="quote">“Empowering entrepreneurs, one ledger at a time.”</div>
      </div>
    </section>
  );
}
