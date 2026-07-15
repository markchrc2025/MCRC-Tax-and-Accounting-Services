import { LogoMark } from "./Logo";

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  "Tax Advisory & Compliance",
  "Bookkeeping & Payroll",
  "Business Registration",
  "Financial Advisory",
  "Legal Services",
];

function scrollTo(e: React.MouseEvent, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="rd-footer" role="contentinfo">
      <div className="rd-footer-grid">
        <div className="rd-footer-brand">
          <div className="row">
            <LogoMark size={34} variant="light" />
            <span className="mcrc">MCRC</span>
          </div>
          <p className="tagline">Your growth, accounted for.</p>
          <p className="blurb">Your trusted partner in tax, accounting, and business advisory services since 2022.</p>
        </div>

        <div className="rd-footer-col">
          <div className="head">Navigate</div>
          <div className="list">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => scrollTo(e, n.id)}>{n.label}</a>
            ))}
          </div>
        </div>

        <div className="rd-footer-col">
          <div className="head">Services</div>
          <div className="list">
            {SERVICES.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="rd-footer-col">
          <div className="head">Contact</div>
          <div className="list">
            <span>0947 395 9157</span>
            <span>christian.canlubo@mcrctas.com</span>
            <span>Brgy. San Roque, Marikina City</span>
          </div>
        </div>
      </div>

      <div className="rd-footer-bottom">
        <span>© 2026 MCRC Tax and Accounting Services</span>
        <span>Empowering entrepreneurs to achieve financial success.</span>
      </div>
    </footer>
  );
}
