import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { Wrapper } from './Wrapper'
import { Fab } from './Fab'
import { ParentHandshake, WindowMessenger, RemoteHandle, debug, DebugMessenger } from 'post-me'

interface Props {
  url: string
  defaultOpen?: boolean
}

export const Preview: FC<Props> = ({ url, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  // const handleClose = useCallback(() => setOpen(false), [setOpen])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])

  const ref = useRef<HTMLIFrameElement>()
  useEffect(() => {
    if (!open || !ref.current) return
    const interval = setInterval(() => {
      console.log('retry')
      const messenger = new WindowMessenger({
        localWindow: window,
        remoteWindow: ref.current.contentWindow,
        remoteOrigin: '*'
      })
      ParentHandshake(messenger).then((connection) => {
        clearInterval(interval)
        const remoteHandle: RemoteHandle = connection.remoteHandle()
        remoteHandle.call('connected')
      })
    }, 1000)
  }, [open, ref])

  return (
    <>
      <Wrapper isFull={window.innerWidth < 600} isOpen={open}>
        <iframe src={url} title="botui" width="100%" height="100%" ref={ref} />
      </Wrapper>
      <Fab onClick={toggleOpen} isOpen={open} />
    </>
  )
}
