import React, { useState } from 'react';
import Link from 'next/link';

interface SessionType {
  id: string;
  title: string;
  emoji: string;
  hook: string;
  description: string;
  duration: string;
  price: string;
  color: string;
}

export default function SessionsMenuPage() {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  const sessions: SessionType[] = [
    {
      id: 'pattern-break',
      title: 'The Pattern',
      emoji: '🔄',
      hook: 'Why Do I Keep Choosing This?',
      description: "You've had the same fight 3 times. Let's understand why.",
      duration: '20 min',
      price: '$7',
      color: 'from-amber-300 to-yellow-200',
    },
    {
      id: 'after-fight',
      title: 'After the Fight',
      emoji: '💔',
      hook: 'What Was That Actually About?',
      description: "The fight wasn't really about what you thought.",
      duration: '20 min',
      price: '$7',
      color: 'from-rose-300 to-pink-200',
    },
    {
      id: 'breakup',
      title: 'Breakup Breakdown',
      emoji: '💭',
      hook: 'Processing What Actually Happened',
      description: 'Breakups hurt. Understanding helps.',
      duration: '20 min',
      price: '$7',
      color: 'from-purple-300 to-indigo-200',
    },
    {
      id: 'group',
      title: 'Group Session',
      emoji: '👥',
      hook: "You're Not Alone in This",
      description: "Your friends have the same patterns.",
      duration: '30 min',
      price: '$8',
      color: 'from-teal-300 to-cyan-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-20 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-32 right-10 w-40 h-24 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-22 bg-white rounded-full opacity-35 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-black mb-2"
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
          <p className="text-xl text-sky-700 font-semibold">What's on your mind?</p>
        </div>

        {/* Cloud Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4 mb-12">
          {sessions.map((session) => (
            <Link key={session.id} href={`/session/${session.id}`}>
              <div
                className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredSession(session.id)}
                onMouseLeave={() => setHoveredSession(null)}
              >
                {/* Cloud Card */}
                <div
                  className={`relative w-full h-72 rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br ${session.color} border-4 border-white overflow-hidden`}
                  style={{
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)',
                  }}
                >
                  <div className="absolute inset-0 bg-white opacity-20"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">{session.hook}</p>
                          <h2 className="text-3xl font-black text-sky-900">{session.title}</h2>
                        </div>
                        <div className="text-5xl">{session.emoji}</div>
                      </div>
                      <p className="text-sm text-sky-800 leading-relaxed">{session.description}</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t-2 border-white border-opacity-50">
                      <span className="text-sm font-bold text-sky-800">{session.duration}</span>
                      <span className="text-lg font-black text-sky-700">{session.price}</span>
                    </div>

                    {hoveredSession === session.id && (
                      <div className="absolute inset-0 bg-black opacity-5 rounded-3xl transition-opacity"></div>
                    )}
                  </div>

                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-10 bg-black rounded-full opacity-15 blur-lg" style={{ pointerEvents: 'none' }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <Link href="/offerings">
          <button className="mt-8 px-8 py-3 bg-white text-sky-600 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all">
            ← Back to Offerings
          </button>
        </Link>
      </div>
    </div>
  );
}
