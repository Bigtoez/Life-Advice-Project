import type { AppProps } from 'next/app';
import { Fraunces, Inter } from 'next/font/google';
import '../styles/globals.css';

const head = Fraunces({ subsets: ['latin'], variable: '--font-head', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${head.variable} ${body.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
