import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

interface FloatingLetter {
  id: string;
  letter: string;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}

export default function Home() {
  const router = useRouter();
  const text = "It's Complicated";
  
  const [letters, setLetters] = useState<FloatingLetter[]>(
    text.split('').map((letter, i) => ({
      id: `${i}`,
      letter,
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
    }))
  );
  
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const handleClickLetters = () => {
    if (isAnimating || letters.length === 0) return;
    setIsAnimating(true);

    const velocities = letters.map(() => ({
      vx: (Math.random() - 0.5) * 15,
      vy: -Math.random() * 8 - 3,
    }));

    let frame = 0;
    const maxFrames = 600; // 5x slower

    const animate = () => {
      frame++;
      setLetters((prev) =>
        prev.map((letter, idx) => {
          const vel = velocities[idx];
          return {
            ...letter,
            x: vel.vx * frame * 0.5,
            y: vel.vy * frame * 0.5 + frame * frame * 0.02,
            rotation: frame * 2,
            opacity: Math.max(0, 1 - frame / maxFrames),
          };
        })
      );

      if (frame < maxFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => router.push('/offerings'), 300);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animate();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFB6D9 100%)',
      }}
      onClick={handleClickLetters}
    >
      {/* Fluffy pink clouds background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {/* Cloud shapes with pink tint */}
          <ellipse cx="150" cy="100" rx="120" ry="60" fill="rgba(255, 192, 203, 0.4)" />
          <ellipse cx="200" cy="80" rx="100" ry="50" fill="rgba(255, 182, 193, 0.5)" />
          <ellipse cx="100" cy="120" rx="90" ry="45" fill="rgba(255, 202, 213, 0.4)" />
          
          <ellipse cx="800" cy="150" rx="140" ry="70" fill="rgba(255, 192, 203, 0.4)" />
          <ellipse cx="880" cy="130" rx="110" ry="55" fill="rgba(255, 182, 193, 0.5)" />
          <ellipse cx="750" cy="170" rx="100" ry="50" fill="rgba(255, 202, 213, 0.4)" />
          
          <ellipse cx="400" cy="500" rx="130" ry="65" fill="rgba(255, 192, 203, 0.35)" />
          <ellipse cx="470" cy="480" rx="105" ry="52" fill="rgba(255, 182, 193, 0.45)" />
          <ellipse cx="350" cy="520" rx="95" ry="48" fill="rgba(255, 202, 213, 0.35)" />
        </svg>
      </div>

      {/* Main text content - perfectly centered */}
      <div className="relative z-10 text-center">
        <div
          className="flex gap-0 items-baseline justify-center"
          style={{
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            transition: isAnimating ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {letters.map((letter) => (
            <span
              key={letter.id}
              style={{
                fontSize: '360px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                display: 'inline-block',
                transform: `translateX(${letter.x}px) translateY(${letter.y}px) rotate(${letter.rotation}deg)`,
                opacity: letter.opacity,
                transition: isAnimating ? 'none' : 'all 0.05s ease-out',
                lineHeight: '1',
                margin: '0 -15px',
                padding: '0',
                willChange: 'transform, opacity',
              }}
            >
              {letter.letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
