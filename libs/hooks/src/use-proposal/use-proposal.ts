import { Proposal } from '@botui/types'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { ProposalContext } from './ProposalContext'

interface Helper {
  handleUpdate: (skipNumber?: number) => void
}

export const useProposal = (): [Proposal, Helper] => {
  const proposal = useContext(ProposalContext)
  const router = useRouter()

  const handleUpdate = useCallback<Helper['handleUpdate']>(
    (n) => {
      const skip = n ? { skip: n } : {}
      const url = {
        pathname: router.pathname,
        query: { currentId: proposal.id, ...skip }
      }
      router.replace(url, url, { shallow: true })
    },
    [router, proposal.id]
  )

  return [proposal, { handleUpdate }]
}
