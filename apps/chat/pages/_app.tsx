import { Fragment, useEffect } from 'react'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../components/GrobalStyle'

function CustomApp({ Component, pageProps }: AppProps) {
  const analyticsId = pageProps.session?.googleAnalyticsId
  useEffect(() => {
    if (!analyticsId) return
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`
    script.async = true
    document.head.appendChild(script)
    gtag('config', analyticsId)
  }, [analyticsId])
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default CustomApp
