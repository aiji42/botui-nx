import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  ChildHandshake,
  WindowMessenger,
  LocalHandle,
  RemoteHandle
} from 'post-me'
import { methods, CustomChoice, CustomMessage } from '../common'
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

interface ChatContollorServerContextValue {
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

export const ChatControllerServerContext = createContext<ChatContollorServerContextValue>(
  {
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
  }
)

type Event = {
  onClose: Record<string, unknown>
  onComplete: Record<string, unknown>
}

interface ChatControllerServerProviderValue {
  session?: Session
  preview?: boolean
}

export const ChatControllerServerProvider: FC<ChatControllerServerProviderValue> = ({
  children,
  session: originSession,
  preview
}) => {
  const [session, setSession] = useState<Session | undefined>(originSession)
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
      preview &&
        conn
          .remoteHandle()
          .call('preview')
          .then((res: Session) => setSession(res))
      setLocalHandle(conn.localHandle())
      setRemoteHandle(conn.remoteHandle())
    })
  }, [preview])

  const store = useMemo<Store>(
    () => ({
      get: (k: string) => values[k],
      set: (v) => setValues((prev) => ({ ...prev, ...v }))
    }),
    [values]
  )

  const close = useCallback<ChatContollorServerContextValue['close']>(() => {
    localHandle?.emit('onClose', {})
  }, [localHandle])

  const complete = useCallback<
    ChatContollorServerContextValue['complete']
  >(() => {
    localHandle?.emit('onComplete', {})
  }, [localHandle])

  const evalFunction = useCallback<
    ChatContollorServerContextValue['evalFunction']
  >(
    async (functionString) => {
      await remoteHandle?.call('evalFunction', functionString, values)
    },
    [remoteHandle, values]
  )

  const getCustomChoice = useCallback<
    ChatContollorServerContextValue['getCustomChoice']
  >(async () => await remoteHandle?.call('getCustomChoice'), [remoteHandle])
  const getCustomMessage = useCallback<
    ChatContollorServerContextValue['getCustomMessage']
  >(async () => await remoteHandle?.call('getCustomMessage'), [remoteHandle])

  const formPush = useCallback<ChatContollorServerContextValue['formPush']>(
    async (job) => {
      await remoteHandle?.call('formPush', job, values)
    },
    [remoteHandle, values]
  )

  const addEntry = useCallback<
    ChatContollorServerContextValue['addEntry']
  >(() => {
    if (!session) return
    addEntryOriginal({
      sessionId: session.id,
      owner: session.owner,
      inputs: values
    })
  }, [session, values])

  useEffect(() => {
    if (!session) return
    const id = query['currentId']
    const skipNum = query['skipNum']
    const nextProposal = getNextProposal(
      session.proposals,
      typeof id === 'string' ? id : 'start',
      typeof skipNum === 'string' ? Number(skipNum) : 0
    )
    setProgressPercentage(getPercentage(session.proposals, nextProposal.id))
    const index = proposals.findIndex(({ id }) => id === nextProposal.id)
    if (index < 0) setProposals((prev) => [...prev, nextProposal])
    else {
      setProposals([...proposals.slice(0, index)])
      replace({ pathname, query }, asPath, { shallow: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query, session])

  useEffect(() => {
    if (!session) return
    session.launcher.loadScripts &&
      remoteHandle?.call('loadScript', session.launcher.loadScripts)
  }, [remoteHandle, session])

  if (!session) return null
  return (
    <ChatControllerServerContext.Provider
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
): Proposal => {
  const index = proposals.findIndex((p) => p.id === id) ?? 0
  return proposals[index + 1 + skipNum] ?? proposals.slice(-1)[0]
}
