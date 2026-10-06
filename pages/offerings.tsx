import React, { useState } from 'react';
import Link from 'next/link';

interface CloudWidget {
  id: string;
  title: string;
  emoji: string;
  description: string;
  link: string;
  color: string;
}

export default function OfferingsPage() {
  const [hoveredCloud, setHoveredCloud] = useState<string | null>(null);

  const offerings: CloudWidget[] = [
    {
      id: 'instagram',
      title: 'Instagram',
      emoji: '📸',
      description: 'Coming soon',
      link: '#',
      color: 'from-pink-300 to-rose-200',
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      emoji: '🎵',
      description: 'Coming soon',
      link: '#',
      color: 'from-purple-300 to-indigo-200',
    },
    {
      id: 'chat-sessions',
      title: 'Chat Sessions',
      emoji: '💬',
      description: 'Start coaching',
      link: '/sessions-menu',
      color: 'from-blue-300 to-cyan-200',
    },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFB6D9 100%)',
      }}
    >
      {/* Fluffy pink clouds background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h1
            className="text-6xl font-black mb-4 animate-bounce"
            style={{
              fontFamily: '"Fredoka", sans-serif',
              background: 'linear-gradient(135deg, #87CEEB, #E0F6FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It's Complicated
          </h1>
          <p className="text-2xl text-sky-700 font-semibold">What would you like to explore?</p>
        </div>

        {/* Cloud Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4 mb-12">
          {offerings.map((offering) => (
            <Link key={offering.id} href={offering.link}>
              <div
                className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredCloud(offering.id)}
                onMouseLeave={() => setHoveredCloud(null)}
              >
                {/* Cartoon Cloud Shape */}
                <div
                  className={`relative w-full h-64 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${offering.color} border-4 border-white overflow-hidden`}
                  style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)',
                  }}
                >
                  {/* Cloud Gradient Shimmer */}
                  <div className="absolute inset-0 bg-white opacity-20"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-6xl mb-4 transform transition-transform duration-300" style={{ transform: hoveredCloud === offering.id ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)' }}>
                      {offering.emoji}
                    </div>
                    <h2 className="text-2xl font-black text-sky-900 mb-2">{offering.title}</h2>
                    <p className="text-sm text-sky-800 font-semibold">{offering.description}</p>

                    {/* Hover Action */}
                    {hoveredCloud === offering.id && (
                      <div className="mt-4 text-xs font-bold text-sky-700 animate-bounce">↓ Click to explore ↓</div>
                    )}
                  </div>

                  {/* Cloud Shadow Effect */}
                  <div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black rounded-full opacity-10 blur-lg"
                    style={{ pointerEvents: 'none' }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <Link href="/">
          <button className="mt-8 px-6 py-2 bg-white text-sky-600 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all duration-300">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
