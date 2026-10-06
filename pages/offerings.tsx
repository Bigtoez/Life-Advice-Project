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
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-20 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-24 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-22 bg-white rounded-full opacity-35 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
