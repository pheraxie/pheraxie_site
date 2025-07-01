import React from "react";

interface StyleChoice {
  key: string;
  label: string;
  description: string;
  colors: string[];
}

interface Compliment {
  msg: string;
  emotion: 'smile' | 'neutral' | 'surprise';
}

interface StepStyleProps {
  styleChoices: StyleChoice[];
  selectedStyle: string | null;
  setSelectedStyle: (style: string) => void;
  onNext: () => void;
  onBack: () => void;
  complimentsStyle: Record<string, Compliment[]>;
  setIaComplimentsByStep: (fn: (prev: any) => any) => void;
}

const StepStyle: React.FC<StepStyleProps> = ({ styleChoices, selectedStyle, setSelectedStyle, onNext, onBack, complimentsStyle, setIaComplimentsByStep }) => (
  <div style={{ maxWidth: 600, margin: "0 auto" }}>
    <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 24 }}>Quel style visuel préfères-tu ?</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
      {styleChoices.map((style) => (
        <div
          key={style.key}
          style={{
            background: selectedStyle === style.key ? '#e0e7ff' : '#fff',
            border: selectedStyle === style.key ? '2px solid #2563eb' : '1px solid #ddd',
            borderRadius: 16,
            boxShadow: selectedStyle === style.key ? '0 4px 24px #2563eb33' : '0 2px 12px #0001',
            padding: '1.2rem 1.2rem 1rem 1.2rem',
            minWidth: 140,
            maxWidth: 200,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
            position: 'relative',
            outline: selectedStyle === style.key ? '2px solid #2563eb' : 'none',
          }}
          onClick={() => {
            setSelectedStyle(style.key);
            const arr = complimentsStyle[style.key as keyof typeof complimentsStyle] || complimentsStyle.moderne;
            const c = arr[Math.floor(Math.random() * arr.length)];
            setIaComplimentsByStep((prev: any) => ({ ...prev, 2: { ...c, emotion: c.emotion as 'smile' | 'neutral' | 'surprise' } }));
          }}
          tabIndex={0}
        >
          <span style={{ fontWeight: 600, fontSize: 18 }}>{style.label}</span>
          <span style={{ fontSize: '1rem', color: '#555', marginBottom: 8, textAlign: 'center' }}>{style.description}</span>
          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.2rem' }}>
            {style.colors.map((color, idx) => (
              <span key={idx} style={{ width: 18, height: 18, borderRadius: '50%', background: color, display: 'inline-block', border: '1px solid #eee' }} />
            ))}
          </div>
          {selectedStyle === style.key && (
            <span style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 2px 8px #2563eb33' }}>✔</span>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
      <button onClick={onBack} style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Retour</button>
      <button onClick={onNext} disabled={!selectedStyle} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: !selectedStyle ? 'not-allowed' : 'pointer', opacity: !selectedStyle ? 0.6 : 1 }}>Suivant</button>
    </div>
  </div>
);

export default StepStyle; 