"use client";
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import PheraxieLogo from '../PheraxieLogo';
import styles from '../page.module.css';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updateNavHeight = useCallback(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  useLayoutEffect(() => {
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, [updateNavHeight]);

  useEffect(() => {
    setDrafts(JSON.parse(localStorage.getItem('pheraxie_drafts') || '[]'));
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deleteDraft = (idx: number) => {
    const newDrafts = drafts.slice();
    newDrafts.splice(idx, 1);
    setDrafts(newDrafts);
    localStorage.setItem('pheraxie_drafts', JSON.stringify(newDrafts));
  };

  const loadDraft = (draft: any) => {
    localStorage.setItem('pheraxie_draft_to_load', JSON.stringify(draft));
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'Accueil', onClick: () => { window.location.href = '/'; } },
    { label: 'Brouillon', onClick: () => { window.location.href = '/drafts'; } },
    { label: 'Projet', onClick: () => { window.location.href = '/projet'; } },
    { label: 'Paramètres', onClick: () => { window.location.href = '/parametre'; } },
  ];

  const userLinks = [
    { label: 'Log in', onClick: () => {/* TODO: ouvrir login */} },
    { label: 'Sign up', onClick: () => {/* TODO: ouvrir signup */} },
  ];

  return (
    <div className={styles.page}>
      <div
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '14px 32px',
          boxSizing: 'border-box',
          zIndex: 1000,
          background: '#eaf1fb',
          boxShadow: '0 2px 12px #b6c6e355',
          minHeight: 64,
          borderBottom: '1px solid #b6c6e3',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PheraxieLogo size={56} />
          <span style={{ fontWeight: 700, fontSize: '1.3rem', marginLeft: 16, color: '#22223b', letterSpacing: '0.5px' }}>Pheraxie Site</span>
        </div>
        <div style={{ flex: 1 }} />
        {isMobile ? (
          <>
            <div style={{ marginLeft: 12, display: 'flex', alignItems: 'center' }}>
              <button aria-label="Compte utilisateur" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={userLinks[0].onClick}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="10" r="5.5" stroke="#6366f1" strokeWidth="2" />
                  <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div style={{ flex: 1 }} />
            <button
              aria-label="Ouvrir le menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              onClick={() => setIsMobileMenuOpen(v => !v)}
            >
              <svg width="32" height="32" viewBox="0 0 32 32"><rect y="6" width="32" height="4" rx="2" fill="#6366f1"/><rect y="14" width="32" height="4" rx="2" fill="#6366f1"/><rect y="22" width="32" height="4" rx="2" fill="#6366f1"/></svg>
            </button>
            {isMobileMenuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 16, background: '#fff', boxShadow: '0 2px 12px #b6c6e355', borderRadius: 12, minWidth: 140, padding: 8, zIndex: 2000 }}>
                {navLinks.map(link => (
                  <button
                    key={link.label}
                    style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: '0.7rem 1rem', textAlign: 'left', fontWeight: 600, color: '#2563eb', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => { link.onClick(); setIsMobileMenuOpen(false); }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', gap: 12, marginLeft: 0, justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                style={{ background: '#e0e7ff', color: '#3730a3', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={link.onClick}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 24 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="10" r="5.5" stroke="#6366f1" strokeWidth="2" />
                <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" stroke="#6366f1" strokeWidth="2" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button
                  style={{ background: 'none', color: '#6366f1', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.1rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', lineHeight: 1.1, whiteSpace: 'nowrap' }}
                  onClick={userLinks[0].onClick}
                >
                  Log in
                </button>
                <button
                  style={{ background: 'none', color: '#6366f1', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.1rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', lineHeight: 1.1, whiteSpace: 'nowrap' }}
                  onClick={userLinks[1].onClick}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <main className={styles.main} style={{ paddingTop: navHeight }}>
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#f9f9f9', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Mes brouillons</h2>
      {drafts.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888' }}>Aucun brouillon enregistré.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {drafts.map((draft, idx) => (
            <li key={idx} style={{ background: '#fff', borderRadius: 8, marginBottom: 16, padding: 16, boxShadow: '0 1px 4px #0001', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{draft.siteName || 'Sans nom'}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{new Date(draft.date).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }} onClick={() => loadDraft(draft)}>Charger</button>
                <button style={{ background: '#f43f5e', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }} onClick={() => deleteDraft(idx)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
        </div>
      </main>
      <footer style={{
        width: '100%',
        background: '#eaf1fb',
        borderTop: '1px solid #b6c6e3',
        padding: '1.2rem 0',
        textAlign: 'center',
        color: '#3730a3',
        fontSize: '1.05rem',
        marginTop: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
        <div className={styles.footer}>
          <a href="https://web.facebook.com/profile.php?id=61577956103546" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span className={styles.socialText}>Facebook</span>
          </a>
          <a href="https://www.instagram.com/pheraxie/" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            <span className={styles.socialText}>Instagram</span>
          </a>
          <a href="mailto:pheraxieapp@gmail.com" style={{ color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
            <span className={styles.socialText}>pheraxieapp@gmail.com</span>
          </a>
        </div>
        <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>© {new Date().getFullYear()} Pheraxie. Tous droits réservés.</div>
      </footer>
    </div>
  );
} 