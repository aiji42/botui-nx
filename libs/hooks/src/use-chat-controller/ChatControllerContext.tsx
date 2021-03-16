import React, {
  cloneElement,
  createContext,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { ChildHandshake, WindowMessenger, ParentHandshake, LocalHandle, RemoteHandle } from 'post-me'
import { methods } from './common'
import { JobFormPush, Proposals } from '@botui/types'

const noop = () => {
  // noop
}

interface ChatContollorContextValue {
  close: () => void
  evalFunction: (t: string, v: Record<string, string>) => Promise<void>
  getCustomChoice: () => Promise<Record<string, Array<{ value: string; label: string }>> | undefined>
  getCustomMessage: () => Promise<Record<string, string> | undefined>
  formPush: (j: JobFormPush, v: Record<string, string>) => Promise<void>
  proposals: Proposals
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop,
  evalFunction: () => Promise.resolve(),
  getCustomChoice: () => Promise.resolve({}),
  getCustomMessage: () => Promise.resolve({}),
  formPush: () => Promise.resolve(),
  proposals: []
})

type Event = {
  onClose: Record<string, unknown>
}

interface ChatControllerProviderValue {
  proposals: Proposals
}

export const ChatControllerProvider: FC<ChatControllerProviderValue> = ({ children, proposals }) => {
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

  const getCustomChoice = useCallback<ChatContollorContextValue['getCustomChoice']>(async () => await remoteHandle?.call('getCustomChoice'), [remoteHandle])
  const getCustomMessage = useCallback<ChatContollorContextValue['getCustomMessage']>(async () => await remoteHandle?.call('getCustomMessage'), [remoteHandle])

  const formPush = useCallback<ChatContollorContextValue['formPush']>(async (job, values) => {
    await remoteHandle?.call('formPush', job, values)
  }, [remoteHandle])

  return (
    <ChatControllerContext.Provider
      children={children}
      value={{ close, evalFunction, getCustomChoice, getCustomMessage, formPush, proposals }}
    />
  )
}

export const ChatControllReceiver: FC<{ handleClose: () => void, children: ReactElement }> = ({ handleClose, children }) => {
  const ref = useRef<HTMLIFrameElement>()

  useEffect(() => {
    if (!ref.current?.contentWindow) return
    const messenger = new WindowMessenger({
      localWindow: window,
      remoteWindow: ref.current.contentWindow,
      remoteOrigin: '*'
    })
    ParentHandshake(messenger, methods, 20, 1000).then((connection) => {
      const remoteHandle = connection.remoteHandle()
      remoteHandle.addEventListener('onClose', handleClose)
    })
  }, [handleClose])

  return cloneElement(children, { ref })
}