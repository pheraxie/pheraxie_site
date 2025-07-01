import React from 'react';
import PheraxieAvatar from './PheraxieAvatar';

interface PheraxieAssistantProps {
  message: string;
  position?: React.CSSProperties; // ex: { bottom: 32, right: 32, position: 'fixed' }
  emotion?: 'smile' | 'neutral' | 'surprise';
  talking?: boolean;
  size?: number;
}

export default function PheraxieAssistant({ message, position, emotion = 'smile', talking = false, size = 100 }: PheraxieAssistantProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', zIndex: 1000,
      ...position,
      transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
    }}>
      <PheraxieAvatar emotion={emotion} talking={talking} size={size} />
      <div style={{
        marginLeft: 18,
        background: '#fff',
        color: '#22223b',
        borderRadius: 16,
        boxShadow: '0 2px 12px #0002',
        padding: '1rem 1.2rem',
        fontSize: 17,
        maxWidth: 320,
        minWidth: 80,
        animation: 'pheraxie-bubble-in 0.5s',
        position: 'relative',
      }}>
        <span>{message}</span>
        <span style={{
          position: 'absolute', left: -18, top: 36, width: 0, height: 0,
          borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '18px solid #fff',
        }} />
      </div>
      <style>{`
        @keyframes pheraxie-bubble-in {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
} 