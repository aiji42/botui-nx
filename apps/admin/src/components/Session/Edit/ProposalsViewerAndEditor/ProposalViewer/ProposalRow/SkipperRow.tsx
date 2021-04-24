import { Proposal, ProposalSkipper, ProposalMessage } from '@botui/types'
import { FC, Fragment, useCallback, useState } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'
import { SkipperEditForm } from '../PoposalForm/SkipperEditForm'
import { CallSplitTwoTone } from '@material-ui/icons'
import { Typography, Box, ListItem, ListItemIcon } from '@material-ui/core'

interface SkipperRowProps {
  proposal: ProposalSkipper
  updateProposal: (arg: ProposalSkipper) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const SkipperRow: FC<SkipperRowProps> = ({
  proposal,
  updateProposal,
  insertProposal,
  deleteProposal,
  overtake
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = useCallback(() => setEditing(false), [])
  const submitter = useCallback(
    (proposal: ProposalSkipper) => {
      updateProposal(proposal)
      handleCloseEditig()
    },
    [handleCloseEditig, updateProposal]
  )

  const makeInserter = useCallback(
    (nextPrev: -1 | 1) => {
      return (newProposal: Proposal) => insertProposal(newProposal, nextPrev)
    },
    [insertProposal]
  )
  return (
    <>
      <SingleColumnRow
        topTool={
          <EdgeTool
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        rightTopTool={<DeleteTool onClick={deleteProposal} />}
      >
        <SingleColumn onClick={handleEditig}>
          <ListItem>
            <ListItemIcon>
              <CallSplitTwoTone />
            </ListItemIcon>
            <Typography variant="body1">
              {proposal.data.conditions.map(
                ({ pattern, key, operator, negative }, index) => (
                  <Fragment key={index}>
                    {index > 0 && (
                      <Box textAlign="center">
                        {proposal.data.logic.toUpperCase()}
                      </Box>
                    )}
                    {key} {negative ? 'not' : ''} {operator} {pattern}
                  </Fragment>
                )
              )}
            </Typography>
          </ListItem>
        </SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        <SkipperEditForm proposal={proposal} submitter={submitter} />
      </ProposalDrawer>
    </>
  )
}
