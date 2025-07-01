import React from "react";

interface SiteType {
  key: string;
  label: string;
  description: string;
  emoji: string;
}

interface StepTypeProps {
  siteTypes: SiteType[];
  selectedType: string | null;
  setSelectedType: (type: string) => void;
  onNext: () => void;
  onBack: () => void;
  complimentsType: { msg: string; emotion: 'smile' | 'neutral' | 'surprise' }[];
  setIaComplimentsByStep: (fn: (prev: any) => any) => void;
}

const StepType: React.FC<StepTypeProps> = ({ siteTypes, selectedType, setSelectedType, onNext, onBack, complimentsType, setIaComplimentsByStep }) => (
  <div style={{ maxWidth: 600, margin: "0 auto" }}>
    <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 24 }}>Quel type de site veux-tu créer ?</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
      {siteTypes.map((type) => (
        <div
          key={type.key}
          style={{
            background: selectedType === type.key ? '#e0e7ff' : '#fff',
            border: selectedType === type.key ? '2px solid #2563eb' : '1px solid #ddd',
            borderRadius: 16,
            boxShadow: selectedType === type.key ? '0 4px 24px #2563eb33' : '0 2px 12px #0001',
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
            outline: selectedType === type.key ? '2px solid #2563eb' : 'none',
          }}
          onClick={() => {
            setSelectedType(type.key);
            const c = complimentsType[Math.floor(Math.random() * complimentsType.length)];
            setIaComplimentsByStep((prev: any) => ({ ...prev, 1: { ...c, emotion: c.emotion as 'smile' | 'neutral' | 'surprise' } }));
          }}
          tabIndex={0}
        >
          <span style={{ fontSize: '2.2rem', marginBottom: 8 }}>{type.emoji}</span>
          <span style={{ fontWeight: 600, fontSize: 18 }}>{type.label}</span>
          <span style={{ fontSize: '1rem', color: '#555', marginTop: 4, textAlign: 'center' }}>{type.description}</span>
          {selectedType === type.key && (
            <span style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 2px 8px #2563eb33' }}>✔</span>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
      <button onClick={onBack} style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Retour</button>
      <button onClick={onNext} disabled={!selectedType} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: !selectedType ? 'not-allowed' : 'pointer', opacity: !selectedType ? 0.6 : 1 }}>Suivant</button>
    </div>
  </div>
);

export default StepType; 