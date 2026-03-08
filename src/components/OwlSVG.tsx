const OwlSVG = ({ className = "", size = 400 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Owl body/face silhouette */}
    <defs>
      <radialGradient id="owl-glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#e8a838" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0d0a0e" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffb347" stopOpacity="1" />
        <stop offset="40%" stopColor="#e8a838" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#8B4513" stopOpacity="0.8" />
      </radialGradient>
      <radialGradient id="pupil-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a1020" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
    </defs>

    {/* Background glow */}
    <circle cx="100" cy="90" r="90" fill="url(#owl-glow)" />

    {/* Ear tufts */}
    <path d="M 55 35 L 40 8 L 65 30 Z" fill="#2a1e30" stroke="#3a2e40" strokeWidth="0.5" />
    <path d="M 145 35 L 160 8 L 135 30 Z" fill="#2a1e30" stroke="#3a2e40" strokeWidth="0.5" />
    <path d="M 58 33 L 45 12 L 63 30 Z" fill="#352840" />
    <path d="M 142 33 L 155 12 L 137 30 Z" fill="#352840" />

    {/* Head shape */}
    <ellipse cx="100" cy="85" rx="62" ry="58" fill="#1f1528" />
    <ellipse cx="100" cy="85" rx="58" ry="54" fill="#2a1e30" />

    {/* Facial disc feathers */}
    <ellipse cx="72" cy="80" rx="28" ry="30" fill="#251a2e" stroke="#3a2e40" strokeWidth="0.5" />
    <ellipse cx="128" cy="80" rx="28" ry="30" fill="#251a2e" stroke="#3a2e40" strokeWidth="0.5" />

    {/* Feather texture lines */}
    {[...Array(8)].map((_, i) => (
      <path
        key={`fl-${i}`}
        d={`M ${60 + i * 10} ${55 + i * 3} Q ${65 + i * 10} ${60 + i * 2}, ${60 + i * 10} ${65 + i * 3}`}
        stroke="#3a2e40"
        strokeWidth="0.3"
        fill="none"
        opacity="0.5"
      />
    ))}

    {/* Eyes - large amber circles */}
    <circle cx="72" cy="78" r="18" fill="#1a1020" stroke="#3a2e40" strokeWidth="1" />
    <circle cx="128" cy="78" r="18" fill="#1a1020" stroke="#3a2e40" strokeWidth="1" />

    {/* Iris */}
    <circle cx="72" cy="78" r="14" fill="url(#eye-glow)" />
    <circle cx="128" cy="78" r="14" fill="url(#eye-glow)" />

    {/* Pupil */}
    <circle cx="72" cy="78" r="7" fill="url(#pupil-grad)" />
    <circle cx="128" cy="78" r="7" fill="url(#pupil-grad)" />

    {/* Eye highlights */}
    <circle cx="67" cy="73" r="3" fill="white" opacity="0.7" />
    <circle cx="123" cy="73" r="3" fill="white" opacity="0.7" />
    <circle cx="76" cy="82" r="1.5" fill="white" opacity="0.4" />
    <circle cx="132" cy="82" r="1.5" fill="white" opacity="0.4" />

    {/* Beak */}
    <path d="M 95 92 L 100 105 L 105 92 Z" fill="#c45c26" />
    <path d="M 96 92 L 100 100 L 104 92 Z" fill="#e8a838" opacity="0.5" />

    {/* Chest feathers */}
    <ellipse cx="100" cy="135" rx="40" ry="35" fill="#1f1528" />
    <ellipse cx="100" cy="132" rx="35" ry="28" fill="#251a2e" />
    {/* Chest pattern */}
    {[...Array(5)].map((_, i) => (
      <ellipse
        key={`chest-${i}`}
        cx={85 + i * 8}
        cy={125 + (i % 2) * 8}
        rx="5"
        ry="7"
        fill="none"
        stroke="#3a2e40"
        strokeWidth="0.5"
        opacity="0.6"
      />
    ))}

    {/* Wings (folded) */}
    <path d="M 38 80 Q 25 120, 50 155 Q 60 140, 55 100 Z" fill="#1a1020" stroke="#2a1e30" strokeWidth="0.5" />
    <path d="M 162 80 Q 175 120, 150 155 Q 140 140, 145 100 Z" fill="#1a1020" stroke="#2a1e30" strokeWidth="0.5" />

    {/* Feet */}
    <path d="M 80 165 L 75 178 M 80 165 L 80 180 M 80 165 L 85 178" stroke="#c45c26" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M 120 165 L 115 178 M 120 165 L 120 180 M 120 165 L 125 178" stroke="#c45c26" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export default OwlSVG;
