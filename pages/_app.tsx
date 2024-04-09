import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import React from 'react';
import '../styles/global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
});
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
