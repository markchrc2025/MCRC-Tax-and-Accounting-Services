// About the Accountant. Portrait is the client-provided founder headshot,
// optimized for the web (760px-wide JPEG).
import portrait from "figma:asset/christian-canlubo.jpg";

export function Team() {
  return (
    <section id="team" className="rd-section rd-container rd-team">
      <div className="rd-eyebrow">
        <span className="num">03</span>
        <span className="rule" />
        <span className="label">The Accountant</span>
      </div>

      <div className="rd-team-grid">
        <div className="rd-portrait-wrap">
          <div className="rd-portrait" role="img" aria-label="Christian Canlubo" style={{ backgroundImage: `url(${portrait})` }} />
        </div>

        <div>
          <h2 className="rd-h2" style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.02em" }}>Christian Canlubo</h2>
          <div className="role">Founder &amp; Accountant · 9+ years experience</div>
          <p className="rd-team-bio">
            Christian is deeply committed to driving innovation, fostering a culture of excellence,
            and delivering exceptional value to clients. With over nine years in the industry, he
            has a proven track record of leading high-performing teams and executing strategic
            initiatives that propel business growth.
          </p>
          <p className="rd-team-bio">
            He is passionate about empowering entrepreneurs, embracing new technologies, and
            cultivating strong relationships with stakeholders.
          </p>
          <div className="rd-stats">
            <div>
              <div className="big">9+</div>
              <div className="cap">Years of experience</div>
            </div>
            <div>
              <div className="big">2022</div>
              <div className="cap">MCRC founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
