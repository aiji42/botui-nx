import { Proposal } from '@botui/types'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { ProposalContext } from './ProposalContext'

interface Helper {
  handleUpdate: (skipNumber?: number) => void
}

export const useProposal = (): [Proposal, Helper] => {
  const { proposal, setCompleted } = useContext(ProposalContext)
  const router = useRouter()

  const handleUpdate = useCallback<Helper['handleUpdate']>(
    (n) => {
      setCompleted(true)
      const skip = n ? { skip: n } : {}
      const url = {
        pathname: router.pathname,
        query: { id: router.query.id, currentId: proposal.id, ...skip }
      }
      router.replace(url, router.asPath, { shallow: true })
    },
    [router, proposal.id, setCompleted]
  )

  return [proposal, { handleUpdate }]
}
