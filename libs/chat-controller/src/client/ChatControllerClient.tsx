import {
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react'
import { WindowMessenger, ParentHandshake, LocalHandle } from 'post-me'
import { methods, initCustomMessageAndChoices } from '../common/methods'
import { Session } from '@botui/types'

type Event = {
  refresh: Session
}

type LocalHandleMethods = typeof methods

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
  const [localHandle, setLocalHandle] = useState<
    LocalHandle<LocalHandleMethods, Event>
  >()

  useEffect(() => {
    initCustomMessageAndChoices()
  }, [])

  useEffect(() => {
    if (!ref.current?.contentWindow) return
    if (localHandle) {
      preview && session && localHandle.emit('refresh', session)
      return
    }
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: ref.current.contentWindow,
      remoteOrigin: '*'
    })
    ParentHandshake(messenger, methods, 40, 1000).then((conn) => {
      setLocalHandle(conn.localHandle())
      conn.remoteHandle().addEventListener('onClose', handleClose)
      conn.remoteHandle().addEventListener('onComplete', handleComplete)
    })
  }, [handleClose, handleComplete, preview, session, localHandle])

  return cloneElement(children, { ref })
}
