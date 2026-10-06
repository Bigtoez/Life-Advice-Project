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
      vx: (Math.random() - 0.5) * 20,
      vy: -Math.random() * 10 - 5,
    }));

    let frame = 0;
    const maxFrames = 120;

    const animate = () => {
      frame++;
      setLetters((prev) =>
        prev.map((letter, idx) => {
          const vel = velocities[idx];
          return {
            ...letter,
            x: vel.vx * frame * 0.3,
            y: vel.vy * frame * 0.3 + frame * frame * 0.05,
            rotation: frame * 5,
            opacity: Math.max(0, 1 - frame / maxFrames),
          };
        })
      );

      if (frame < maxFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => router.push('/offerings'), 200);
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
      className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 flex flex-col items-center justify-center overflow-hidden relative cursor-pointer"
      onClick={handleClickLetters}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path
            d="M0,200 Q250,150 500,200 T1000,200"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,400 Q250,350 500,400 T1000,400"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <div
          className="flex gap-0 items-baseline justify-center mb-8"
          style={{
            transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
            transition: isAnimating ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {letters.map((letter) => (
            <span
              key={letter.id}
              style={{
                fontSize: '120px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 900,
                color: '#0ea5e9',
                textShadow: '0 4px 8px rgba(14, 165, 233, 0.5)',
                display: 'inline-block',
                transform: `translateX(${letter.x}px) translateY(${letter.y}px) rotate(${letter.rotation}deg)`,
                opacity: letter.opacity,
                transition: isAnimating ? 'none' : 'all 0.05s ease-out',
                lineHeight: '1',
                margin: '0 -5px',
                padding: '0',
                willChange: 'transform, opacity',
              }}
            >
              {letter.letter}
            </span>
          ))}
        </div>

        {!isAnimating && (
          <div className="text-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="text-xl font-semibold text-sky-700">Click to continue</p>
            <p className="text-sm text-sky-600 mt-1">↓ Let the wind blow ↓</p>
          </div>
        )}
      </div>
    </div>
  );
}
