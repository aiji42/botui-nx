import React, {
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import {
  WindowMessenger,
  ParentHandshake
} from 'post-me'
import { methods, initCustomMessageAndChoices } from './methods'

export const ChatController: FC<{
  onClose: () => void
  onComplete: () => void
  children: ReactElement
}> = ({ onClose: handleClose, onComplete: handleComplete, children }) => {
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
    ParentHandshake(messenger, methods, 40, 1000).then((connection) => {
      const remoteHandle = connection.remoteHandle()
      remoteHandle.addEventListener('onClose', handleClose)
      remoteHandle.addEventListener('onComplete', handleComplete)
    })
  }, [handleClose, handleComplete])

  return cloneElement(children, { ref })
}
