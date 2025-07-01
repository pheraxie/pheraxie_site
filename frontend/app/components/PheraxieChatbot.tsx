import PheraxieAvatar from "../PheraxieAvatar";

interface PheraxieChatbotProps {
  open: boolean;
  onClose: () => void;
}

export default function PheraxieChatbot({ open, onClose }: PheraxieChatbotProps) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#22223bcc', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #0005', width: 420, maxWidth: '95vw', minHeight: 420, padding: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 28, color: '#6366f1', cursor: 'pointer', zIndex: 10 }}>&times;</button>
        <div style={{ padding: '2.5rem 1.5rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <PheraxieAvatar size={72} animated halo />
          <h2 style={{ margin: '1.2rem 0 0.5rem 0', fontWeight: 700, fontSize: '1.3rem', color: '#22223b' }}>Pheraxie, ton assistant IA</h2>
          <div style={{ marginTop: 16, color: '#444', fontSize: '1.05rem', textAlign: 'center' }}>
            <p>Pose-moi toutes tes questions ou demande une personnalisation avancée !</p>
            <p style={{ fontSize: '0.98rem', color: '#6366f1', marginTop: 8 }}><i>(Le vrai chat IA arrive bientôt...)</i></p>
          </div>
        </div>
      </div>
    </div>
  );
} 