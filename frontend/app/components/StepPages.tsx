import React from "react";

interface PageChoice {
  key: string;
  label: string;
  description: string;
}

interface Compliment {
  msg: string;
  emotion: 'smile' | 'neutral' | 'surprise';
}

interface StepPagesProps {
  pageChoices: PageChoice[];
  selectedPages: string[];
  setSelectedPages: (pages: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  complimentsPages: Compliment[];
  setIaComplimentsByStep: (fn: (prev: any) => any) => void;
}

const StepPages: React.FC<StepPagesProps> = ({ pageChoices, selectedPages, setSelectedPages, onNext, onBack, complimentsPages, setIaComplimentsByStep }) => (
  <div style={{ maxWidth: 600, margin: "0 auto" }}>
    <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 24 }}>Quelles pages veux-tu inclure ?</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
      {pageChoices.map((page) => (
        <div
          key={page.key}
          style={{
            background: selectedPages.includes(page.key) ? '#e0e7ff' : '#fff',
            border: selectedPages.includes(page.key) ? '2px solid #2563eb' : '1px solid #ddd',
            borderRadius: 16,
            boxShadow: selectedPages.includes(page.key) ? '0 4px 24px #2563eb33' : '0 2px 12px #0001',
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
            outline: selectedPages.includes(page.key) ? '2px solid #2563eb' : 'none',
          }}
          onClick={() => {
            const already = selectedPages.includes(page.key);
            const newPages = already ? selectedPages.filter(p => p !== page.key) : [...selectedPages, page.key];
            setSelectedPages(newPages);
          }}
          tabIndex={0}
        >
          <span style={{ fontWeight: 600, fontSize: 18 }}>{page.label}</span>
          <span style={{ fontSize: '1rem', color: '#555', marginTop: 4, textAlign: 'center' }}>{page.description}</span>
          {selectedPages.includes(page.key) && (
            <span style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 2px 8px #2563eb33' }}>✔</span>
          )}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
      <button onClick={onBack} style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Retour</button>
      <button onClick={() => {
        const c = complimentsPages[Math.floor(Math.random() * complimentsPages.length)];
        setIaComplimentsByStep((prev: any) => ({ ...prev, 3: { ...c, emotion: c.emotion as 'smile' | 'neutral' | 'surprise' } }));
        onNext();
      }} disabled={selectedPages.length === 0} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: selectedPages.length === 0 ? 'not-allowed' : 'pointer', opacity: selectedPages.length === 0 ? 0.6 : 1 }}>Suivant</button>
    </div>
  </div>
);

export default StepPages; 