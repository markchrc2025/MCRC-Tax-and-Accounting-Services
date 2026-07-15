import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop sticky header reveals once the user scrolls past the hero (~520px).
  useEffect(() => {
    const onScroll = () => setScrolled((window.pageYOffset || document.documentElement.scrollTop || 0) > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      {/* Desktop sticky header */}
      <div className={`rd-sticky${scrolled ? " is-visible" : ""}`}>
        <div className="rd-sticky-inner">
          <a href="#home" className="rd-logo" onClick={(e) => go(e, "home")}>
            <LogoMark size={40} variant="dark" />
            <span className="name">
              <span className="mcrc" style={{ fontSize: 24 }}>MCRC</span>
              <span className="tag" style={{ fontSize: 9 }}>Tax &amp; Accounting</span>
            </span>
          </a>
          <nav className="rd-nav" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)}>{l.label}</a>
            ))}
            <a href="#contact" className="rd-btn rd-btn-primary" style={{ padding: "12px 24px", fontSize: "14.5px", fontWeight: 600 }} onClick={(e) => go(e, "contact")}>
              Request a Consultation <span className="arrow">→</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="rd-mobilebar">
        <a href="#home" className="rd-logo" onClick={(e) => go(e, "home")}>
          <LogoMark size={34} variant="dark" />
          <span className="name">
            <span className="mcrc" style={{ fontSize: 20 }}>MCRC</span>
            <span className="tag" style={{ fontSize: 8 }}>Tax &amp; Accounting</span>
          </span>
        </a>
        <button
          className={`rd-hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={`rd-mobilemenu${menuOpen ? " open" : ""}`}>
        <div className="rd-mobilemenu-inner">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)}>{l.label}</a>
          ))}
          <a href="#contact" className="rd-btn rd-btn-gold" onClick={(e) => go(e, "contact")}>
            Request a Consultation <span>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
