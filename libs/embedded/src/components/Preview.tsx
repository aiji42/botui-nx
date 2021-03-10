import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { Wrapper } from './Wrapper'
import { Fab } from './Fab'
import {
  ParentHandshake,
  WindowMessenger,
  RemoteHandle,
  debug,
  DebugMessenger
} from 'post-me'

interface Props {
  url: string
  defaultOpen?: boolean
}

export const Preview: FC<Props> = ({ url, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])

  const ref = useRef<HTMLIFrameElement>()
  const controller = useCallback(() => {
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: ref.current.contentWindow,
      remoteOrigin: '*'
    })
    ParentHandshake(messenger, {}, 20, 1000).then((connection) => {
      const remoteHandle = connection.remoteHandle()
      remoteHandle.addEventListener('onClose', () => {
        handleClose()
      })
    })
  }, [handleClose])

  return (
    <>
      <Wrapper isFull={window.innerWidth < 600} isOpen={open}>
        <iframe
          src={url}
          title="botui"
          width="100%"
          height="100%"
          onLoad={controller}
          ref={ref}
        />
      </Wrapper>
      <Fab onClick={toggleOpen} isOpen={open} />
    </>
  )
}
