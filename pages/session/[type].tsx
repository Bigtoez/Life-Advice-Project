import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

interface Message { role: 'user' | 'assistant'; content: string; }

const INTRO = "Hi. I'm glad you're here. What's been on your mind?";

export default function ChatPage() {
  const router = useRouter();
  const type = router.query.type as string | undefined;
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: INTRO }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!type) return;
    axios
      .post('/api/sessions/start', { sessionType: type })
      .then((r) => setSessionId(r.data.sessionId))
      .catch(() => setSessionId(null));
  }, [type]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim().slice(0, 500);
    if (!text || !sessionId || loading) return;
    const history = messages.slice(1);
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const r = await axios.post(`/api/sessions/${sessionId}/message`, {
        message: text,
        sessionType: type,
        history,
      });
      setMessages((m) => [...m, { role: 'assistant', content: r.data.response }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: "Sorry, something went wrong on my side. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <Head>
        <title>Chat | It&apos;s Complicated</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="chat-head">
        <Link href="/get-started" className="text-link">← Back</Link>
        <span className="logo">It&apos;s Complicated</span>
        <span style={{ width: 48 }} />
      </div>
      <div className="chat-body">
        <div className="chat-inner">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role === 'user' ? 'user' : 'ai'}`}>{m.content}</div>
          ))}
          {loading && <div className="bubble ai">…</div>}
          <div ref={endRef} />
        </div>
      </div>
      <div className="chat-foot">
        <form className="chat-form" onSubmit={send}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
            maxLength={500}
            disabled={loading}
          />
          <button className="btn" type="submit" disabled={loading || !sessionId}>Send</button>
        </form>
        <p className="chat-note">AI, not a therapist. If you need urgent help, contact your local emergency services.</p>
      </div>
    </div>
  );
}
