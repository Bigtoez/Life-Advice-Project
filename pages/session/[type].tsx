import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

interface Message { role: 'user' | 'assistant'; content: string; }

const TITLES: Record<string, string> = {
  'pattern-break': '🔄 The Pattern',
  'after-fight': '💔 After Fight',
  breakup: '💭 Breakup',
  group: '👥 Group',
};

const INTROS: Record<string, string> = {
  'pattern-break': "You've repeated this. Let's see why.",
  'after-fight': "Wasn't about what you think.",
  breakup: 'Understanding helps.',
  group: "You're not alone.",
};

export default function SessionPage() {
  const router = useRouter();
  const { type } = router.query;
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const msgRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!type) return;
    const init = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await axios.post(`${url}/api/sessions/start`, {
          userId: `user-${Date.now()}`,
          sessionType: type,
        });
        setSessionId(res.data.sessionId);
        setMessages([{ role: 'assistant', content: INTROS[type as string] || 'Welcome.' }]);
        timerRef.current = setInterval(() => {
          setTimeRemaining((p) => (p > 0 ? p - 1 : 0));
        }, 1000);
      } catch (e) { console.error(e); }
    };
    init();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [type]);

  const send = async () => {
    if (!inputValue.trim() || !sessionId || loading) return;
    const msg = inputValue.slice(0, 500);
    const history = messages.slice(1);
    setInputValue('');
    setMessages((p) => [...p, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await axios.post(`${url}/api/sessions/${sessionId}/message`,
        { message: msg, sessionType: type, history }
      );
      setMessages((p) => [...p, { role: 'assistant', content: res.data.response }]);
    } catch (e) {
      setMessages((p) => [...p, { role: 'assistant', content: 'Sorry, try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!type) return <div>Loading...</div>;

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFB6D9 100%)',
      }}
    >
      <div className="bg-white bg-opacity-70 border-b-4 border-white px-6 py-4 shadow">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/sessions-menu"><span className="text-sm text-sky-700 font-bold">← Back</span></Link>
          <h2 className="text-3xl font-black text-sky-900">{TITLES[type as string]}</h2>
          <div className="text-4xl font-black text-sky-700">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl rounded-2xl px-6 py-4 shadow ${m.role === 'user' ? 'bg-sky-500 text-white' : 'bg-white text-sky-900 border-2 border-sky-200'}`}>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-white border-2 border-sky-200 rounded-2xl px-6 py-4"><div className="flex space-x-2"><div className="w-3 h-3 bg-sky-500 rounded-full animate-bounce"></div></div></div></div>}
          <div ref={msgRef} />
        </div>
      </div>

      <div className="bg-white bg-opacity-70 border-t-4 border-white px-6 py-6">
        <div className="max-w-2xl mx-auto flex gap-4">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && send()} placeholder="Share..." className="flex-1 bg-white border-2 border-sky-300 rounded-full px-6 py-3" disabled={loading}/>
          <button onClick={send} disabled={loading} className="bg-sky-500 text-white px-8 py-3 rounded-full font-bold">Send</button>
        </div>
      </div>
    </div>
  );
}
