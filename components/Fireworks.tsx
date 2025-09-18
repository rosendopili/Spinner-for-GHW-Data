import React, { useMemo } from 'react';

interface FireworksProps {
    isActive: boolean;
}

const FIREWORK_COUNT = 8;
const PARTICLE_COUNT = 25;
const COLORS = ['#facc15', '#a3e635', '#4ade80', '#38bdf8', '#818cf8', '#e879f9', '#ec4899', '#f87171'];

const Firework: React.FC<{ index: number }> = ({ index }) => {
    const boxShadow = useMemo(() => {
        let shadow = '';
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 60 + 30;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            shadow += `${x}px ${y}px 0 -1px ${color}${i === PARTICLE_COUNT - 1 ? '' : ','}\n`;
        }
        return shadow;
    }, []);

    const style: React.CSSProperties = {
        position: 'fixed',
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 50 + 10}%`,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        boxShadow,
        animation: `firework-explode 1.2s ease-out forwards`,
        animationDelay: `${Math.random() * 1 + index * 0.1}s`,
    };

    return <div style={style} />;
}

const Fireworks: React.FC<FireworksProps> = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: FIREWORK_COUNT }).map((_, index) => (
                <Firework key={index} index={index} />
            ))}
        </div>
    );
};

export default Fireworks;