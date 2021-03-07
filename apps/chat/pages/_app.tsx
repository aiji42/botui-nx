import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to chat!</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp;
