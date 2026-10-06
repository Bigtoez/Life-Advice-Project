import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <h1>Life, it&apos;s complicated.</h1>
        <p className="lead">Some things are hard to say out loud.</p>
        <p className="sub">Explore your feelings, talk about them today.</p>
        <Link href="/get-started" className="btn">Get started</Link>
        <p className="reassure">Free taster chat · Private · No judgement</p>
      </section>
    </Layout>
  );
}
