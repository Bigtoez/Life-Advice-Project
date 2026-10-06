import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const TOPICS = [
  { id: 'relationships', label: 'Relationships' },
  { id: 'family', label: 'Family' },
  { id: 'breakup', label: 'Breakups' },
  { id: 'life', label: 'Life stuff' },
];

export default function GetStarted() {
  const router = useRouter();
  const [topic, setTopic] = useState<string | null>(null);

  return (
    <Layout title="Get started">
      <section className="section">
        <h2>How it works</h2>
        <ol className="steps">
          <li><span className="num">1</span>Pick what&apos;s on your mind</li>
          <li><span className="num">2</span>Talk it through, free to start</li>
          <li><span className="num">3</span>Continue if it helps</li>
        </ol>
      </section>

      <section className="section">
        <h2>What&apos;s on your mind?</h2>
        <div className="topics">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              className={`topic ${topic === t.id ? 'selected' : ''}`}
              onClick={() => setTopic(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <button
          className="btn btn-block"
          disabled={!topic}
          onClick={() => router.push(`/session/${topic}`)}
        >
          Start free chat
        </button>
        <p className="note">
          Sign-in is coming in the next step. For now, the chat is open for testing.
        </p>
      </section>
    </Layout>
  );
}
