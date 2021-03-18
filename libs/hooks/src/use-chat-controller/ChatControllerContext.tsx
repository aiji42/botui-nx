import React, {
  cloneElement,
  createContext,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  ChildHandshake,
  WindowMessenger,
  ParentHandshake,
  LocalHandle,
  RemoteHandle
} from 'post-me'
import { methods } from './common'
import { JobFormPush, Session } from '@botui/types'

const noop = () => {
  // noop
}

type Values = Record<string, unknown>
type Store = {
  get: (() => Values) | ((k: string) => Values[string])
  set: (k: string, v: unknown) => void
}

interface ChatContollorContextValue {
  close: () => void
  evalFunction: (t: string, v: Record<string, string>) => Promise<void>
  getCustomChoice: () => Promise<
    Record<string, Array<{ value: string; label: string }>> | undefined
  >
  getCustomMessage: () => Promise<Record<string, string> | undefined>
  formPush: (j: JobFormPush, v: Record<string, unknown>) => Promise<void>
  store: Store
  session: Session
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop,
  evalFunction: () => Promise.resolve(),
  getCustomChoice: () => Promise.resolve({}),
  getCustomMessage: () => Promise.resolve({}),
  formPush: () => Promise.resolve(),
  store: {} as Store,
  session: {} as Session
})

type Event = {
  onClose: Record<string, unknown>
}

interface ChatControllerProviderValue {
  session: Session
}

export const ChatControllerProvider: FC<ChatControllerProviderValue> = ({
  children,
  session
}) => {
  const [localHandle, setLocalHandle] = useState<
    LocalHandle<typeof methods, Event>
  >()
  const [remoteHandle, setRemoteHandle] = useState<
    RemoteHandle<typeof methods, Event>
  >()
  const [values, setValues] = useState<Values>({})

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

  const store = useMemo<Store>(
    () => ({
      get: (k?: string) => k === undefined ? values : values[k],
      set: (k: string, v: unknown) => setValues((prev) => ({ ...prev, [k]: v }))
    }),
    [values]
  )

  const close = useCallback<ChatContollorContextValue['close']>(() => {
    localHandle?.emit('onClose', {})
  }, [localHandle])

  const evalFunction = useCallback<ChatContollorContextValue['evalFunction']>(
    async (functionString) => {
      await remoteHandle?.call('evalFunction', functionString, values)
    },
    [remoteHandle, values]
  )

  const getCustomChoice = useCallback<
    ChatContollorContextValue['getCustomChoice']
  >(async () => await remoteHandle?.call('getCustomChoice'), [remoteHandle])
  const getCustomMessage = useCallback<
    ChatContollorContextValue['getCustomMessage']
  >(async () => await remoteHandle?.call('getCustomMessage'), [remoteHandle])

  const formPush = useCallback<ChatContollorContextValue['formPush']>(
    async (job) => {
      await remoteHandle?.call('formPush', job, values)
    },
    [remoteHandle, values]
  )

  return (
    <ChatControllerContext.Provider
      children={children}
      value={{
        close,
        evalFunction,
        getCustomChoice,
        getCustomMessage,
        formPush,
        session,
        store
      }}
    />
  )
}

export const ChatControllReceiver: FC<{
  handleClose: () => void
  children: ReactElement
}> = ({ handleClose, children }) => {
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
