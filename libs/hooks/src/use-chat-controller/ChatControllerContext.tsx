import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react'
import { ChildHandshake, WindowMessenger, Connection } from 'post-me'

const noop = () => {
  // noop
}

interface ChatContollorContextValue {
  close: () => void
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop
})

export const ChatControllerProvider: FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection>()

  useEffect(() => {
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: window.parent,
      remoteOrigin: '*'
    })
    ChildHandshake(messenger).then(setConnection)
  }, [])

  const close = useCallback(() => {
    connection?.localHandle()?.emit('onClose', {})
  }, [connection])

  return (
    <ChatControllerContext.Provider children={children} value={{ close }} />
  )
}
