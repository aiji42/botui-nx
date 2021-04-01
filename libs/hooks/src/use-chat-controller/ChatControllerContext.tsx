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
import {
  methods,
  initCustomMessageAndChoices,
  CustomChoice,
  CustomMessage
} from '@botui/embedded'
import { JobFormPush, Proposal, Proposals, Session } from '@botui/types'
import { useRouter } from 'next/router'
import { addEntry as addEntryOriginal } from '@botui/api'

const noop = () => {
  // noop
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values = Record<string, any>
type Store = {
  get: (k: string) => Values[string]
  set: (v: Values) => void
}

interface ChatContollorContextValue {
  close: () => void
  evalFunction: (t: string) => Promise<void>
  getCustomChoice: () => Promise<CustomChoice | undefined>
  getCustomMessage: () => Promise<CustomMessage | undefined>
  formPush: (j: JobFormPush) => Promise<void>
  addEntry: () => void
  complete: () => void
  store: Store
  values: Values
  proposals: Proposals
  session: Session
  progressPercentage: number
}

export const ChatControllerContext = createContext<ChatContollorContextValue>({
  close: noop,
  evalFunction: () => Promise.resolve(),
  getCustomChoice: () => Promise.resolve({}),
  getCustomMessage: () => Promise.resolve({}),
  formPush: () => Promise.resolve(),
  addEntry: noop,
  complete: noop,
  store: {} as Store,
  values: {},
  proposals: [],
  session: {} as Session,
  progressPercentage: 0
})

type Event = {
  onClose: Record<string, unknown>
  onComplete: Record<string, unknown>
}

interface ChatControllerProviderValue {
  session: Session
}

export const ChatControllerProvider: FC<ChatControllerProviderValue> = ({
  children,
  session
}) => {
  const [proposals, setProposals] = useState<Proposals>([])
  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const { query, replace, pathname, asPath } = useRouter()

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
      get: (k: string) => values[k],
      set: (v) => setValues((prev) => ({ ...prev, ...v }))
    }),
    [values]
  )

  const close = useCallback<ChatContollorContextValue['close']>(() => {
    localHandle?.emit('onClose', {})
  }, [localHandle])

  const complete = useCallback<ChatContollorContextValue['complete']>(() => {
    localHandle?.emit('onComplete', {})
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

  const addEntry = useCallback<ChatContollorContextValue['addEntry']>(() => {
    addEntryOriginal({
      sessionId: session.id,
      owner: session.owner,
      inputs: values
    })
  }, [session, values])

  useEffect(() => {
    const id = query['currentId']
    const skipNum = query['skipNum']
    const nextProposal = getNextProposal(
      session.proposals,
      typeof id === 'string' ? id : 'start',
      typeof skipNum === 'string' ? Number(skipNum) : 0
    )
    if (!nextProposal) return
    setProgressPercentage(getPercentage(session.proposals, nextProposal.id))
    const index = proposals.findIndex(({ id }) => id === nextProposal.id)
    if (index < 0) setProposals((prev) => [...prev, nextProposal])
    else {
      setProposals([...proposals.slice(0, index)])
      replace({ pathname, query }, asPath, { shallow: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query, replace, session.proposals, complete])

  return (
    <ChatControllerContext.Provider
      children={children}
      value={{
        close,
        evalFunction,
        getCustomChoice,
        getCustomMessage,
        formPush,
        addEntry,
        complete,
        session,
        proposals,
        progressPercentage,
        values,
        store
      }}
    />
  )
}

const getPercentage = (proposals: Proposals, currentId?: string | number) => {
  const index = proposals.findIndex((p) => p.id === currentId) ?? 0
  return (index + 1) / proposals.length
}

const getNextProposal = (
  proposals: Proposals,
  id: string,
  skipNum = 0
): Proposal | null => {
  const index = proposals.findIndex((p) => p.id === id) ?? 0
  return proposals[index + 1 + skipNum] ?? null
}

export const ChatControllReceiver: FC<{
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
