import React from 'react';

interface FitnshapeLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  showTagline?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FitnshapeLogo: React.FC<FitnshapeLogoProps> = ({
  className = '',
  variant = 'horizontal',
  showTagline = false,
  theme = 'light',
  size = 'md',
}) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#132E22]';
  const taglineColor = theme === 'dark' ? 'text-emerald-300/80' : 'text-[#4A6B56]';

  const sizeDimensions = {
    sm: { markSize: 32, titleSize: 'text-lg', taglineSize: 'text-[9px]' },
    md: { markSize: 42, titleSize: 'text-2xl', taglineSize: 'text-[11px]' },
    lg: { markSize: 56, titleSize: 'text-3xl', taglineSize: 'text-xs' },
    xl: { markSize: 72, titleSize: 'text-4xl', taglineSize: 'text-sm' },
  }[size];

  const MarkSvg = (
    <svg
      viewBox="0 0 160 140"
      width={sizeDimensions.markSize}
      height={sizeDimensions.markSize * (140 / 160)}
      className="shrink-0 drop-shadow-sm select-none"
      aria-label="Fitnshape brand mark"
    >
      <defs>
        {/* Dynamic upper swoosh gradient */}
        <linearGradient id="fitSwooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5532C" />
          <stop offset="40%" stopColor="#E06B43" />
          <stop offset="100%" stopColor="#F99F38" />
        </linearGradient>

        {/* Figure gradient */}
        <linearGradient id="fitFigureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>

        {/* Exercise ball radial glow */}
        <radialGradient id="fitBallGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6B4A" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>

        {/* Roll mat gradient */}
        <linearGradient id="fitMatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="30%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      {/* Sweeping dynamic overhead arc */}
      <path
        d="M 28 88 C 45 60 70 28 115 24 C 132 22 144 32 142 42 C 140 48 132 44 125 38 C 96 32 60 48 34 82 Z"
        fill="url(#fitSwooshGrad)"
      />

      {/* Rolled fitness/yoga mat on left */}
      <g id="rolled-mat">
        <ellipse cx="44" cy="98" rx="8" ry="12" fill="url(#fitMatGrad)" transform="rotate(-20 44 98)" />
        <ellipse cx="43" cy="98" rx="5" ry="9" fill="#1E3A8A" transform="rotate(-20 43 98)" />
        <circle cx="43" cy="98" r="2.5" fill="#93C5FD" />
      </g>

      {/* Active silhouette human figure */}
      <g id="figure" fill="url(#fitFigureGrad)">
        {/* Head with athletic ponytail */}
        <circle cx="67" cy="68" r="6" />
        <path d="M 62 67 C 58 67 56 71 58 75 C 60 77 62 76 63 74 Z" />

        {/* Torso & Core in dynamic posture */}
        <path
          d="M 68 76 C 65 82 63 92 68 98 C 73 103 85 96 95 90 L 114 73 C 117 70 119 72 116 75 L 94 97 C 86 105 72 108 64 100 C 59 93 60 83 62 76 Z"
        />

        {/* Outstretched elevated legs */}
        <path
          d="M 72 98 C 84 94 98 84 116 70 C 119 68 122 71 119 74 L 102 91 C 92 100 80 102 72 98 Z"
        />

        {/* Arm supporting movement */}
        <path
          d="M 66 82 L 53 100 C 52 102 55 103 57 101 L 69 86 Z"
        />
      </g>

      {/* Stability fitness ball */}
      <circle cx="118" cy="88" r="18" fill="url(#fitBallGrad)" />
      {/* Light sheen on ball */}
      <ellipse cx="113" cy="80" rx="6" ry="3" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 113 80)" />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{MarkSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {MarkSvg}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className={`font-extrabold tracking-tight ${sizeDimensions.titleSize} ${textColor}`}>
            Fitn<span className="text-[#E06B43]">shape</span>
          </span>
          <span className="text-[#E06B43] font-bold text-xs ml-0.5 tracking-wider">.in</span>
        </div>
        {showTagline && (
          <span className={`font-medium tracking-wide uppercase ${sizeDimensions.taglineSize} ${taglineColor}`}>
            Move Better · Eat Better · Live Better
          </span>
        )}
      </div>
    </div>
  );
};
