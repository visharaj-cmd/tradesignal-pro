interface GoldenTickBadgeProps {
  show: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function GoldenTickBadge({
  show,
  size = "sm",
  className = "",
}: GoldenTickBadgeProps) {
  if (!show) return null;

  const dim = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const stroke = size === "md" ? "2" : "2.5";

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${dim} ${className}`}
      title="Verified Trader — Certificate Holder"
      aria-label="Verified Trader — Certificate Holder"
      data-ocid="golden-tick-badge"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Gold circle */}
        <circle cx="10" cy="10" r="9" fill="#F59E0B" opacity="0.15" />
        <circle cx="10" cy="10" r="9" stroke="#F59E0B" strokeWidth={stroke} />
        {/* White checkmark */}
        <path
          d="M6.5 10.25L8.75 12.5L13.5 7.5"
          stroke="#F59E0B"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
