import {Proposal, Proposals, Session} from '@botui/types'
import {useCallback} from 'react'
import {useFormState, useForm} from 'react-final-form'

interface ProposalsEditHelper {
  update: (proposal: Proposal, newProposal: Proposal) => void
  overtake: (proposal: Proposal, nextPrev: -1 | 1) => void
  insert: (proposal: Proposal, newProposal: Proposal, nextPrev: -1 | 1) => void
  remove: (proposal: Proposal) => void
}

export const useProposalsEditor = (): [Proposals, ProposalsEditHelper]  => {
  const {
    values: { proposals }
  } = useFormState<Session>()
  const { change } = useForm<Session>()
  const update = useCallback<ProposalsEditHelper['update']>(
    ({ id }: Proposal, newProposal: Proposal) => {
      change(
        'proposals',
        proposals.map((proposal) =>
          proposal.id === id ? newProposal : proposal
        )
      )
    },
    [change, proposals]
  )

  const overtake = useCallback<ProposalsEditHelper['overtake']>(
    (proposal, nextPrev) => {
      const index = proposals.findIndex(({ id }) => proposal.id === id)
      change(
        'proposals',
        nextPrev === -1
          ? [
              ...proposals.slice(0, index - 1),
              ...proposals.slice(index - 1, index + 1).reverse(),
              ...proposals.slice(index + 1)
            ]
          : [
              ...proposals.slice(0, index),
              ...proposals.slice(index, index + 2).reverse(),
              ...proposals.slice(index + 2)
            ]
      )
    },
    [change, proposals]
  )

  const insert = useCallback<ProposalsEditHelper['insert']>(
    ({ id }: Proposal, newProposal: Proposal, prevNext: -1 | 1) => {
      const index = proposals.findIndex((proposal) => proposal.id === id)
      const newProposals = [...proposals]
      newProposals.splice(index + (prevNext === -1 ? 0 : 1), 0, newProposal)
      change('proposals', newProposals)
    },
    [change, proposals]
  )

  const remove = useCallback<ProposalsEditHelper['remove']>(
    ({ id }: Proposal) => {
      change(
        'proposals',
        proposals.filter((proposal) => proposal.id !== id)
      )
    },
    [change, proposals]
  )

  return [proposals, {
    update,
    overtake,
    insert,
    remove
  }]
}