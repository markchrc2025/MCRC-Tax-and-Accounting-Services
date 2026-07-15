import { useState } from "react";

interface Service {
  title: string;
  desc: string;
}

const CATEGORIES: { label: string; services: Service[] }[] = [
  {
    label: "Core Services",
    services: [
      { title: "Audit & Assurance", desc: "Comprehensive audit services ensuring accuracy and compliance with financial standards." },
      { title: "Financial Statement Preparation", desc: "Professional preparation of financial statements that meet regulatory requirements." },
      { title: "Tax Advisory & Compliance", desc: "Expert tax planning and compliance services to optimize your tax position." },
      { title: "BIR Audit / LOA Assistance", desc: "Professional support during BIR audits and Letter of Authority proceedings." },
      { title: "Bookkeeping", desc: "Accurate and timely recording of all your business financial transactions." },
      { title: "Payroll Processing", desc: "Efficient payroll management ensuring timely and accurate employee compensation." },
    ],
  },
  {
    label: "Registration",
    services: [
      { title: "Business Permit Registration", desc: "Assistance with business permit registration and annual renewals at all government levels." },
      { title: "SEC / DTI / BIR / FDA Registration", desc: "Complete registration services for SEC, DTI, BIR, and FDA requirements." },
      { title: "SSS / PhilHealth / Pag-IBIG", desc: "Full compliance support for mandatory government contributions and registrations." },
    ],
  },
  {
    label: "Advisory",
    services: [
      { title: "Retirement Planning", desc: "Strategic planning to secure your financial future and retirement goals." },
      { title: "Business Consulting", desc: "Expert advice to optimize operations, increase profitability, and drive growth." },
      { title: "Financial Investment", desc: "Investment strategies and portfolio management for wealth creation." },
      { title: "Financial Modeling", desc: "Sophisticated financial models for forecasting, valuation, and decision-making." },
    ],
  },
  {
    label: "Professional",
    services: [
      { title: "Legal Services", desc: "Contract drafting, review, and negotiation. Transfer of Land Title. CPA Certification for Estate Tax." },
      { title: "HR & Manpower Services", desc: "Comprehensive human resource solutions and manpower management." },
      { title: "Employee Training Programs", desc: "Modular training programs designed to enhance employee skills and competencies." },
    ],
  },
  {
    label: "Marketing",
    services: [
      { title: "Brand Building & Customer Acquisition", desc: "Strategic marketing initiatives to build your brand and acquire customers." },
      { title: "Graphic Design & Multimedia", desc: "Creative design and multimedia production for all your marketing materials." },
    ],
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const active = CATEGORIES[activeTab];

  return (
    <section id="services" className="rd-section rd-services">
      <div className="rd-container">
        <div className="rd-eyebrow">
          <span className="num">02</span>
          <span className="rule" />
          <span className="label">Services</span>
        </div>

        <div className="rd-services-head">
          <h2 className="rd-h2">Everything your business needs,<br />under one roof.</h2>
          <p>We handle the complexities of financial management and compliance, so you can concentrate on growing your business.</p>
        </div>

        <div className="rd-tabs" role="tablist">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.label}
              role="tab"
              aria-selected={i === activeTab}
              className={`rd-tab${i === activeTab ? " active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="rd-cards">
          {active.services.map((svc, i) => (
            <div className="rd-card" key={svc.title}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <div className="title">{svc.title}</div>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
