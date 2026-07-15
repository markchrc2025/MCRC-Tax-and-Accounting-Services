import { LogoMark } from "./Logo";

export function Impact() {
  return (
    <section className="rd-impact" aria-label="Our impact">
      <div className="glow" />
      <div className="rd-impact-inner">
        <LogoMark size={104} variant="light" />
        <p>
          With expert guidance from experienced mentors, consultants, and financial advisors, we
          empower entrepreneurs to make informed decisions, optimize operations, and{" "}
          <em>achieve sustainable growth.</em>
        </p>
      </div>
    </section>
  );
}
