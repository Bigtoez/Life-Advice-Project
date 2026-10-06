import React, { useState, useEffect, useRef } from 'react';
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
  const [letters, setLetters] = useState<FloatingLetter[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const text = "It's Complicated";

  // Initialize letters on client mount
  useEffect(() => {
    // Set initial letters centered on screen
    const newLetters: FloatingLetter[] = text.split('').map((letter, i) => ({
      id: `${i}`,
      letter,
      x: 0, // Will be positioned with CSS grid
      y: 0,
      rotation: 0,
      opacity: 1,
    }));
    setLetters(newLetters);
  }, []);

  const handleClickLetters = () => {
    if (isAnimating || letters.length === 0) return;

    setIsAnimating(true);

    // Create velocities for each letter
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
            y: vel.vy * frame * 0.3 + frame * frame * 0.05, // gravity
            rotation: frame * 5,
            opacity: Math.max(0, 1 - frame / maxFrames),
          };
        })
      );

      if (frame < maxFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Navigate after animation
        setTimeout(() => router.push('/offerings'), 200);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animate();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 flex flex-col items-center justify-center overflow-hidden relative cursor-pointer group"
      onClick={handleClickLetters}
    >
      {/* Sky clouds background */}
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

      {/* Main content - relative positioned for letter animations */}
      <div className="relative z-10">
        {/* Letters flex container - centered baseline */}
        <div
          className="flex gap-0 items-baseline justify-center"
          style={{
            transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
            transition: isAnimating ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {letters.map((letter, idx) => (
            <div
              key={letter.id}
              className="font-black pointer-events-none"
              style={{
                fontSize: '120px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #87CEEB, #E0F6FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 6px rgba(135, 206, 235, 0.3))',
                transform: `translateX(${letter.x}px) translateY(${letter.y}px) rotate(${letter.rotation}deg)`,
                opacity: letter.opacity,
                transition: isAnimating ? 'none' : 'transform 0.3s ease-out',
              }}
            >
              {letter.letter}
            </div>
          ))}
        </div>

        {/* Click hint */}
        {!isAnimating && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <p className="text-xl font-semibold text-sky-700">Click to continue</p>
            <p className="text-sm text-sky-600 mt-1">↓ Let the wind blow ↓</p>
          </div>
        )}
      </div>
    </div>
  );
}
