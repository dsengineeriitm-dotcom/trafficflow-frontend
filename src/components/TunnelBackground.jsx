import React from "react";

/* 
  Lightweight CSS-only tunnel animation.
  Replaces the heavy Three.js WebGL version (~140KB savings).
  Uses layered CSS rings with keyframe animations to create the same
  infinite-tunnel / vortex effect.
*/

const tunnelStyles = `
@keyframes tunnelPulse {
  0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
  10% { opacity: 0.6; }
  80% { opacity: 0.15; }
  100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
}

@keyframes tunnelRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes tunnelDrift {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-48%, -52%) rotate(90deg); }
  50% { transform: translate(-50%, -48%) rotate(180deg); }
  75% { transform: translate(-52%, -50%) rotate(270deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes particleFloat {
  0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
  20% { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(1); }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translate(calc(var(--dx) * 3), calc(var(--dy) * 3)) scale(0.2); }
}
`;

function TunnelRings() {
  const rings = [];
  const ringCount = 18;
  
  for (let i = 0; i < ringCount; i++) {
    const delay = (i / ringCount) * 6;
    const size = 60 + i * 15;
    const borderWidth = Math.max(1, 3 - i * 0.15);
    const dotted = i % 3 === 0;
    
    rings.push(
      <div
        key={`ring-${i}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${borderWidth}px ${dotted ? 'dotted' : 'solid'} rgba(0, 212, 255, ${0.25 - i * 0.012})`,
          animation: `tunnelPulse 6s ${delay}s ease-out infinite`,
          transform: 'translate(-50%, -50%) scale(0.1)',
          boxShadow: i % 4 === 0 ? `0 0 ${8 + i}px rgba(124, 58, 237, 0.15)` : 'none',
        }}
      />
    );
  }
  return rings;
}

function FloatingParticles() {
  const particles = [];
  const count = 24;
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const rad = angle * (Math.PI / 180);
    const dx = Math.cos(rad) * (40 + (i % 5) * 20);
    const dy = Math.sin(rad) * (40 + (i % 5) * 20);
    const delay = (i / count) * 8;
    const size = 2 + (i % 3);
    
    particles.push(
      <div
        key={`particle-${i}`}
        style={{
          '--dx': `${dx}px`,
          '--dy': `${dy}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: size,
          height: size,
          borderRadius: '50%',
          background: i % 2 === 0
            ? 'rgba(0, 212, 255, 0.7)'
            : 'rgba(124, 58, 237, 0.7)',
          animation: `particleFloat ${4 + (i % 3)}s ${delay}s ease-in-out infinite`,
          boxShadow: `0 0 ${4 + size}px ${i % 2 === 0 ? 'rgba(0,212,255,0.4)' : 'rgba(124,58,237,0.4)'}`,
        }}
      />
    );
  }
  return particles;
}

export default function TunnelBackground({ children }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}>
      <style>{tunnelStyles}</style>
      
      {/* Central rotating glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
        animation: 'tunnelDrift 20s linear infinite',
        transform: 'translate(-50%, -50%)',
      }} />
      
      {/* Spinning grid lines */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '140%',
        height: '140%',
        transform: 'translate(-50%, -50%)',
        animation: 'tunnelRotate 60s linear infinite',
        opacity: 0.06,
        backgroundImage: `
          linear-gradient(0deg, rgba(0,212,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />
      
      {/* Tunnel rings */}
      <TunnelRings />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
