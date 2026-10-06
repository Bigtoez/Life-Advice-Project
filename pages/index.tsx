import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface FloatingLetter {
  id: string;
  letter: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Home() {
  const router = useRouter();
  const [showLetters, setShowLetters] = useState(true);
  const [letters, setLetters] = useState<FloatingLetter[]>([]);
  const [windPlaying, setWindPlaying] = useState(false);

  const text = "It's Complicated";

  useEffect(() => {
    if (!showLetters) return;

    // Initialize letters
    const newLetters: FloatingLetter[] = text.split('').map((letter, i) => ({
      id: `${i}`,
      letter,
      x: 50 + (i - text.length / 2) * 4,
      y: 40,
      vx: 0,
      vy: 0,
    }));
    setLetters(newLetters);
  }, [showLetters]);

  const handleClickLetters = async () => {
    // Play wind sound
    setWindPlaying(true);

    // Animate letters blowing away
    const animateLetters = () => {
      let frame = 0;
      const maxFrames = 120; // 2 seconds at 60fps

      const interval = setInterval(() => {
        frame++;
        setLetters((prev) =>
          prev.map((letter) => {
            const vx = (Math.random() - 0.5) * 3; // Random wind direction
            const vy = -Math.random() * 2 - 1; // Always moving up

            return {
              ...letter,
              x: letter.x + vx * frame * 0.1,
              y: letter.y + vy * frame * 0.1,
            };
          })
        );

        if (frame >= maxFrames) {
          clearInterval(interval);
          setWindPlaying(false);
          router.push('/offerings');
        }
      }, 16);
    };

    animateLetters();
  };

  if (!showLetters && !windPlaying) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 flex items-center justify-center overflow-hidden relative">
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
          className="relative w-full h-full flex items-center justify-center cursor-pointer group"
          onClick={handleClickLetters}
        >
          <div className="relative w-96 h-40">
            {letters.map((letter, idx) => (
              <div
                key={letter.id}
                className="absolute text-9xl font-black transition-none"
                style={{
                  left: `${letter.x}%`,
                  top: `${letter.y}%`,
                  transform: `translate(-50%, -50%) rotate(${(idx * 5) % 360}deg)`,
                  fontSize: '120px',
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 900,
                  background: `linear-gradient(135deg, #87CEEB, #E0F6FF)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 6px rgba(135, 206, 235, 0.3))',
                  opacity: windPlaying ? 0 : 1,
                  transition: windPlaying ? 'none' : 'opacity 0.3s ease-out',
                }}
              >
                {letter.letter}
              </div>
            ))}
          </div>

          {/* Click hint */}
          <div className="absolute bottom-20 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xl font-semibold text-sky-700">Click to continue</p>
            <p className="text-sm text-sky-600 mt-1">↓ Let the wind blow ↓</p>
          </div>
        </div>
      )}
    </div>
  );
}
