import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { ChildHandshake, WindowMessenger, ParentHandshake, LocalHandle, RemoteHandle } from 'post-me'
import { methods } from './common'
import { JobFormPush } from '@botui/types'

const noop = () => {
  // noop
}

interface ChatContollorContextValue {
  close: () => void
  evalFunction: (t: string, v: Record<string, string>) => Promise<void>
  getCustomChoice: (k: string) => Promise<Array<{ value: string; label: string }> | undefined>
  formPush: (j: JobFormPush, v: Record<string, string>) => Promise<void>
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop,
  evalFunction: () => Promise.resolve(),
  getCustomChoice: () => Promise.resolve([]),
  formPush: () => Promise.resolve()
})

type Event = {
  onClose: Record<string, unknown>
}

export const ChatControllerProvider: FC = ({ children }) => {
  const [localHandle, setLocalHandle] = useState<LocalHandle<typeof methods, Event>>()
  const [remoteHandle, setRemoteHandle] = useState<RemoteHandle<typeof methods, Event>>()

  useEffect(() => {
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: window.parent,
      remoteOrigin: '*'
    })
    ChildHandshake(messenger).then((conn) => {
      setLocalHandle(conn.localHandle())
      setRemoteHandle(conn.remoteHandle())
    })
  }, [])

  const close = useCallback<ChatContollorContextValue['close']>(() => {
    localHandle?.emit('onClose', {})
  }, [localHandle])

  const evalFunction = useCallback<ChatContollorContextValue['evalFunction']>(
    async (functionString, values) => {
      await remoteHandle?.call('evalFunction', functionString, values)
    },
    [remoteHandle]
  )

  const getCustomChoice = useCallback<ChatContollorContextValue['getCustomChoice']>(async (key) => await remoteHandle?.call('getCustomChoice', key), [remoteHandle])

  const formPush = useCallback<ChatContollorContextValue['formPush']>(async (job, values) => {
    await remoteHandle?.call('formPush', job, values)
  }, [remoteHandle])

  return (
    <ChatControllerContext.Provider
      children={children}
      value={{ close, evalFunction, getCustomChoice, formPush }}
    />
  )
}

const ChatControllReceiver: FC<{ handleClose: () => void }> = ({ handleClose, children }) => {
  const ref = useRef<HTMLIFrameElement>()

  const start = useCallback(() => {
    if (!ref.current?.contentWindow) return
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: ref.current.contentWindow,
      remoteOrigin: '*'
    })
    ParentHandshake<typeof methods>(messenger, methods, 20, 1000).then((connection) => {
      const remoteHandle = connection.remoteHandle()
      remoteHandle.addEventListener('onClose', () => {
        handleClose()
      })
    })
  }, [handleClose])

  return children
}