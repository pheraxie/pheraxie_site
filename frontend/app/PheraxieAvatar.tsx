import React, { useEffect, useRef } from 'react';

interface PheraxieAvatarProps {
  talking?: boolean;
  size?: number;
  emotion?: 'smile' | 'neutral' | 'surprise';
  animated?: boolean;
  halo?: boolean;
}

export default function PheraxieAvatar({ talking = false, size = 120, emotion = 'smile' }: PheraxieAvatarProps) {
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);

  // Animation clignement yeux
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    function blink() {
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.setAttribute('r', '5');
        rightEyeRef.current.setAttribute('r', '5');
        setTimeout(() => {
          leftEyeRef.current?.setAttribute('r', '10');
          rightEyeRef.current?.setAttribute('r', '10');
          blinkTimeout = setTimeout(blink, 2000 + Math.random() * 2000);
        }, 120);
      }
    }
    blinkTimeout = setTimeout(blink, 1800);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Animation bouche (parole + émotion)
  useEffect(() => {
    if (!mouthRef.current) return;
    if (emotion === 'surprise') {
      mouthRef.current.setAttribute('d', 'M70 95 a7 7 0 1 0 0.1 0'); // bouche en O
    } else if (emotion === 'neutral') {
      mouthRef.current.setAttribute('d', 'M60 95 Q70 97 80 95'); // bouche droite
    } else {
      // Sourire plat et doux par défaut (légère courbe)
      mouthRef.current.setAttribute('d', 'M60 95 Q70 102 80 95');
    }
  }, [talking, emotion]);

  return (
    <span
      style={{
        display: 'inline-block',
        width: size ?? 56,
        height: size ?? 56,
        borderRadius: '50%',
        background: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <svg
        width={size ?? 56}
        height={size ?? 56}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Halo lumineux animé */}
        <circle cx="70" cy="70" r="64" fill="none" stroke="#6366f1" strokeWidth="4" opacity="0.18">
          <animate attributeName="r" values="64;68;64" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.28;0.18" dur="2.2s" repeatCount="indefinite" />
        </circle>
        {/* Corps/visage robot */}
        <ellipse cx="70" cy="75" rx="55" ry="50" fill="#eaf1fb" stroke="#6366f1" strokeWidth="3" />
        {/* Casque/oreilles */}
        <ellipse cx="20" cy="75" rx="8" ry="18" fill="#b6c6e3" stroke="#6366f1" strokeWidth="2" />
        <ellipse cx="120" cy="75" rx="8" ry="18" fill="#b6c6e3" stroke="#6366f1" strokeWidth="2" />
        {/* Antenne */}
        <rect x="66" y="18" width="8" height="18" rx="4" fill="#6366f1" />
        <circle cx="70" cy="16" r="6" fill="#fff" stroke="#6366f1" strokeWidth="2" />
        {/* Yeux */}
        <circle ref={leftEyeRef} cx="50" cy="80" r="10" fill="#22223b" />
        <circle ref={rightEyeRef} cx="90" cy="80" r="10" fill="#22223b" />
        {/* Reflet yeux */}
        <circle cx="53" cy="77" r="2.5" fill="#fff" opacity="0.7" />
        <circle cx="93" cy="77" r="2.5" fill="#fff" opacity="0.7" />
        {/* Bouche (émotion) */}
        <path ref={mouthRef} d="M60 90 Q70 110 80 90" stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Menton */}
        <ellipse cx="70" cy="110" rx="16" ry="5" fill="#dbeafe" opacity="0.7" />
      </svg>
    </span>
  );
} 