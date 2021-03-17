import React, { FC, createContext } from 'react'
import { Proposal } from '@botui/types'

export const ProposalContext = createContext<Proposal>({} as Proposal)

export const ProposalContextProvider: FC<{ proposal: Proposal }> = ({
  children,
  proposal
}) => {
  return <ProposalContext.Provider value={proposal} children={children} />
}
