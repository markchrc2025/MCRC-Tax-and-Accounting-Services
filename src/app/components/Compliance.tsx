const CREDENTIALS = [
  { k: "DTI Business Name", v: "No. 3525934" },
  { k: "BIR Registered", v: "RDO 045 · Marikina" },
  { k: "Mayor's Permit", v: "2026 · City of Marikina" },
];

export function Compliance() {
  return (
    <section className="rd-compliance" aria-label="Registered and compliant">
      <div className="rd-compliance-inner">
        <div className="rd-compliance-lead">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2 L20 5 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V5 Z" fill="#0e2a45" />
            <path d="M8.5 11.8 L11 14.2 L15.8 9.2" stroke="#e6c87c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div>
            <div className="t">Registered &amp; Compliant</div>
            <div className="s">A duly registered accounting practice in Marikina City</div>
          </div>
        </div>
        <div className="divider" />
        <div className="rd-creds">
          {CREDENTIALS.map((c) => (
            <div className="rd-cred" key={c.k}>
              <div className="k">{c.k}</div>
              <div className="v">{c.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
