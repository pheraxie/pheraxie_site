import PheraxieLogo from "../PheraxieLogo";
import styles from "../page.module.css";

interface NavBarProps {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  navLinks: { label: string; onClick: () => void }[];
  userLinks: { label: string; onClick: () => void }[];
}

export default function NavBar({ isMobile, isMobileMenuOpen, setIsMobileMenuOpen, navLinks, userLinks }: NavBarProps) {
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '14px 32px', boxSizing: 'border-box', zIndex: 1000, background: '#eaf1fb', boxShadow: '0 2px 12px #b6c6e355', minHeight: 64, borderBottom: '1px solid #b6c6e3',
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
  );
} 