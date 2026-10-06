import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface FloatingLetter {
  id: string;
  letter: string;
  x: number; // pixels from left
  y: number; // pixels from top
  vx: number;
  vy: number;
  rotation: number;
}

export default function Home() {
  const router = useRouter();
  const [showLetters, setShowLetters] = useState(true);
  const [letters, setLetters] = useState<FloatingLetter[]>([]);
  const [windPlaying, setWindPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const text = "It's Complicated";

  useEffect(() => {
    if (!showLetters || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Initialize letters positioned in center
    const letterWidth = 80; // approximate width per letter
    const totalWidth = text.length * letterWidth;
    const startX = centerX - totalWidth / 2;

    const newLetters: FloatingLetter[] = text.split('').map((letter, i) => ({
      id: `${i}`,
      letter,
      x: startX + i * letterWidth,
      y: centerY - 60,
      vx: 0,
      vy: 0,
      rotation: (i * 5) % 360,
    }));
    setLetters(newLetters);
  }, [showLetters, text]);

  const handleClickLetters = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setWindPlaying(true);

    // Initialize velocities for wind effect
    const initialLetters = letters.map((letter) => ({
      ...letter,
      vx: (Math.random() - 0.5) * 8, // Stronger horizontal wind
      vy: -Math.random() * 4 - 2, // Upward movement
    }));

    let frame = 0;
    const maxFrames = 120; // 2 seconds at 60fps
    const startTime = Date.now();

    const animate = () => {
      frame++;

      setLetters((prev) =>
        prev.map((letter, idx) => ({
          ...letter,
          x: initialLetters[idx].x + initialLetters[idx].vx * frame * 0.8,
          y: initialLetters[idx].y + initialLetters[idx].vy * frame * 0.8 + (frame * frame * 0.02), // gravity
          rotation: letter.rotation + frame * 3,
          vy: initialLetters[idx].vy - 0.1, // gravity effect
        }))
      );

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        setWindPlaying(false);
        setIsAnimating(false);
        // Navigate after animation completes
        setTimeout(() => router.push('/offerings'), 300);
      }
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 flex items-center justify-center overflow-hidden relative"
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

      {/* Wind sound effect */}
      {windPlaying && (
        <audio autoPlay>
          <source
            src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
            type="audio/wav"
          />
        </audio>
      )}

      {/* Floating Letters */}
      {showLetters && (
        <div
          className={`absolute inset-0 flex items-center justify-center cursor-pointer group ${
            isAnimating ? '' : 'hover:scale-110'
          }`}
          onClick={handleClickLetters}
          style={{
            transition: isAnimating ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {/* Letters container */}
          <div className="relative w-full h-full">
            {letters.map((letter) => (
              <div
                key={letter.id}
                className="absolute font-black pointer-events-none"
                style={{
                  left: `${letter.x}px`,
                  top: `${letter.y}px`,
                  transform: `translate(-50%, -50%) rotate(${letter.rotation}deg) ${
                    windPlaying ? 'scale(0.8)' : 'scale(1)'
                  }`,
                  fontSize: '120px',
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, #87CEEB, #E0F6FF)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 6px rgba(135, 206, 235, 0.3))',
                  opacity: windPlaying ? 0 : 1,
                  transition: windPlaying ? 'none' : 'opacity 0.3s ease-out, transform 0.3s ease-out',
                  willChange: 'transform, opacity',
                }}
              >
                {letter.letter}
              </div>
            ))}
          </div>

          {/* Click hint */}
          {!isAnimating && (
            <div className="absolute bottom-20 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-xl font-semibold text-sky-700">Click to continue</p>
              <p className="text-sm text-sky-600 mt-1">↓ Let the wind blow ↓</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
