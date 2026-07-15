import aboutImage from "figma:asset/3568a43984398b447dc5b591c88ecda200dafed8.png";

const VALUES = [
  {
    num: "01",
    title: "Commitment to Service",
    body: "Every entrepreneur deserves the tools to manage their finances. We equip owners with a working understanding of accounting principles, tax laws, and compliance.",
  },
  {
    num: "02",
    title: "Financial Literacy First",
    body: "A strong foundation of financial literacy lets owners navigate the business world with confidence — key concepts explained plainly, insights you can act on.",
  },
  {
    num: "03",
    title: "Growth as the Goal",
    body: "We help you make informed decisions, optimize operations, and achieve sustainable growth — with tailored strategies for the obstacles ahead.",
  },
];

export function About() {
  return (
    <section id="about" className="rd-section rd-container">
      <div className="rd-eyebrow">
        <span className="num">01</span>
        <span className="rule" />
        <span className="label">About MCRC</span>
      </div>

      <div className="rd-about-grid">
        <div>
          <h2 className="rd-h2">Built to close the gap between entrepreneurs and their numbers.</h2>
          <p className="rd-about-intro">
            Founded in 2022, MCRC Tax and Accounting Services exists for the micro and small
            business owner. We understand how daunting accounting and tax regulations can feel —
            so we make expert support comprehensive, accessible, and personal.
          </p>
          <div className="rd-pullquote">
            <p>“Bridging the knowledge gap through comprehensive and accessible support for entrepreneurs.”</p>
          </div>
        </div>
        <div className="rd-about-photo">
          <div className="img" role="img" aria-label="MCRC advisory session" style={{ backgroundImage: `url(${aboutImage})` }} />
        </div>
      </div>

      <div className="rd-values">
        {VALUES.map((v) => (
          <div className="rd-value" key={v.num}>
            <div className="num">{v.num}</div>
            <div className="title">{v.title}</div>
            <p>{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
