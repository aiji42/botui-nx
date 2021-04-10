import { Fragment } from 'react'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../components/GrobalStyle'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default CustomApp
