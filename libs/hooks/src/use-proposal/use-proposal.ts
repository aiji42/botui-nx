import { Proposal } from "@botui/types"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import { ProposalContext } from "./ProposalContext"

interface Helper {
  handleUpdate: () => void
}

export const useProposal = (): [Proposal, Helper] => {
  const proposal = useContext(ProposalContext)
  const router = useRouter()

  const handleUpdate = useCallback(() => {
    const url = { pathname: router.pathname, query: { currentId: proposal.id } }
    router.replace(url, url, { shallow: true })
  }, [router, proposal.id])

  return [proposal, { handleUpdate }]
}