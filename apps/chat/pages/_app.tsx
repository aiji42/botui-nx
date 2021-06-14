import { Fragment, useEffect } from 'react'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../components/GrobalStyle'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  const analyticsId = pageProps.session?.analyticsId
  useEffect(() => {
    analyticsId &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('config', analyticsId)
  }, [analyticsId])
  return (
    <Fragment>
      <Head>
        {analyticsId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `
          }}
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default CustomApp
