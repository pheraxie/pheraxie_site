import React from 'react';

interface PheraxieLogoProps {
  size?: number;
}

export default function PheraxieLogo({ size = 56 }: PheraxieLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Visage robot sans halo, sans fond, sans animation */}
      <ellipse cx="70" cy="75" rx="55" ry="50" fill="#eaf1fb" stroke="#6366f1" strokeWidth="3" />
      {/* Casque/oreilles */}
      <ellipse cx="20" cy="75" rx="8" ry="18" fill="#b6c6e3" stroke="#6366f1" strokeWidth="2" />
      <ellipse cx="120" cy="75" rx="8" ry="18" fill="#b6c6e3" stroke="#6366f1" strokeWidth="2" />
      {/* Antenne */}
      <rect x="66" y="18" width="8" height="18" rx="4" fill="#6366f1" />
      <circle cx="70" cy="16" r="6" fill="#fff" stroke="#6366f1" strokeWidth="2" />
      {/* Yeux statiques */}
      <circle cx="50" cy="80" r="10" fill="#22223b" />
      <circle cx="90" cy="80" r="10" fill="#22223b" />
      {/* Reflet yeux */}
      <circle cx="53" cy="77" r="2.5" fill="#fff" opacity="0.7" />
      <circle cx="93" cy="77" r="2.5" fill="#fff" opacity="0.7" />
      {/* Bouche douce */}
      <path d="M60 95 Q70 102 80 95" stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
} 