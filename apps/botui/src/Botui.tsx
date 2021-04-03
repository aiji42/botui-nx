import React from 'react'
import { Preview } from './components'
import { render } from 'react-dom'

export class Botui {
  url: string
  defaultOpen: boolean

  constructor(url: string, defaultOpen = false) {
    this.url = url
    this.defaultOpen = defaultOpen
  }

  start() {
    const target = document.createElement('div')
    document.querySelector('body')?.appendChild(target)

    render(<Preview url={this.url} defaultOpen={this.defaultOpen} />, target)
  }
}
