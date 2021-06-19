import { Fragment, useEffect } from 'react'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../components/GrobalStyle'

function CustomApp({ Component, pageProps }: AppProps) {
  const analyticsId = pageProps.session?.googleAnalyticsId
  useEffect(() => {
    analyticsId && gtag('config', analyticsId)
  }, [analyticsId])
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default CustomApp
