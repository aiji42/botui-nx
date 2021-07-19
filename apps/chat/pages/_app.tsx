import { Fragment, useEffect } from 'react'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../components/GrobalStyle'
import '../styles/styles.css'

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
