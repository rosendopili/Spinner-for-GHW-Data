import React from 'react';

interface ConfettiProps {
  isActive: boolean;
}

const CONFETTI_COLORS = [
  '#ec4899', '#f87171', '#fb923c', '#facc15', '#a3e635',
  '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
  '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9'
];

const CONFETTI_COUNT = 150;

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    width: `${Math.random() * 8 + 6}px`,
    height: `${Math.random() * 8 + 6}px`,
    backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    top: '-20px',
    left: `${Math.random() * 100}vw`,
    opacity: 1,
    transform: `rotate(${Math.random() * 360}deg)`,
    animation: `fall ${Math.random() * 3 + 4}s linear ${Math.random() * 5}s forwards`,
  };

  return <div style={style} />;
};

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: CONFETTI_COUNT }).map((_, index) => (
        <ConfettiPiece key={index} index={index} />
      ))}
    </div>
  );
};

export default Confetti;