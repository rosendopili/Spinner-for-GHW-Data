
import React, { useState, useEffect } from 'react';

interface SpinnerProps {
  participants: string[];
  colors: string[];
  isSpinning: boolean;
  winningIndex: number | null;
  onSpinEnd: () => void;
}

const SPINS = 10;
const SPIN_DURATION_MS = 7000;

// Helper to describe an SVG arc
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
  const start = {
    x: x + radius * Math.cos(startAngle),
    y: y + radius * Math.sin(startAngle)
  };
  const end = {
    x: x + radius * Math.cos(endAngle),
    y: y + radius * Math.sin(endAngle)
  };

  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
  const d = [
    "M", x, y,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
    "Z"
  ].join(" ");

  return d;
}

const Spinner: React.FC<SpinnerProps> = ({ participants, colors, isSpinning, winningIndex, onSpinEnd }) => {
  const [rotation, setRotation] = useState(0);
  const numParticipants = participants.length;
  const sliceAngle = numParticipants > 0 ? 360 / numParticipants : 360;
  
  useEffect(() => {
    if (isSpinning && winningIndex !== null) {
      const targetAngle = 360 - (winningIndex * sliceAngle + sliceAngle / 2);
      const totalRotation = (SPINS * 360) + targetAngle;
      
      setRotation(totalRotation);

      const spinTimeout = setTimeout(() => {
        onSpinEnd();
      }, SPIN_DURATION_MS);

      return () => clearTimeout(spinTimeout);
    } else if (!isSpinning) {
       // Keep final position but reset for next spin logic
       const finalRotation = rotation % 360;
       setRotation(finalRotation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning, winningIndex]);

  const renderSlices = () => {
    if (numParticipants === 0) {
      return <circle cx="250" cy="250" r="240" fill="#334155" />;
    }
    
    return participants.map((_, index) => {
      const startAngleRad = (index * sliceAngle - 90) * (Math.PI / 180);
      const endAngleRad = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
      
      return (
        <path
          key={index}
          d={describeArc(250, 250, 240, startAngleRad, endAngleRad)}
          fill={colors[index % colors.length]}
          stroke="#475569"
          strokeWidth="2"
        />
      );
    });
  };

  return (
    <div className="w-full h-full">
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full drop-shadow-2xl"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none'
        }}
      >
        <g>
          {renderSlices()}
          <circle cx="250" cy="250" r="30" fill="#1e293b" stroke="#475569" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
