import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Admin, { initAmplifyConfig } from './Admin'
import awsconfig from './aws-exports'

if (awsconfig.oauth.redirectSignIn.includes(',')) {
  const filterHost = (url: string) => new URL(url).host === window.location.host
  awsconfig.oauth.redirectSignIn =
    awsconfig.oauth.redirectSignIn.split(',').filter(filterHost).shift() ?? ''
  awsconfig.oauth.redirectSignOut =
    awsconfig.oauth.redirectSignOut.split(',').filter(filterHost).shift() ?? ''
}

initAmplifyConfig(awsconfig)

ReactDOM.render(<Admin />, document.getElementById('root'))
