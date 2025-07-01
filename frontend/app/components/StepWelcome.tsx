import React from "react";
import PheraxieAvatar from "../PheraxieAvatar";

interface StepWelcomeProps {
  onStart: () => void;
  pubIndex: number;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onStart, pubIndex }) => (
  <div style={{ maxWidth: 480, margin: "0 auto" }}>
    {/* Bloc message d'accueil + bouton */}
    <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 12px #2563eb22', textAlign: 'center', marginBottom: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#2563eb", marginBottom: 16 }}>Bienvenue sur Pheraxie Site</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#22223b' }}>
        Créez un site basique et personnalisable.<br />
        Vous pourrez toujours l'améliorer plus tard.
      </p>
      <button style={{ background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 10, padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', transition: 'background 0.2s, box-shadow 0.2s' }} onClick={onStart}>
        Commencer la création
      </button>
    </div>
    {/* Bloc Publicité séparé */}
    {pubIndex === 0 ? (
      <div style={{
        background: 'linear-gradient(90deg, #e0e7ff 0%, #f9fafb 100%)',
        borderRadius: 14,
        boxShadow: '0 2px 12px #a5b4fc33',
        maxWidth: 420,
        margin: '0 auto',
        padding: '1.2rem 1.2rem 1.2rem 1.2rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        border: '1.5px solid #c7d2fe',
        position: 'relative',
      }}>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PheraxieAvatar size={64} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 18, marginBottom: 2 }}>Publicité</div>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#22223b', marginBottom: 4 }}>Découvre <span style={{ color: '#f43f5e' }}>Pheraxie Mood</span> !</div>
          <div style={{ fontSize: 14, color: '#444', marginBottom: 10 }}>
            Avec Pheraxie Mood, ne restez plus seul face au stress : l'IA Pheraxie vous accompagne pour retrouver le calme, renforcer votre bien-être et libérer tout votre potentiel au quotidien.
          </div>
          <a href="https://pheraxie-mood.com" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#6366f1',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 8,
              padding: '0.7rem 1.5rem',
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 1px 4px #6366f133',
              transition: 'background 0.2s',
            }}
          >
            Découvrir
          </a>
        </div>
      </div>
    ) : (
      <div style={{
        background: 'linear-gradient(90deg, #e0e7ff 0%, #f9fafb 100%)',
        borderRadius: 14,
        boxShadow: '0 2px 12px #a5b4fc33',
        maxWidth: 420,
        margin: '0 auto',
        padding: '1.2rem 1.2rem 1.2rem 1.2rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        border: '1.5px solid #c7d2fe',
        position: 'relative',
      }}>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PheraxieAvatar size={64} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 18, marginBottom: 2 }}>Publicité</div>
          <div style={{ fontWeight: 600, fontSize: 16, color: '#22223b', marginBottom: 4 }}>Découvre <span style={{ color: '#f43f5e' }}>Pheraxie Verse</span> !</div>
          <div style={{ fontSize: 14, color: '#444', marginBottom: 10 }}>
            Pheraxie Verse est un jeu d'aventure où deux frères luttent pour sauver l'humanité, guidés par l'IA Pheraxie. Leur mission : retrouver les fragments de code capables de rétablir les robots devenus incontrôlables.
          </div>
          <a href="https://pheraxie-verse.com" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#6366f1',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 8,
              padding: '0.7rem 1.5rem',
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 1px 4px #6366f133',
              transition: 'background 0.2s',
            }}
          >
            Découvrir
          </a>
        </div>
      </div>
    )}
  </div>
);

export default StepWelcome; 