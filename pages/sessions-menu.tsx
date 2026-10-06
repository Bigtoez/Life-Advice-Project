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
      description: "You've had the same fight 3 times.",
      duration: '20 min',
      price: '$7',
      color: 'from-amber-300 to-yellow-200',
    },
    {
      id: 'after-fight',
      title: 'After the Fight',
      emoji: '💔',
      hook: 'What Was That About?',
      description: "The fight wasn't about what you thought.",
      duration: '20 min',
      price: '$7',
      color: 'from-rose-300 to-pink-200',
    },
    {
      id: 'breakup',
      title: 'Breakup Breakdown',
      emoji: '💭',
      hook: 'Processing What Happened',
      description: 'Breakups hurt. Understanding helps.',
      duration: '20 min',
      price: '$7',
      color: 'from-purple-300 to-indigo-200',
    },
    {
      id: 'group',
      title: 'Group Session',
      emoji: '👥',
      hook: 'You Are Not Alone',
      description: 'Your friends have the same patterns.',
      duration: '30 min',
      price: '$8',
      color: 'from-teal-300 to-cyan-200',
    },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFB6D9 100%)',
      }}
    >
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-2" style={{ fontFamily: '"Fredoka", sans-serif', background: 'linear-gradient(135deg, #87CEEB, #E0F6FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Its Complicated
          </h1>
          <p className="text-xl text-sky-700 font-semibold">Whats on your mind?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4 mb-12">
          {sessions.map((session) => (
            <Link key={session.id} href={`/session/${session.id}`}>
              <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105" onMouseEnter={() => setHoveredSession(session.id)} onMouseLeave={() => setHoveredSession(null)}>
                <div className={`relative w-full h-72 rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br ${session.color} border-4 border-white overflow-hidden`} style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)' }}>
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
                    {hoveredSession === session.id && <div className="absolute inset-0 bg-black opacity-5 rounded-3xl transition-opacity"></div>}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-10 bg-black rounded-full opacity-15 blur-lg" style={{ pointerEvents: 'none' }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/offerings">
          <button className="mt-8 px-8 py-3 bg-white text-sky-600 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all">
            Back to Offerings
          </button>
        </Link>
      </div>
    </div>
  );
}
