import React, { useEffect, useState } from 'react';

export default function SpotlightCursor() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="spotlight-cursor"
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
      }}
    >
      <style>{`
        .spotlight-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 700px;
          height: 700px;
          margin-top: -350px;
          margin-left: -350px;
          pointer-events: none;
          z-index: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(56, 189, 248, 0.08) 0%,
            rgba(99, 102, 241, 0.04) 35%,
            transparent 70%
          );
          transition: transform 0.06s ease-out;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
