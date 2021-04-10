import {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { Proposal } from '@botui/types'

const noop = () => {
  // no-op
}

interface ProposalContextValue {
  proposal: Proposal
  setCompleted: Dispatch<SetStateAction<boolean>>
}

export const ProposalContext = createContext<ProposalContextValue>({
  proposal: {} as Proposal,
  setCompleted: noop
})

export const ProposalContextProvider: FC<{ proposal: Proposal }> = ({
  children,
  proposal
}) => {
  const [completed, setCompleted] = useState(false)
  return (
    <ProposalContext.Provider
      value={{ proposal: { ...proposal, completed }, setCompleted }}
      children={children}
    />
  )
}
