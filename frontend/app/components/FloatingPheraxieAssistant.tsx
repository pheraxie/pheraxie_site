import PheraxieAssistant from "../PheraxieAssistant";
import React from "react";

interface FloatingPheraxieAssistantProps {
  step: number;
}

const FloatingPheraxieAssistant: React.FC<FloatingPheraxieAssistantProps> = ({ step }) => {
  if (step !== 0) return null;
  let bottom = 32;
  let right = 32;
  let size = 56;
  if (typeof window !== 'undefined' && window.innerWidth < 600) {
    bottom = 140; // encore plus haut sur mobile
    right = 12;
    size = 44;
  }
  return (
    <div
      style={{
        position: 'fixed',
        bottom,
        right,
        zIndex: 1200
      }}
    >
      <PheraxieAssistant
        message="Bienvenue ! Je suis là pour t'aider à personnaliser ton site. Clique sur 'Commencer la création' pour débuter."
        emotion="smile"
        talking={true}
        size={size}
      />
    </div>
  );
};

export default FloatingPheraxieAssistant; 