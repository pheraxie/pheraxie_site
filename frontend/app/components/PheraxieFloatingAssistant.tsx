import PheraxieAvatar from "../PheraxieAvatar";

interface PheraxieFloatingAssistantProps {
  step: number;
  iaComplimentsByStep: { [step: number]: { msg: string; emotion: 'smile' | 'neutral' | 'surprise' } };
  onOpenChatbot: () => void;
}

function PheraxieFloatingAssistant({ step, iaComplimentsByStep, onOpenChatbot }: PheraxieFloatingAssistantProps) {
  const message = iaComplimentsByStep[step]?.msg || "Je suis là si tu as besoin d'aide !";
  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', gap: 16 }} onClick={onOpenChatbot}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #b6c6e355', padding: '1rem 1.3rem', fontSize: '1.1rem', fontWeight: 500, color: '#222', maxWidth: 320, marginBottom: 8 }}>
        {message}
      </div>
      <PheraxieAvatar size={64} emotion={iaComplimentsByStep[step]?.emotion || 'smile'} />
    </div>
  );
}

export default PheraxieFloatingAssistant; 