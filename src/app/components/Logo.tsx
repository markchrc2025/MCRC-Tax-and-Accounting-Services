interface LogoMarkProps {
  size?: number;
  /** "light" for dark backgrounds, "dark" for light backgrounds */
  variant?: "light" | "dark";
}

/**
 * MCRC brand mark — a shield with three ascending chevrons.
 * Placeholder vector per the design handoff (swap for the client's
 * real "M + upward arrow" logo when the vector is available).
 */
export function LogoMark({ size = 40, variant = "dark" }: LogoMarkProps) {
  const shieldFill = variant === "light" ? "rgba(255,255,255,0.08)" : "rgba(14,42,69,0.06)";
  const ring = variant === "light" ? "rgba(230,200,124,0.6)" : "rgba(163,120,31,0.55)";
  const topChevron = variant === "light" ? "#efd084" : "#a3781f";

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M60 8 L103 23 L103 58 C103 85 84 103 60 113 C36 103 17 85 17 58 L17 23 Z" fill={shieldFill} />
      <path d="M60 18 L95 30 L95 58 C95 80 80 95 60 103 C40 95 25 80 25 58 L25 30 Z" stroke={ring} strokeWidth="1.6" fill="none" />
      <path d="M42 81 L60 71 L78 81" stroke="#c79433" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 59 L60 50 L75 59" stroke="#dcab46" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 38 L60 30 L72 38" stroke={topChevron} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
