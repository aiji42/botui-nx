import { Proposals } from '@botui/types'
import { createContext, FC, useContext } from 'react'

const ProposalsContext = createContext<{ proposals: Proposals }>({
  proposals: []
})

export const ProposalsContextProvider: FC<{ proposals: Proposals }> = ({
  children,
  proposals
}) => {
  return <ProposalsContext.Provider value={{ proposals }} children={children} />
}

export const useProposals = () => {
  const { proposals } = useContext(ProposalsContext)
  return proposals
}
