import React from "react";

interface Compliment {
  msg: string;
  emotion: 'smile' | 'neutral' | 'surprise';
}

interface StepPersonnalisationProps {
  siteName: string;
  setSiteName: (name: string) => void;
  siteSlogan: string;
  setSiteSlogan: (slogan: string) => void;
  coverImage: string | null;
  setCoverImage: (img: string | null) => void;
  onNext: () => void;
  onBack: () => void;
  complimentsPersonnalisation: Compliment[];
  setIaComplimentsByStep: (fn: (prev: any) => any) => void;
}

const StepPersonnalisation: React.FC<StepPersonnalisationProps> = ({ siteName, setSiteName, siteSlogan, setSiteSlogan, coverImage, setCoverImage, onNext, onBack, complimentsPersonnalisation, setIaComplimentsByStep }) => (
  <div style={{ maxWidth: 520, margin: "0 auto" }}>
    <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 24 }}>Personnalise ton site</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div>
        <label style={{ fontWeight: 500 }}>Nom du site *</label>
        <input
          type="text"
          value={siteName}
          onChange={e => {
            setSiteName(e.target.value);
            const c = complimentsPersonnalisation[Math.floor(Math.random() * complimentsPersonnalisation.length)];
            setIaComplimentsByStep(prev => ({ ...prev, 4: { ...c, emotion: c.emotion as 'smile' | 'neutral' | 'surprise' } }));
          }}
          placeholder="Ex: Mon super site"
          style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 4 }}
          required
        />
      </div>
      <div>
        <label style={{ fontWeight: 500 }}>Slogan (optionnel)</label>
        <input
          type="text"
          value={siteSlogan}
          onChange={e => {
            setSiteSlogan(e.target.value);
            const c = complimentsPersonnalisation[Math.floor(Math.random() * complimentsPersonnalisation.length)];
            setIaComplimentsByStep(prev => ({ ...prev, 4: { ...c, emotion: c.emotion as 'smile' | 'neutral' | 'surprise' } }));
          }}
          placeholder="Ex: Le site qui vous ressemble !"
          style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 4 }}
        />
      </div>
      <div>
        <label style={{ fontWeight: 500 }}>Logo ou image de couverture (optionnel)</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = ev => setCoverImage(ev.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
          style={{ marginTop: 4 }}
        />
        {coverImage && (
          <img src={coverImage} alt="aperçu" style={{ marginTop: 8, maxWidth: '100%', maxHeight: 120, borderRadius: 8, boxShadow: '0 1px 4px #0001' }} />
        )}
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
      <button onClick={onBack} style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Retour</button>
      <button onClick={onNext} disabled={siteName.trim() === ""} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 600, cursor: siteName.trim() === "" ? 'not-allowed' : 'pointer', opacity: siteName.trim() === "" ? 0.6 : 1 }}>Suivant</button>
    </div>
  </div>
);

export default StepPersonnalisation; 