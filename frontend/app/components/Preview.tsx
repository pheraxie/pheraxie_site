interface PreviewProps {
  siteName: string;
  siteSlogan: string;
  coverImage: string | null;
  selectedStyle: string | null;
  selectedPages: string[];
}
const styleThemes: Record<string, { bg: string; color: string }> = {
  moderne: { bg: '#6366f1', color: '#fff' },
  classique: { bg: '#1e293b', color: '#fff' },
  fun: { bg: '#f43f5e', color: '#fff' },
  pro: { bg: '#0ea5e9', color: '#fff' },
};
export default function Preview({ siteName, siteSlogan, coverImage, selectedStyle, selectedPages }: PreviewProps) {
  const theme = selectedStyle ? styleThemes[selectedStyle] : { bg: '#e0e7ef', color: '#222' };
  return (
    <div style={{ background: theme.bg, color: theme.color, borderRadius: 16, padding: 32, margin: '2rem auto', maxWidth: 600, boxShadow: '0 2px 12px #0002', textAlign: 'center' }}>
      {coverImage && (
        <img src={coverImage} alt="cover" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
      )}
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>{siteName || 'Mon site'}</h2>
      {siteSlogan && <p style={{ fontSize: '1.1rem', marginBottom: 16 }}>{siteSlogan}</p>}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
        {selectedPages.map(page => (
          <span key={page} style={{ background: '#fff3', color: theme.color, borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem' }}>{page}</span>
        ))}
      </div>
    </div>
  );
} 