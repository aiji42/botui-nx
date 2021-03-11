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
  evalFunction: (t: string, v: Record<string, string>) => Promise<void>
  getValues: () => Promise<Record<string, string>>
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop,
  evalFunction: () => Promise.resolve(),
  getValues: () => Promise.resolve({})
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

  const close = useCallback<ChatContollorContextValue['close']>(() => {
    connection?.localHandle()?.emit('onClose', {})
  }, [connection])

  const evalFunction = useCallback<ChatContollorContextValue['evalFunction']>(
    async (functionString, values) => {
      await connection
        ?.remoteHandle()
        ?.call('evalFunction', functionString, values)
    },
    [connection]
  )

  const getValues = useCallback<
    ChatContollorContextValue['getValues']
  >(async () => {
    const values = await connection?.remoteHandle()?.call('getValues')
    return values
  }, [connection])

  return (
    <ChatControllerContext.Provider
      children={children}
      value={{ close, evalFunction, getValues }}
    />
  )
}
