import React from 'react';

interface YopoyLogoProps {
  className?: string; // Additional classes for wrapper
  iconOnly?: boolean;  // Only show the emblem
  size?: number;       // Size of the emblem
  theme?: 'light' | 'dark';
}

export default function YopoyLogo({ className = '', iconOnly = false, size = 32, theme = 'dark' }: YopoyLogoProps) {
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Geometric YOPOY SVG Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transform hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Vibrant Purple/Violet Gradients matching the image */}
          <linearGradient id="purpleGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="50%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="purpleGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="arrowGrad" x1="0%" y1="80%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#311062" />
            <stop offset="50%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Shadow/Contrast background elements */}
        <path
          d="M32 60 L18 80 H40 L32 60 Z"
          fill="#111115"
        />

        {/* Right side black geometric block (under the arrow shaft shadow) */}
        <path
          d="M50 48 L72 38 L72 58 L50 78 Z"
          fill="#000000"
          stroke="#111115"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M50 74 L58 66 L58 84 L50 92 Z"
          fill="#000000"
        />

        {/* Left hand stylized "Y" bottom folds (M/V shape) in deep/vibrant purple */}
        <path
          d="M16 60 H40 L28 40 L16 60 Z"
          fill="url(#purpleGrad1)"
        />
        <path
          d="M40 35 L12 60 L24 85 L40 65 L40 45 L40 35 Z"
          fill="url(#purpleGrad2)"
          opacity="0.9"
        />

        {/* Diagonal purple arrow shaft running from bottom center/left upwards to the right */}
        <path
          d="M50 92 L38 92 L75 35 L88 35 Z"
          fill="url(#arrowGrad)"
        />

        {/* Arrow head pointing northeast */}
        <path
          d="M86 20 L66 32 L78 37 L86 20 Z"
          fill="url(#purpleGrad1)"
        />
        <path
          d="M86 20 L76 43 L78 37 L86 20 Z"
          fill="url(#purpleGrad2)"
        />

        {/* Inner geometric accent connection line/bars */}
        <path
          d="M24 35 H64 L50 50 L36 35 Z"
          fill="url(#purpleGrad1)"
          opacity="0.8"
        />
        <path
          d="M36 35 L45 44 L45 35 Z"
          fill="#ffffff"
          opacity="0.15"
        />
      </svg>

      {/* Sleek Typography for "yopoy" */}
      {!iconOnly && (
        <span className={`text-2xl font-black tracking-tight font-sans lowercase ${textColor}`}>
          yopoy
        </span>
      )}
    </div>
  );
}
