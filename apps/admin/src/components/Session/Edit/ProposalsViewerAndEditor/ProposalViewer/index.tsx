import { Proposal, Session, ProposalRelayer } from '@botui/types'
import { FC, useCallback, useState } from 'react'
import { useFormState, useForm } from 'react-final-form'
import { Grid } from '@material-ui/core'
import { SingleColumnRow } from './ProposalRow/SingleColumnRow'
import { SingleColumn } from './ProposalRow/SingleCulmn'
import { ProposalDrawer } from './ProposalDrawer/ProposalDrawer'
import { FormRow } from './ProposalRow/FormRow'
import { MessageRow } from './ProposalRow/MessageRow'
import { DeleteTool, EdgeTool } from './ProposalRow/Tools'
import { RelayerRow } from './ProposalRow/RelayRow'
import { SkipperRow } from './ProposalRow/SkipperRow'

const ProposalViewer: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()
  const { change } = useForm<Session>()
  const makeUpdater = useCallback(
    (id: Proposal['id']) => {
      return (newProposal: Proposal) => {
        change(
          'proposals',
          proposals.map((proposal) =>
            proposal.id === id ? newProposal : proposal
          )
        )
      }
    },
    [change, proposals]
  )

  const makeOvertaker = useCallback(
    (id: Proposal['id']) => {
      return (takeorver: 1 | -1) => {
        const index = proposals.findIndex((proposal) => proposal.id === id)
        change(
          'proposals',
          takeorver === -1
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
      }
    },
    [change, proposals]
  )

  const makeInserter = useCallback(
    (id: Proposal['id']) => {
      return (newProposal: Proposal, prevNext: -1 | 1) => {
        const index = proposals.findIndex((proposal) => proposal.id === id)
        const newProposals = [...proposals]
        newProposals.splice(index + (prevNext === -1 ? 0 : 1), 0, newProposal)
        change('proposals', newProposals)
      }
    },
    [change, proposals]
  )

  const makeDeleter = useCallback(
    (id: Proposal['id']) => {
      return () => {
        change(
          'proposals',
          proposals.filter((proposal) => proposal.id !== id)
        )
      }
    },
    [change, proposals]
  )

  return (
    <Grid container>
      <Grid container item xs={12} lg={8}>
        {proposals.map((proposal) => {
          if (
            proposal.type === 'message' &&
            proposal.data.content.type === 'string'
          )
            return (
              <MessageRow
                proposal={proposal}
                updateProposal={makeUpdater(proposal.id)}
                overtake={makeOvertaker(proposal.id)}
                insertProposal={makeInserter(proposal.id)}
                deleteProposal={makeDeleter(proposal.id)}
                key={proposal.id}
              />
            )
          if (
            proposal.type === 'message' &&
            proposal.data.content.type === 'form'
          )
            return (
              <FormRow
                proposal={proposal}
                updateProposal={makeUpdater(proposal.id)}
                overtake={makeOvertaker(proposal.id)}
                insertProposal={makeInserter(proposal.id)}
                deleteProposal={makeDeleter(proposal.id)}
                key={proposal.id}
              />
            )
          if (proposal.type === 'relayer')
            return (
              <RelayerRow
                key={proposal.id}
                updateProposal={makeUpdater(proposal.id)}
                proposal={proposal}
                overtake={makeOvertaker(proposal.id)}
                insertProposal={makeInserter(proposal.id)}
                deleteProposal={makeDeleter(proposal.id)}
              />
            )
          if (proposal.type === 'skipper')
            return (
              <SkipperRow
                key={proposal.id}
                updateProposal={makeUpdater(proposal.id)}
                proposal={proposal}
                overtake={makeOvertaker(proposal.id)}
                insertProposal={makeInserter(proposal.id)}
                deleteProposal={makeDeleter(proposal.id)}
              />
            )
          return null
        })}
      </Grid>
      <Grid container item xs={false} lg={4} />
    </Grid>
  )
}

export default ProposalViewer
