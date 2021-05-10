import { FC, useState, useCallback, useEffect } from 'react'
import { Wrapper } from './Wrapper'
import { ChatControllerClient } from '@botui/chat-controller/client'
import { Fab } from './Fab'
import { CustomWindow } from '@botui/chat-controller/common'

declare const window: CustomWindow

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

  useEffect(() => {
    if (window)
      window.botui = { ...(window.botui ?? {}), openChat: () => setOpen(true) }
  }, [])

  return (
    <>
      <Wrapper isFull={window.innerWidth < 600} isOpen={open}>
        <ChatControllerClient onClose={handleClose} onComplete={handleComplete}>
          <iframe
            src={url}
            title="botui"
            width="100%"
            height="100%"
            style={{ borderWidth: 0 }}
          />
        </ChatControllerClient>
      </Wrapper>
      <Fab isOpen={open} onClick={toggleOpen} />
    </>
  )
}
