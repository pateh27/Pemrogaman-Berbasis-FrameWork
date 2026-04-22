import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/layouts/navbar';
import AppShell from '../components/layouts/Appshell';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LZT57MSHQQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LZT57MSHQQ');
        `}
      </Script>

      <SessionProvider session={pageProps.session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </>
  );
}