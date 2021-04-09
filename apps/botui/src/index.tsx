import React from 'react'
import { Preview } from './components'
import { render } from 'react-dom'

export const start = (url: string, defaultOpen = false) => {
  const target = document.createElement('div')
  document.querySelector('body')?.appendChild(target)

  render(<Preview url={url} defaultOpen={defaultOpen} />, target)
}
