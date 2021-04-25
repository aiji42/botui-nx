import { Proposal } from '@botui/types'
import { useCallback, useState } from 'react'

export interface UseProposalRowArgs<T extends Proposal = Proposal> {
  proposal: T
  updateProposal: (proposal: T) => void
  insertProposal: (proposal: Proposal, nextPrev: -1 | 1) => void
  overtake: (proposal: T, nextPrev: -1 | 1) => void
}

interface ProposalRowStatus {
  editing: boolean
  creatingPrev: boolean
  creatingNext: boolean
}

interface ProposalRowHelper {
  startEdit: () => void
  startCreatePrev: () => void
  startCreateNext: () => void
  complete: (proposal?: Proposal | undefined) => void
  overtakehWithPrev: () => void
  overtakehWithNext: () => void
}

export const useProposalRow = <T extends Proposal = Proposal>({
  proposal,
  updateProposal,
  insertProposal,
  overtake
}: UseProposalRowArgs<T>): [ProposalRowStatus, ProposalRowHelper] => {
  const [editing, setEditing] = useState(false)
  const [creatingPrev, setCreatingPrev] = useState(false)
  const [creatingNext, setCreatingNext] = useState(false)
  const startEdit = useCallback(() => setEditing(true), [])
  const startCreatePrev = useCallback(() => setCreatingPrev(true), [])
  const startCreateNext = useCallback(() => setCreatingNext(true), [])

  const complete = useCallback<ProposalRowHelper['complete']>(
    (newProposal) => {
      if (editing && newProposal?.id) updateProposal(newProposal as T)
      if (creatingPrev && newProposal?.id) insertProposal(newProposal, -1)
      if (creatingNext && newProposal?.id) insertProposal(newProposal, 1)

      setEditing(false)
      setCreatingPrev(false)
      setCreatingNext(false)
    },
    [creatingNext, creatingPrev, editing, insertProposal, updateProposal]
  )

  const overtakehWithPrev = useCallback(() => overtake(proposal, -1), [
    overtake,
    proposal
  ])
  const overtakehWithNext = useCallback(() => overtake(proposal, 1), [
    overtake,
    proposal
  ])

  return [
    { editing, creatingPrev, creatingNext },
    {
      startEdit,
      startCreatePrev,
      startCreateNext,
      complete,
      overtakehWithPrev,
      overtakehWithNext
    }
  ]
}
