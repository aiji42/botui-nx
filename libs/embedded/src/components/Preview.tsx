import React, { FC, useState, useCallback } from 'react'
import { Wrapper } from './Wrapper'
import { Fab } from './Fab'
import { ChatControllReceiver } from '@botui/hooks'

interface Props {
  url: string
  defaultOpen?: boolean
}

export const Preview: FC<Props> = ({ url, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])

  return (
    <>
      <Wrapper isFull={window.innerWidth < 600} isOpen={open}>
        <ChatControllReceiver handleClose={handleClose}>
          <iframe
            src={url}
            title="botui"
            width="100%"
            height="100%"
          />
        </ChatControllReceiver>
      </Wrapper>
      <Fab onClick={toggleOpen} isOpen={open} />
    </>
  )
}
