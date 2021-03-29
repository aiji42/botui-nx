import React, { FC, useState, useCallback } from 'react'
import { Wrapper } from './Wrapper'
import { ChatController } from './Controller'
import { Fab } from './Fab'

interface Props {
  url: string
  defaultOpen?: boolean
}

export const Preview: FC<Props> = ({ url, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const handleComplete = useCallback(
    () => setTimeout(() => setOpen(false), 3000),
    [setOpen]
  )
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])

  return (
    <>
      <Wrapper isFull={window.innerWidth < 600} isOpen={open}>
        <ChatController onClose={handleClose} onComplete={handleComplete}>
          <iframe src={url} title="botui" width="100%" height="100%" />
        </ChatController>
      </Wrapper>
      <Fab isOpen={open} onClick={toggleOpen} />
    </>
  )
}
