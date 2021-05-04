import { cloneElement, FC, ReactElement, useEffect, useRef } from 'react'
import { WindowMessenger, ParentHandshake } from 'post-me'
import { methods, initCustomMessageAndChoices } from '../common/methods'
import { Session } from '@botui/types'

export const ChatControllerClient: FC<{
  onClose: () => void
  onComplete: () => void
  preview?: boolean
  session?: Session
  children: ReactElement
}> = ({
  onClose: handleClose,
  onComplete: handleComplete,
  session,
  preview,
  children
}) => {
  const ref = useRef<HTMLIFrameElement>()

  useEffect(() => {
    initCustomMessageAndChoices()
  }, [])

  useEffect(() => {
    if (!ref.current?.contentWindow) return
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: ref.current.contentWindow,
      remoteOrigin: '*'
    })
    const newMethods =
      preview && session ? { ...methods, preview: () => session } : methods
    ParentHandshake(messenger, newMethods, 40, 1000).then((connection) => {
      const remoteHandle = connection.remoteHandle()
      remoteHandle.addEventListener('onClose', handleClose)
      remoteHandle.addEventListener('onComplete', handleComplete)
    })
  }, [handleClose, handleComplete, preview, session])

  return cloneElement(children, { ref })
}
