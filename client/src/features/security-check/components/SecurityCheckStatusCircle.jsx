import "../assets/security-check.css";

export const SecurityCheckStatusCircle = ({ securityStatus }) => {
  const radius = 100;
  const strokeWidth = 30;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (securityStatus / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="security-status-circle"
    >
      <circle
        stroke="#ff003c"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#4CAF50"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="-50%"
        textAnchor="middle"
        fill="#fff"
        dy=".3em"
        className="security-status-text"
      >
        {securityStatus}%
      </text>
    </svg>
  );
};
