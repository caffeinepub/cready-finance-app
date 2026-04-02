interface CreditGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function getScoreStatus(score: number): {
  label: string;
  color: string;
} {
  if (score >= 800) return { label: "Excellent", color: "#27AE60" };
  if (score >= 750) return { label: "Very Good", color: "#2F9E44" };
  if (score >= 700) return { label: "Good", color: "#F59F00" };
  if (score >= 650) return { label: "Fair", color: "#E67700" };
  return { label: "Poor", color: "#E24A3B" };
}

function getArcColor(score: number): string {
  if (score >= 800) return "#27AE60";
  if (score >= 750) return "#2F9E44";
  if (score >= 700) return "#F59F00";
  if (score >= 650) return "#E67700";
  return "#E24A3B";
}

export function CreditGauge({
  score,
  size = 180,
  strokeWidth = 14,
}: CreditGaugeProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 + 16;

  const totalAngle = 180;

  // Score range 300-900
  const minScore = 300;
  const maxScore = 900;
  const pct = Math.min(
    Math.max((score - minScore) / (maxScore - minScore), 0),
    1,
  );
  const filledAngle = pct * totalAngle;

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  const trackStart = polarToCartesian(180);
  const trackEnd = polarToCartesian(360);
  const trackPath = [
    `M ${trackStart.x} ${trackStart.y}`,
    `A ${radius} ${radius} 0 0 1 ${trackEnd.x} ${trackEnd.y}`,
  ].join(" ");

  const filledEnd = polarToCartesian(180 + filledAngle);
  const largeArcFlag = filledAngle > 180 ? 1 : 0;
  const filledPath =
    filledAngle > 0
      ? [
          `M ${trackStart.x} ${trackStart.y}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${filledEnd.x} ${filledEnd.y}`,
        ].join(" ")
      : "";

  const arcColor = getArcColor(score);
  const { label, color: statusColor } = getScoreStatus(score);

  return (
    <div className="flex flex-col items-center">
      <svg
        role="img"
        aria-label={`Credit score gauge showing ${score}`}
        width={size}
        height={size / 2 + 20 + strokeWidth}
        viewBox={`0 0 ${size} ${size / 2 + 20 + strokeWidth}`}
      >
        <title>{`Credit Score: ${score}`}</title>
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled */}
        {filledPath && (
          <path
            d={filledPath}
            fill="none"
            stroke={arcColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
        {/* Score text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill="#111827"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={statusColor}
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
