import { Proposal } from '@botui/types'
import { useCallback, useState } from 'react'
import { useProposalsEditor } from '../dependencies'

interface ProposalRowStatus {
  editing: boolean
  creatingPrev: boolean
  creatingNext: boolean
}

interface ProposalRowHelper<T extends Proposal> {
  startEdit: () => void
  startCreatePrev: () => void
  startCreateNext: () => void
  complete: (proposal?: Proposal | undefined) => void
  overtakeWithPrev: () => void
  overtakeWithNext: () => void
  update: (newProposa: T) => void
  remove: () => void
}

export const useProposalRow = <T extends Proposal = Proposal>(
  proposal: T
): [ProposalRowStatus, ProposalRowHelper<T>] => {
  const [, helper] = useProposalsEditor()
  const [editing, setEditing] = useState(false)
  const [creatingPrev, setCreatingPrev] = useState(false)
  const [creatingNext, setCreatingNext] = useState(false)
  const startEdit = useCallback(() => setEditing(true), [])
  const startCreatePrev = useCallback(() => setCreatingPrev(true), [])
  const startCreateNext = useCallback(() => setCreatingNext(true), [])

  const complete = useCallback<ProposalRowHelper<T>['complete']>(
    (newProposal) => {
      if (editing && newProposal?.id) helper.update(proposal, newProposal as T)
      if (creatingPrev && newProposal?.id)
        helper.insert(proposal, newProposal, -1)
      if (creatingNext && newProposal?.id)
        helper.insert(proposal, newProposal, 1)

      setEditing(false)
      setCreatingPrev(false)
      setCreatingNext(false)
    },
    [creatingNext, creatingPrev, editing, helper, proposal]
  )

  const overtakeWithPrev = useCallback(() => helper.overtake(proposal, -1), [
    helper,
    proposal
  ])
  const overtakeWithNext = useCallback(() => helper.overtake(proposal, 1), [
    helper,
    proposal
  ])

  const remove = useCallback(() => helper.remove(proposal), [helper, proposal])

  const update = useCallback(
    (newProposal: T) => helper.update(proposal, newProposal),
    [helper, proposal]
  )

  return [
    { editing, creatingPrev, creatingNext },
    {
      startEdit,
      startCreatePrev,
      startCreateNext,
      complete,
      overtakeWithPrev,
      overtakeWithNext,
      remove,
      update
    }
  ]
}
