import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Props {
  title?: string;
  showLogin?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, showLogin = true, children }: Props) {
  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | It's Complicated` : "It's Complicated"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Some things are hard to say out loud. Explore your feelings and talk about them today."
        />
      </Head>
      <header className="header">
        <Link href="/" className="logo">It&apos;s Complicated</Link>
        {showLogin && <span className="text-link">Log in (coming soon)</span>}
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>AI chat, not a therapist.</p>
        <p>Privacy · Terms · Safety</p>
      </footer>
    </div>
  );
}
