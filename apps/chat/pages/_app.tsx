import React from 'react';
import { AppProps } from 'next/app';
import { GlobalStyle } from '../components/GrobalStyle';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp;
